import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="bg-gradient-to-br from-slate-50 to-gray-100 text-gray-800 font-sans scroll-smooth">
      {/* ===== Hero Section ===== */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-200/30 to-gray-300/30"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-slate-300">
              <span>Plataforma educativa premium</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
              Aprende{" "}
              <span className="bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
                con excelencia
              </span>
              .<br />
              Enseña{" "}
              <span className="bg-gradient-to-r from-cyan-600 to-blue-700 bg-clip-text text-transparent">
                con maestría
              </span>
              .
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
              Descubre cursos adaptados a tu estilo único de aprendizaje. O
              comparte tu conocimiento con herramientas diseñadas para
              <span className="font-semibold text-slate-700">
                {" "}
                la excelencia educativa
              </span>
              .
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link
                href="/register"
                className="group bg-gradient-to-r from-slate-700 to-slate-900 text-slate-100 px-10 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 border border-slate-600"
              >
                <span>Descubrir mi Estilo de Aprendizaje</span>
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
              <a
                href="#"
                className="group bg-white/80 backdrop-blur-sm border border-slate-300 text-slate-700 px-10 py-4 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Empezar a Enseñar</span>
              </a>
            </div>
            <div className="flex justify-center items-center space-x-8 text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                <span>+50,000 estudiantes</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                <span>+1,000 tutores expertos</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Cómo Funciona ===== */}
      <section id="como-funciona" className="py-20 bg-white/60">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Aprende de la forma que{" "}
              <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                mejor funciona para ti
              </span>
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto">
              Nuestra plataforma se adapta a tu forma única de procesar
              información, haciendo el aprendizaje más efectivo y profesional.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: "🔍",
                title: "Descubre Tu Estilo",
                desc: "Nuestro test identifica si aprendes mejor de forma visual, auditiva o kinestésica",
                color: "from-slate-500 to-slate-700",
              },
              {
                icon: "🎯",
                title: "Contenido Personalizado",
                desc: "Recibe recomendaciones de cursos en los formatos que mejor se adaptan a ti",
                color: "from-cyan-500 to-blue-600",
              },
              {
                icon: "🚀",
                title: "Aprende Más Rápido",
                desc: "Retén información más fácilmente con métodos alineados a tu estilo natural",
                color: "from-emerald-500 to-teal-600",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group text-center p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-slate-200"
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl group-hover:scale-110 transition-transform duration-300 shadow-inner`}
                >
                  <span className="text-white">{item.icon}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Estilos de Aprendizaje */}
          <div className="bg-gradient-to-r from-slate-100 to-gray-100 rounded-3xl p-8 border border-slate-300 shadow-inner">
            <h3 className="text-3xl font-bold text-center mb-12 text-slate-800">
              ¿Cómo Aprendes Mejor?
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  type: "Visual",
                  icon: "👀",
                  desc: "Aprendes viendo diagramas, videos y representaciones gráficas",
                  color: "border-blue-300 bg-blue-100/50",
                },
                {
                  type: "Auditivo",
                  icon: "👂",
                  desc: "Prefieres escuchar explicaciones, podcasts y discusiones",
                  color: "border-cyan-300 bg-cyan-100/50",
                },
                {
                  type: "Kinestésico",
                  icon: "✨",
                  desc: "Necesitas hacer, practicar y experimentar para aprender",
                  color: "border-emerald-300 bg-emerald-100/50",
                },
              ].map((style, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-2xl border-2 ${style.color} text-center transition-all hover:shadow-lg bg-white/80`}
                >
                  <div className="text-4xl mb-4">{style.icon}</div>
                  <h4 className="text-xl font-bold mb-3 text-gray-800">
                    {style.type}
                  </h4>
                  <p className="text-gray-600 text-sm">{style.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Testimonios ===== */}
      <section
        id="testimonios"
        className="py-20 bg-gradient-to-br from-slate-200 to-gray-300"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Lo que dicen nuestra{" "}
              <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
                comunidad
              </span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "María González",
                role: "Estudiante de Diseño",
                avatar: "👩‍🎓",
                text: "Por fin entiendo conceptos que antes me costaban meses. ¡El test cambió todo!",
                color: "bg-slate-200",
              },
              {
                name: "Carlos Ruiz",
                role: "Tutor de Programación",
                avatar: "👨‍💻",
                text: "Mis estudiantes están más comprometidos desde que adapto el material a sus estilos.",
                color: "bg-cyan-200",
              },
              {
                name: "Ana López",
                role: "Estudiante de Idiomas",
                avatar: "👩‍🎓",
                text: "Las lecciones en video para visuales como yo hacen que aprender sea más efectivo.",
                color: "bg-emerald-200",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div
                    className={`w-12 h-12 rounded-full ${testimonial.color} flex items-center justify-center text-xl border border-slate-300`}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA Final ===== */}
      <section className="py-20 bg-gradient-to-r from-slate-700 to-slate-900 text-slate-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Listo para la excelencia educativa?
          </h2>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto mb-10">
            Únete a miles de estudiantes y tutores que ya descubrieron una forma
            más inteligente de aprender y enseñar.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#"
              className="bg-white text-slate-800 px-12 py-4 rounded-2xl text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover:bg-slate-100 border border-slate-300"
            >
              🚀 Empezar Mi Viaje de Aprendizaje
            </a>
            <a
              href="#"
              className="bg-slate-600/30 backdrop-blur-sm border border-slate-400 text-white px-12 py-4 rounded-2xl text-lg font-semibold hover:bg-slate-600/40 transform hover:scale-105 transition-all duration-300"
            >
              👨‍🏫 Quiero Ser Tutor
            </a>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-slate-600 to-slate-800 rounded-lg flex items-center justify-center shadow-inner">
                  <span className="text-slate-200 font-bold text-sm">AL</span>
                </div>
                <span className="text-xl font-bold text-white">
                  AdaptaLearn
                </span>
              </div>
              <p className="text-slate-400">
                Transformando la educación mediante el aprendizaje
                personalizado.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Para Estudiantes</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-200 transition-colors"
                  >
                    Descubrir Cursos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-200 transition-colors"
                  >
                    Test de Aprendizaje
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-200 transition-colors"
                  >
                    Recursos Gratuitos
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Para Tutores</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-200 transition-colors"
                  >
                    Empezar a Enseñar
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-200 transition-colors"
                  >
                    Recursos para Tutores
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-200 transition-colors"
                  >
                    Comunidad
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Compañía</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-200 transition-colors"
                  >
                    Sobre Nosotros
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-200 transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-slate-200 transition-colors"
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2025 AdaptaLearn. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
