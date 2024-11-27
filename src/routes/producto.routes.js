import { Router } from "express";
import {
  eliminarProducto,
  getProductoID,
  insertProducto,
  listarProductos,
  updateProducto,
} from "../controladores/productoCtrl.js";

const router = Router();
// armar nuestras rutas

router.get("/listarProductos", listarProductos);
router.post("/getProductoID", getProductoID);
router.post("/insertProducto", insertProducto);
router.post("/updateProducto", updateProducto);
router.post("/eliminarProducto", eliminarProducto);

export default router;
