import { conmysql } from "../db.js";

// Listar todos los detalles de facturas
export const listarFacturaDetalles = async (req, res) => {
  try {
    const [result] = await conmysql.query("SELECT * FROM facturadetalle;");
    res.json({
      Mensaje:
        result.length > 0
          ? "Operación Exitosa"
          : "No hay registros para la consulta",
      cantidad: result.length,
      data: result,
      color: result.length > 0 ? "success" : "danger",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Listar detalles de facturas activas (estado = 1)
export const listarFacturaDetallesActivas = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "SELECT * FROM facturadetalle WHERE estado = 1;"
    );
    res.json({
      Mensaje:
        result.length > 0
          ? "Operación Exitosa"
          : "No hay registros para la consulta",
      cantidad: result.length,
      data: result,
      color: result.length > 0 ? "success" : "danger",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
//get por idFactura
export const getFacturaPorID = async (req, res) => {
  try {
    const { id_factura } = req.body;

    if (!id_factura) {
      return res.status(400).json({
        Mensaje: "Error: El ID de la factura es requerido",
        cantidad: 0,
        data: [],
        color: "danger",
      });
    }

    const [result] = await conmysql.query(
      "SELECT * FROM facturadetalle WHERE id_factura = ?;",
      [id_factura]
    );

    res.json({
      Mensaje:
        result.length > 0
          ? "Se encontraron los detalles de la factura"
          : "No se encontraron detalles para la factura",
      cantidad: result.length,
      data: result,
      color: result.length > 0 ? "success" : "danger",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// Obtener un detalle de factura por ID
export const getFacturaDetalleID = async (req, res) => {
  try {
    const { id_facturaDetalle } = req.body;

    if (!id_facturaDetalle) {
      return res.status(400).json({
        Mensaje: "Error: El ID del detalle de factura es requerido",
        cantidad: 0,
        data: [],
        color: "danger",
      });
    }

    const [result] = await conmysql.query(
      "SELECT * FROM facturadetalle WHERE id_facturaDetalle = ?;",
      [id_facturaDetalle]
    );

    res.json({
      Mensaje:
        result.length > 0
          ? "Se encontró el detalle de la factura"
          : "No se encontró el detalle de la factura",
      cantidad: result.length,
      data: result,
      color: result.length > 0 ? "success" : "danger",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Insertar un nuevo detalle de factura
export const insertFacturaDetalle = async (req, res) => {
  try {
    const {
      id_factura,
      id_producto,
      cantidad,
      precioUnitario,
      subtotal,
      estado,
    } = req.body;

    const [result] = await conmysql.query(
      `INSERT INTO facturadetalle (id_factura, id_producto, cantidad, precioUnitario, subtotal, estado)
       VALUES (?, ?, ?, ?, ?, ?);`,
      [id_factura, id_producto, cantidad, precioUnitario, subtotal, estado]
    );

    if (result.affectedRows > 0) {
      res.json({
        Mensaje: "Se guardó correctamente",
        color: "success",
      });
    } else {
      res.status(400).json({
        Mensaje: "Error: No se insertó el detalle de la factura",
        color: "danger",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar un detalle de factura
export const updateFacturaDetalle = async (req, res) => {
  try {
    const {
      id_facturaDetalle,
      id_factura,
      id_producto,
      cantidad,
      precioUnitario,
      subtotal,
      estado,
    } = req.body;

    const [result] = await conmysql.query(
      `UPDATE facturadetalle 
       SET id_factura = ?, id_producto = ?, cantidad = ?, precioUnitario = ?, subtotal = ?, estado = ?
       WHERE id_facturaDetalle = ?;`,
      [
        id_factura,
        id_producto,
        cantidad,
        precioUnitario,
        subtotal,
        estado,
        id_facturaDetalle,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Mensaje: "Error: No se actualizó el detalle de la factura",
        color: "danger",
      });
    }

    res.json({
      Mensaje: "Se actualizó correctamente",
      color: "success",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar un detalle de factura
export const eliminarFacturaDetalle = async (req, res) => {
  try {
    const { id_facturaDetalle } = req.body;

    if (!id_facturaDetalle) {
      return res.status(400).json({
        Mensaje: "Error: El ID del detalle de factura es requerido",
        cantidad: 0,
        data: [],
        color: "danger",
      });
    }

    const [result] = await conmysql.query(
      "DELETE FROM facturadetalle WHERE id_facturaDetalle = ?;",
      [id_facturaDetalle]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Mensaje: "Error: No se eliminó el detalle de la factura",
        color: "danger",
      });
    }

    res.json({
      Mensaje: "Se eliminó correctamente",
      color: "success",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
