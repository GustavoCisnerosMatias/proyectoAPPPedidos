import { conmysql } from "../db.js";

// Listar todas las facturas
export const listarFacturas = async (req, res) => {
  try {
    const [result] = await conmysql.query("SELECT * FROM factura;");
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

// Obtener facturas activas (estado = 1)
export const FacturasActivas = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "SELECT * FROM factura WHERE estado = 'pendiente';"
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

// Obtener una factura por ID
export const getFacturaID = async (req, res) => {
  try {
    const { id_factura } = req.body;

    if (!id_factura) {
      return res.status(400).json({
        Mensaje: "Error: El id_factura es requerido",
        cantidad: 0,
        data: [],
        color: "danger",
      });
    }

    const [result] = await conmysql.query(
      "SELECT * FROM factura WHERE id_factura = ?;",
      [id_factura]
    );

    res.json({
      Mensaje:
        result.length > 0
          ? "Se encontró la factura"
          : "No se encontró la factura",
      cantidad: result.length,
      data: result,
      color: result.length > 0 ? "success" : "danger",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Insertar una nueva factura
export const insertFactura = async (req, res) => {
  try {
    const { fecha, id_usuario, total, url_imagenPago, estado } = req.body;

    const [result] = await conmysql.query(
      `
      INSERT INTO factura (fecha, id_usuario, total, url_imagenPago, estado) 
      VALUES (?, ?, ?, ?, ?);
      `,
      [fecha, id_usuario, total, url_imagenPago, estado]
    );

    if (result.affectedRows > 0) {
      res.json({
        Mensaje: "Se guardó correctamente",
        color: "success",
        id_factura: result.insertId,
      });
    } else {
      res.status(400).json({
        Mensaje: "Error: No se insertó la factura",
        color: "danger",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar el total de una factura por ID
export const updateTotal = async (req, res) => {
  try {
    const { id_factura, total } = req.body;

    const [result] = await conmysql.query(
      `
      UPDATE factura 
      SET total = ? 
      WHERE id_factura = ?;
      `,
      [total, id_factura]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Mensaje: "Error: No se actualizó el total de la factura",
        color: "danger",
      });
    }

    res.json({
      Mensaje: "Se actualizó correctamente el total",
      color: "success",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar una factura completa
export const updateFactura = async (req, res) => {
  try {
    const { id_factura, fecha, id_usuario, total, url_imagenPago, estado } =
      req.body;

    const [result] = await conmysql.query(
      `
      UPDATE factura 
      SET fecha = ?, id_usuario = ?, total = ?, url_imagenPago = ?, estado = ? 
      WHERE id_factura = ?;
      `,
      [fecha, id_usuario, total, url_imagenPago, estado, id_factura]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Mensaje: "Error: No se actualizó la factura",
        color: "danger",
      });
    }

    res.json({
      Mensaje: "Se actualizó correctamente la factura",
      color: "success",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar una factura por ID
export const eliminarFactura = async (req, res) => {
  try {
    const { id_factura } = req.body;

    if (!id_factura) {
      return res.status(400).json({
        Mensaje: "Error: El id_factura es requerido",
        cantidad: 0,
        data: [],
        color: "danger",
      });
    }

    const [result] = await conmysql.query(
      "DELETE FROM factura WHERE id_factura = ?;",
      [id_factura]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Mensaje: "Error: No se eliminó la factura",
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
