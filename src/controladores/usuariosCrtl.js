import { conmysql } from "../db.js";

export const login = async (req, res) => {
  try {
    const { user, password } = req.body;

    if (!user) {
      return res.status(400).json({
        Mensaje: "Error: El usuario es requerido",
        cantidad: 0,
        data: [],
        color: "danger",
      });
    }

    if (!password) {
      return res.status(400).json({
        Mensaje: "Error: La contraseña es requerida",
        cantidad: 0,
        data: [],
        color: "danger",
      });
    }

    const [result] = await conmysql.query(
      `SELECT * FROM usuario WHERE user = ? AND password = ?;`,
      [user, password]
    );

    res.json({
      Mensaje:
        result.length > 0
          ? "Inicio de sesión exitoso"
          : "Credenciales incorrectas",
      cantidad: result.length,
      data: result,
      color: result.length > 0 ? "success" : "danger",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const [result] = await conmysql.query("SELECT * FROM usuario;");
    res.json({
      Mensaje:
        result.length > 0
          ? "Operación exitosa"
          : "No hay registros para la consulta",
      cantidad: result.length,
      data: result,
      color: result.length > 0 ? "success" : "danger",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUsuarioID = async (req, res) => {
  try {
    const { id_usuario } = req.body;

    if (!id_usuario) {
      return res.status(400).json({
        Mensaje: "Error: El id_usuario es requerido",
        cantidad: 0,
        data: [],
        color: "danger",
      });
    }

    const [result] = await conmysql.query(
      "SELECT * FROM usuario WHERE id_usuario = ?;",
      [id_usuario]
    );

    res.json({
      Mensaje:
        result.length > 0
          ? "Se encontró el usuario"
          : "No se encontró el usuario",
      cantidad: result.length,
      data: result,
      color: result.length > 0 ? "success" : "danger",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const insertUsuario = async (req, res) => {
  try {
    const { nombres, user, password, location, id_perf } = req.body;

    const [result] = await conmysql.query(
      `INSERT INTO usuario (nombres, user, password, location, id_perfil) 
      VALUES (?, ?, ?, ?, ?);`,
      [nombres, user, password, location, id_perf]
    );

    if (result.affectedRows > 0) {
      res.json({
        Mensaje: "Usuario guardado correctamente",
        color: "success",
      });
    } else {
      res.status(400).json({
        Mensaje: "Error: No se insertó el usuario",
        color: "danger",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const { id_usuario, nombres, user, password, location, id_perf } = req.body;

    const [result] = await conmysql.query(
      `UPDATE usuario 
      SET nombres = ?, user = ?, password = ?, location = ?, id_perfil = ? 
      WHERE id_usuario = ?;`,
      [nombres, user, password, location, id_perf, id_usuario]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Mensaje: "Error: No se actualizó el usuario",
        color: "danger",
      });
    }

    res.json({
      Mensaje: "Usuario actualizado correctamente",
      color: "success",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.body;

    if (!id_usuario) {
      return res.status(400).json({
        Mensaje: "Error: El id_usuario es requerido",
        cantidad: 0,
        data: [],
        color: "danger",
      });
    }

    const [result] = await conmysql.query(
      "DELETE FROM usuario WHERE id_usuario = ?;",
      [id_usuario]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        Mensaje: "Error: No se eliminó el usuario",
        color: "danger",
      });
    }

    res.json({
      Mensaje: "Usuario eliminado correctamente",
      color: "success",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
