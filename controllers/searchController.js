import sql from 'mssql';
import moment from 'moment';
import { pool } from '../config/database.js';
import  validateToken  from '../utils/tokevalidate.js';

export const search = async (req, res) => {
  const { TargetId, StoreId } = req.body;
  if (!TargetId || !StoreId) {
    return res.status(400).send('Falta información requerida');
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    const validationResult = validateToken(token);
    if (validationResult.expired || !validationResult.valid) {
      return res.status(401).send({ error: 'Token expirado o no válido' });
    }

    const fechaActual = moment().format('YYYY-MM-DD');
    const request = pool.request();
    request.input('TargetId', sql.NVarChar, TargetId);
    request.input('StoreId', sql.NVarChar, StoreId);
    request.input('FechaInicio', sql.Date, new Date(fechaActual));

    const result = await request.execute('SPBuscarPreciosLS');
    if (result.recordset.length > 0) {
      return res.status(200).json(result.recordset);
    }
    return res.status(404).send({ message: 'No se encontraron resultados' });
  } catch (error) {
    console.error('Error en el controlador search:', error);
    res.status(500).send({ error: 'Error interno del servidor' });
  }
};
