import sql from 'mssql';
import { pool } from '../config/database.js';
import  validateToken  from '../utils/tokevalidate.js';

export const searchforparameter = async (req, res) => {

    const p_Parametro = req.body.p_Parametro;
    // const p_StoreID = req.body.p_StoreID;
    // const username = req.body.username;
console.log(req.body);
if (!p_Parametro) {
  res.status(400).send('Falta información requerida');
  return;
}
else {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const validationResult =  validateToken(token);
    if (validationResult.expired || !validationResult.valid) {
    return res.status(401).send({ error: 'Token expirado o no valido' });
    }
    else if (!validationResult.expired && validationResult.valid) {


        const request = pool.request();
        request.input('p_Parametro', sql.NVarChar, p_Parametro);

        const query = `
        EXEC SPBusquedaPorDescripcion
            @patron_busqueda = @p_Parametro
        `;

        const results = await request.query(query);

        const filteredResults = results.recordset;
        const totalCount = filteredResults.length;

        const responseObj = {
        count: totalCount,
        products: filteredResults,
        };

        if (filteredResults.length === 0) {
        res.status(404).send({ message: 'No se encontraron resultados' });
        return
        }
        if (filteredResults.length > 0) {
        res.json(responseObj).status(200);
        return
        }
    }


  } catch (error) {
    console.error('Error en la ruta /searchforparameter:', error);
    res.status(500).send({ error: 'Error interno del servidor' });
  }
}
}
