import sql from 'mssql';
import { pool } from '../config/database.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret = process.env.SECRET;

export const login = async (req, res) => {

  const { usuario, pass,  } = req.body;
  console.log('Usuario:', usuario);


  if (!usuario || !pass ) {
    res.status(400).send('Falta información requerida');
    return;
  }

  try {
    const request = pool.request();
    request.input('usuario', sql.NVarChar, usuario);
    request.input('pass', sql.NVarChar, pass);

    const result = await request.execute('SP_Login');

    console.log(result.recordset[0].Resultado);
    if (parseInt(result.recordset[0].Resultado) === 200) {
        const user = result.recordset[0];

        const token = jwt.sign(
          {
            sub: user.ID_Sucursal,
            name: user.Usuario,
            exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60), // Una semana en segundos
            ID_Nivel: user.ID_Nivel,
            Nombre_Sucursal: user.Nombre_Sucursal,
            ID_Sucursal: user.ID_Sucursal,
          },
          secret
        );
    
        res.status(200).send({
          token,
          ID_Nivel: user.ID_Nivel,
          Nombre_Sucursal: user.Nombre_Sucursal,
          ID_Sucursal: user.ID_Sucursal,
          version: process.env.VERSION_APP,
        });
        return;
    }

    if (parseInt(result.recordset[0].Resultado) === 404) {
      res.status(404).send('Credenciales inválidas');
      return;
    }
    if (parseInt(result.recordset[0].Resultado) === 401) {
      res.status(401).send('Es Necesario Actualizar credenciales');
      return;
    }

    else {
      res.status(500).send('Error interno del servidor');
      return;
    }

   
  } catch (error) {
    console.error('Error al realizar la consulta:', error);
    res.status(500).send('Error interno del servidor');
  }

};
