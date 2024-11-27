import { Router } from "express";
import {
  eliminarFactura,
  FacturasActivas,
  getFacturaID,
  insertFactura,
  listarFacturas,
  updateFactura,
  updateTotal,
} from "../controladores/facturaCtrl.js";
const router = Router();
// armar nuestras rutas

router.get("/listarFacturas", listarFacturas);
router.get("/FacturasActivas", FacturasActivas);
router.post("/getFacturaID", getFacturaID);
router.post("/insertFactura", insertFactura);
router.post("/updateFactura", updateFactura);
router.post("/eliminarFactura", eliminarFactura);
router.post("/updateTotal", updateTotal);

export default router;
