import { Router } from "express";
import {
  eliminarUsuario,
  getUsuarioID,
  insertUsuario,
  listarUsuarios,
  login,
  updateUsuario,
} from "../controladores/usuariosCrtl.js";
const router = Router();
// armar nuestras rutas

router.get("/listarUsuarios", listarUsuarios);
router.post("/getUsuarioID", getUsuarioID);
router.post("/insertUsuario", insertUsuario);
router.post("/updateUsuario", updateUsuario);
router.post("/eliminarUsuario", eliminarUsuario);
router.post("/login", login);

export default router;
