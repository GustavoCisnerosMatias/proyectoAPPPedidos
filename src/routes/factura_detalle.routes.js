import { Router } from "express";
import {
  eliminarFacturaDetalle,
  getFacturaDetalleID,
  getFacturaPorID,
  insertFacturaDetalle,
  listarFacturaDetalles,
  listarFacturaDetallesActivas,
  updateFacturaDetalle,
} from "../controladores/factura_detalleCtrl.js";
const router = Router();
// armar nuestras rutas

router.get("/listarFacturaDetalles", listarFacturaDetalles);
router.get("/listarFacturaDetallesActivas", listarFacturaDetallesActivas);
router.post("/getFacturaDetalleID", getFacturaDetalleID);
router.post("/getDetalleFacturaID", getFacturaPorID);
router.post("/insertFacturaDetalle", insertFacturaDetalle);
router.post("/updateFacturaDetalle", updateFacturaDetalle);
router.post("/eliminarFacturaDetalle", eliminarFacturaDetalle);

export default router;
