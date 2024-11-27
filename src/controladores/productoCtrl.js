import { conmysql } from "../db.js";

export const listarProductos = async (req, res) => {
  try {
    const [result] = await conmysql.query("SELECT * FROM productos;");
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

export const getProductoID = async (req, res) => {
  try {
    const { id_producto } = req.body;

    if (!id_producto) {
      return res.status(400).json({
        Mensaje: "Error: El id_producto es requerido",
        cantidad: 0,
        data: [],
        color: "danger",
      });
    }

    const [result] = await conmysql.query(
      "SELECT * FROM productos WHERE id_producto = ?;",
      [id_producto]
    );

    res.json({
      Mensaje:
        result.length > 0
          ? "Se encontró el producto"
          : "No se encontró el producto",
      cantidad: result.length,
      data: result,
      color: result.length > 0 ? "success" : "danger",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const insertProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, url_img } = req.body;

    const [result] = await conmysql.query(
      `
      INSERT INTO productos (nombre, descripcion, precio, url_img)
      VALUES (?, ?, ?, ?);
      `,
      [nombre, descripcion, precio, url_img]
    );

    if (result.affectedRows > 0) {
      res.json({
        Mensaje: "Se guardó correctamente",
        color: "success",
      });
    } else {
      res.status(400).json({
        Mensaje: "Error: No se insertó el producto",
        color: "danger",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProducto = async (req, res) => {
  try {
    const { id_producto, nombre, descripcion, precio, url_img } = req.body;

    const [result] = await conmysql.query(
      `
      UPDATE productos
      SET nombre = ?, descripcion = ?, precio = ?, url_img = ?
      WHERE id_producto = ?;
      `,
      [nombre, descripcion, precio, url_img, id_producto]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Mensaje: "Error: No se actualizó el producto",
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

export const eliminarProducto = async (req, res) => {
  try {
    const { id_producto } = req.body;
    if (!id_producto) {
      return res.status(400).json({
        Mensaje: "Error: El id_producto es requerido",
        cantidad: 0,
        data: [],
        color: "danger",
      });
    }

    const [result] = await conmysql.query(
      "DELETE FROM productos WHERE id_producto = ?;",
      [id_producto]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Mensaje: "Error: No se eliminó el producto",
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

