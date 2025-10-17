import UserModel from "../models/user.model.js";
import ProfileModel from "../models/Profile.model.js";
import { matchedData } from "express-validator";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";
import TestModel from "../models/test.model.js";
import StudentModel from "../models/Student.model.js";
import StudentResultModel from "../models/StudentResult.model.js";
import { calculateStudyMethod } from "../utils/calculateStudyMethod.js";

export const register = async (req, res) => {
  try {
    // 1️⃣ Datos validados del body
    const data = matchedData(req, { locations: ["body"] });
    data.password = await hashPassword(data.password);

    // 2️⃣ Crear perfil
    const profileData = data.profile || {};
    const profile = await ProfileModel.create(profileData);

    // 3️⃣ Crear usuario
    const user = await UserModel.create({
      username: data.username,
      email: data.email,
      password: data.password,
      role: data.role || "student",
      profile: profile._id,
    });

    // 4️⃣ Crear estudiante asociado
    const student = await StudentModel.create({ user: user._id });

    // 5️⃣ Obtener todas las preguntas del test
    const testQuestions = await TestModel.find();

    // 6️⃣ Crear StudentResult inicial con todas las preguntas
    const initialAnswers = testQuestions.map(q => ({
      question: q._id,
      answer: null,
      score: 0,
    }));

    await StudentResultModel.create({
      student: student._id,
      form: null,
      answers: initialAnswers,
      totalScore: 0,
      maxScore: testQuestions.reduce(
        (sum, q) => sum + Math.max(...q.options.map(o => o.score)),
        0
      ),
    });

    // 7️⃣ Preparar respuestas para calcular metodología
    const studentAnswers = testQuestions.map(q => {
      // Tomamos la primera opción de cada pregunta como predeterminada
      const option = q.options[0];
      return {
        type: option.type, // Visual / Auditory / Kinesthetic
        score: option.score,
      };
    });

    // 8️⃣ Calcular metodología recomendada
    const { recommendedMethod } = calculateStudyMethod(studentAnswers);

    // 9️⃣ Obtener ObjectId de la metodología en DB
    const studyMethods = await StudyMethodModel.find();
    const methodMap = studyMethods.reduce((acc, m) => {
      acc[m.name] = m._id;
      return acc;
    }, {});

    //  🔟 Asignar la metodología al estudiante
    student.studyMethod = methodMap[recommendedMethod];
    await student.save();

    res.status(201).json({
      ok: true,
      message:
        "Usuario creado, test psicopedagógico inicial generado y metodología asignada",
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        studyMethod: recommendedMethod,
      },
    });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    // Buscar al usuario por email
    const user = await UserModel.findOne({ email: data.email }).populate("profile");

    if (!user)
      return res.status(401).json({ ok: false, message: "Email inválido" });

    // Verificar contraseña
    const valid = await comparePassword(data.password, user.password);
    if (!valid)
      return res.status(401).json({ ok: false, message: "Contraseña incorrecta" });

    // Generar token
    const token = generateToken(user._id);

    // Responder
    res
      .cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 })
      .status(200)
      .json({
        ok: true,
        message: "Login exitoso",
        data: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
          profile: user.profile
            ? {
                first_name: user.profile.first_name || null,
                last_name: user.profile.last_name || null,
                bio: user.profile.bio || null,
                methodology: user.profile.methodology || null,
              }
            : null,
        },
      });
  } catch (e) {
    res.status(500).json({ ok: false, message: e.message });
  }
};

// GET PROFILE
export const getProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id)
      .populate("profile");

    res.status(200).json({
      ok: true,
      data: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profile: user.profile ? {
          first_name: user.profile.first_name,
          last_name: user.profile.last_name,
          bio: user.profile.bio,
          methodology: user.profile.methodology,
        } : null
      }
    });
  } catch (e) {
    res.status(500).json({ ok: false, message: e.message });
  }
};


// UPDATE PROFILE
export const updateProfile = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    // Si vienen intereses como nombres, convertir a ObjectId
    if (data.interests && data.interests.length > 0) {
      const interests = await InterestModel.find({
        name: { $in: data.interests.map(i => i.name) }
      });
      data.interests = interests.map(i => i._id);
    }

    const updated = await ProfileModel.findByIdAndUpdate(
      req.user.profile,
      { $set: data },
      { new: true }
    ).populate("interests");

    res.status(200).json({
      ok: true,
      data: {
        first_name: updated.first_name,
        last_name: updated.last_name,
        bio: updated.bio,
        methodology: updated.methodology,
        interests: updated.interests.map(i => ({ id: i._id, name: i.name }))
      }
    });
  } catch (e) {
    res.status(500).json({ ok: false, message: e.message });
  }
};

export const verify = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        ok: false,
        message: "No hay token",
      });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      return res.status(401).json({
        ok: false,
        message: "Token inválido",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Token válido",
      userId: decoded.id,
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      message: e.message,
    });
  }
};

// LOGOUT
export const logout = async (req, res) => {
  try {
    res.clearCookie("token"); // elimina la cookie JWT
    res.status(200).json({
      ok: true,
      message: "Logout exitoso",
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      message: e.message,
    });
  }
};

export const createProfile = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    let profile;
    if (req.user.profile) {
      // Actualiza perfil existente
      profile = await ProfileModel.findByIdAndUpdate(
        req.user.profile,
        { $set: data },
        { new: true }
      );
    } else {
      // Crea nuevo perfil
      profile = await ProfileModel.create(data);
      await UserModel.findByIdAndUpdate(req.user._id, { profile: profile._id });
    }

    res.status(200).json({
      ok: true,
      data: {
        first_name: profile.first_name,
        last_name: profile.last_name,
        bio: profile.bio,
        methodology: profile.methodology,
      },
    });
  } catch (e) {
    res.status(500).json({ ok: false, message: e.message });
  }
};