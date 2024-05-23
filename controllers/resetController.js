import sql from 'mssql';
import { pool } from '../config/database.js';
import generateRandomPassword from '../utils/generatePassword.js';
import sendEmail from '../utils/sendmail.js';

export const reset = async (req, res) => {
  const { userName  } = req.body;

console.log(req.body);
if (!userName) {
  res.status(400).send('Falta información requerida');
  return;
}
else {
  try {
      const  password = await generateRandomPassword(6);
      // const base64string = await generateBarcodeBase64(password);
      const request = pool.request();
      console.log(password);
      request.input('userName', sql.VarChar, userName);
      request.input('passNew', sql.Int, password);

      const result_SP = await request.execute('SP_ResetUser');
      if (parseInt(result_SP.recordset[0].Resultado) === 200) {
        // const resultEmail = await sendEmail(userName,  'Restablecimiento de Contraseña App Precios' ,password , base64string );
        const resultEmail = await sendEmail(userName,  'Restablecimiento de Contraseña App Precios' ,password  );
      

               if (resultEmail.success) {
                  res.status(200).send({ message: 'contraseña enviada a '+ userName });
                } else {
                  res.status(500).send({ error: 'Error al enviar el correo' }); 
                }
        return
      }
      if (parseInt(result_SP.recordset[0].Resultado) === 404) {
        res.status(404).send({ message: 'No se encontraron resultados' });
        return
      }
}

  catch (error) {
    console.error('Error en la ruta /reset:', error);
    res.status(500).send({ error: 'Error interno del servidor' });
  }



}

}   
