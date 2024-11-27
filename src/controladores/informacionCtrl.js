import { conmysql } from "../db.js";

// Listar todos los registros de la tabla informacionlocal
export const listarLocales = async (req, res) => {
  try {
    const [result] = await conmysql.query("SELECT * FROM informacionlocal;");
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

// Listar solo los locales con estado = 1
export const listarLocalesActivos = async (req, res) => {
  try {
    const [result] = await conmysql.query(
      "SELECT * FROM informacionlocal WHERE estado = 1;"
    );
    res.json({
      Mensaje:
        result.length > 0
          ? "Operación Exitosa"
          : "No hay registros activos para la consulta",
      cantidad: result.length,
      data: result,
      color: result.length > 0 ? "success" : "danger",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Obtener un local por ID
export const getLocalByID = async (req, res) => {
  try {
    const { id_local } = req.body;

    if (!id_local) {
      return res.status(400).json({
        Mensaje: "Error: El ID del local es requerido",
        cantidad: 0,
        data: [],
        color: "danger",
      });
    }

    const [result] = await conmysql.query(
      "SELECT * FROM informacionlocal WHERE id_local = ?;",
      [id_local]
    );

    res.json({
      Mensaje:
        result.length > 0 ? "Se encontró el local" : "No se encontró el local",
      cantidad: result.length,
      data: result,
      color: result.length > 0 ? "success" : "danger",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Insertar un nuevo local
export const insertLocal = async (req, res) => {
  try {
    const { ubicacion, estado } = req.body;

    if (!ubicacion || estado === undefined) {
      return res.status(400).json({
        Mensaje: "Error: La ubicación y el estado son requeridos",
        color: "danger",
      });
    }

    const [result] = await conmysql.query(
      `INSERT INTO informacionlocal (ubicacion, estado)
       VALUES (?, ?);`,
      [ubicacion, estado]
    );

    if (result.affectedRows > 0) {
      res.json({
        Mensaje: "Se guardó correctamente el local",
        color: "success",
      });
    } else {
      res.status(400).json({
        Mensaje: "Error: No se insertó el local",
        color: "danger",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Actualizar un local existente
export const updateLocal = async (req, res) => {
  try {
    const { id_local, ubicacion, estado } = req.body;

    if (!id_local || !ubicacion || estado === undefined) {
      return res.status(400).json({
        Mensaje: "Error: El ID del local, ubicación y estado son requeridos",
        color: "danger",
      });
    }

    const [result] = await conmysql.query(
      `UPDATE informacionlocal 
       SET ubicacion = ?, estado = ?
       WHERE id_local = ?;`,
      [ubicacion, estado, id_local]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Mensaje: "Error: No se actualizó el local",
        color: "danger",
      });
    }

    res.json({
      Mensaje: "Se actualizó correctamente el local",
      color: "success",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Eliminar un local por ID
export const eliminarLocal = async (req, res) => {
  try {
    const { id_local } = req.body;

    if (!id_local) {
      return res.status(400).json({
        Mensaje: "Error: El ID del local es requerido",
        color: "danger",
      });
    }

    const [result] = await conmysql.query(
      "DELETE FROM informacionlocal WHERE id_local = ?;",
      [id_local]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Mensaje: "Error: No se eliminó el local",
        color: "danger",
      });
    }

    res.json({
      Mensaje: "Se eliminó correctamente el local",
      color: "success",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
