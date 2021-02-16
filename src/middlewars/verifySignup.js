import User from "../models/User";

export const verificarCorreoCedula = async (req, res, next) => {
  try {
    const nombre = await User.findOne({ nombre: req.body.nombre });
    if (nombre)
      return res.status(400).json({ message: "The user already exists" });
    const cedula = await User.findOne({ cedula: req.body.cedula });
    if (cedula)
      return res.status(400).json({ message: "The email already exists" });
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};