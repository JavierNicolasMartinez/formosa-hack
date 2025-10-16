export const isOwner = (
  model,
  resourceIdParam = "id",
  ownerField = "author",
) => {
  return async (req, res, next) => {
    try {
      const resourceId = req.params[resourceIdParam];
      const resource = await model.findById(resourceId);

      if (!resource)
        return res
          .status(404)
          .json({ ok: false, message: "Recurso no encontrado" });
      if (
        resource[ownerField].toString() !== req.user._id.toString() &&
        req.user.role !== "admin"
      ) {
        return res
          .status(403)
          .json({
            ok: false,
            message: "No autorizado para modificar este recurso",
          });
      }

      next();
    } catch (error) {
      res.status(500).json({ ok: false, message: error.message });
    }
  };
};
