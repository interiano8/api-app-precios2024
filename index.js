import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import https from 'https';
import fs from 'fs';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import searchRoutes from './routes/search.js';
import loginRoutes from './routes/login.js';
import searchforparametersRoutes from './routes/searchforparameter.js';
import { reset } from './controllers/resetController.js';

dotenv.config();

const app = express();

// Middleware para parsear el cuerpo de las solicitudes
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const httpsOptions = {
   key: fs.readFileSync('./_.farmafacil.info_private_key.key'),
   cert: fs.readFileSync('./farmafacil.info_ssl_certificate.cer')
 };

app.use('/api', authRoutes);
app.use('/api', searchRoutes);
app.use('/api', loginRoutes);
app.use('/api', searchforparametersRoutes);
app.use('/api', reset);



const httpServer = http.createServer(app);
const HTTP_PORT = process.env.HTTP_PORT || 3005;
httpServer.listen(HTTP_PORT, () => {
  console.log('Servidor HTTP escuchando en el puerto', HTTP_PORT);
});

// Configurar servidor HTTPS
const httpsServer = https.createServer(httpsOptions, app);
const HTTPS_PORT = process.env.HTTPS_PORT || 8443;
httpsServer.listen(HTTPS_PORT, () => {
  console.log('Servidor HTTPS escuchando en el puerto', HTTPS_PORT);
});


// import validateToken  from './utils/tokevalidate.js';
// import express from 'express';
// import http from 'http';
// import https from 'https';
// import fs from 'fs';
// import sql from 'mssql';
// import jwt from 'jsonwebtoken';
// import cors from 'cors';
// import moment from 'moment';
// import bodyParser from 'body-parser';
// import  sendEmail  from './sendmail.js';
// import generateRandomPassword from './generatePassword.js';
// // import generateBarcodeBase64 from './generateBarcode.js';


// import dotenv from "dotenv";

// dotenv.config();

// const secret = process.env.SECRET;
// const verionApp=process.env.VERSION_APP
// const dbConfig = {
//   server: process.env.SERVER_NAME, // Cambia esto al servidor de tu SQL Server
//   user: process.env.USER_NAME,
//   password: process.env.PASSWORD_BD,
//   database: process.env.DATABASE_NAME,
//   options: {
//     encrypt: false, // Habilita la encriptación si es necesario
//   },
// };


// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// // Conéctate a la base de datos
// const pool = new sql.ConnectionPool(dbConfig);
// const poolConnect = pool.connect(); // Establecer la conexión al inicio

// poolConnect.then(() => {
//   console.log('Conexión exitosa a la base de datos');
// }).catch((err) => {
//   console.error('Error al conectar a la base de datos:', err);
// });

// // Configurar opciones para el servidor HTT

// // const httpsOptions = {
// //   key: fs.readFileSync('/home/interiano/ftp/files/Api-Buscador-Precios/_.farmafacil.info_private_key.key'),
// //   cert: fs.readFileSync('/home/interiano/ftp/files/Api-Buscador-Precios/farmafacil.info_ssl_certificate.cer')
// // };

// const httpsOptions = {
//    key: fs.readFileSync('./_.farmafacil.info_private_key.key'),
//    cert: fs.readFileSync('./farmafacil.info_ssl_certificate.cer')
//  };


// app.post('/login', async (req, res) => {
//   const { usuario, pass,  } = req.body;
//   console.log('Usuario:', usuario);


//   if (!usuario || !pass ) {
//     res.status(400).send('Falta información requerida');
//     return;
//   }

//   try {
//     const request = pool.request();
//     request.input('usuario', sql.NVarChar, usuario);
//     request.input('pass', sql.NVarChar, pass);

//     const result = await request.execute('SP_Login');

//     console.log(result.recordset[0].Resultado);
//     if (parseInt(result.recordset[0].Resultado) === 200) {
//         const user = result.recordset[0];

//         const token = jwt.sign(
//           {
//             sub: user.ID_Sucursal,
//             name: user.Usuario,
//             exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60), // Una semana en segundos
//             ID_Nivel: user.ID_Nivel,
//             Nombre_Sucursal: user.Nombre_Sucursal,
//             ID_Sucursal: user.ID_Sucursal,
//           },
//           secret
//         );
    
//         res.status(200).send({
//           token,
//           ID_Nivel: user.ID_Nivel,
//           Nombre_Sucursal: user.Nombre_Sucursal,
//           ID_Sucursal: user.ID_Sucursal,
//           version: verionApp,
//         });
//         return;
//     }

//     if (parseInt(result.recordset[0].Resultado) === 404) {
//       res.status(404).send('Credenciales inválidas');
//       return;
//     }
//     if (parseInt(result.recordset[0].Resultado) === 401) {
//       res.status(401).send('Es Necesario Actualizar credenciales');
//       return;
//     }

//     else {
//       res.status(500).send('Error interno del servidor');
//       return;
//     }

   
//   } catch (error) {
//     console.error('Error al realizar la consulta:', error);
//     res.status(500).send('Error interno del servidor');
//   }
// });

// app.get('/isAuth', async (req, res) => {
//       try {
//         const token = req.headers.authorization.split(' ')[1];
//         const validationResult =  validateToken(token, secret);
//         if (validationResult.expired || !validationResult.valid) {
//         return res.status(401).send({ error: 'Token expirado o no valido' });
//         }
//         else if (!validationResult.expired && validationResult.valid) {
//         return res.status(200).send({ message: 'Token válido' });
//         }


//     }
//     catch (error) {
//       console.error('Error en la ruta /isAuth:', error);
//       res.status(500).send({ error: 'Error interno del servidor' });
//     }
//   });



//  app.post('/search', async (req, res) => {
//     const { TargetId, StoreId } = req.body;

// console.log(req.body);
// if (!TargetId || !StoreId) {
//   res.status(400).send('Falta información requerida');
//   return;
// }
// else {

//     try {
//         const token = req.headers.authorization.split(' ')[1];
//         const validationResult =  validateToken(token, secret);
//         if (validationResult.expired || !validationResult.valid) {
//         return res.status(401).send({ error: 'Token expirado o no valido' });
//         }
//         else if (!validationResult.expired && validationResult.valid) {
//             const fechaActual = moment().format('YYYY-MM-DD');

//             const request = pool.request();
//             request.input('TargetId', sql.NVarChar, TargetId);
//             request.input('StoreId', sql.NVarChar, StoreId);
//             request.input('FechaInicio', sql.Date, new Date(fechaActual));

//             const result = await request.execute('SPBuscarPreciosLS');
//             if (result.recordset.length > 0) {
//                 res.json(result.recordset).status(200);
//                 return
//             }
//             if (result.recordset.length === 0) {
//                 res.status(404).send({ message: 'No se encontraron resultados' });
//                 return
//             }
//         }   
    
//   } catch (error) {
//     console.error('Error en la ruta /search:', error);
//     res.status(500).send({ error: 'Error interno del servidor' });
//   }
// }});

// app.post('/searchforparameter', async (req, res) => {
//     const p_Parametro = req.body.p_Parametro;
//     const p_StoreID = req.body.p_StoreID;
//     // const username = req.body.username;
// console.log(req.body);
// if (!p_Parametro) {
//   res.status(400).send('Falta información requerida');
//   return;
// }
// else {
//   try {
//     const token = req.headers.authorization.split(' ')[1];
//     const validationResult =  validateToken(token, secret);
//     if (validationResult.expired || !validationResult.valid) {
//     return res.status(401).send({ error: 'Token expirado o no valido' });
//     }
//     else if (!validationResult.expired && validationResult.valid) {


//         const request = pool.request();
//         request.input('p_Parametro', sql.NVarChar, p_Parametro);

//         const query = `
//         EXEC SPBusquedaPorDescripcion
//             @patron_busqueda = @p_Parametro
//         `;

//         const results = await request.query(query);

//         const filteredResults = results.recordset;
//         const totalCount = filteredResults.length;

//         const responseObj = {
//         count: totalCount,
//         products: filteredResults,
//         };

//         if (filteredResults.length === 0) {
//         res.status(404).send({ message: 'No se encontraron resultados' });
//         return
//         }
//         if (filteredResults.length > 0) {
//         res.json(responseObj).status(200);
//         return
//         }
//     }


//   } catch (error) {
//     console.error('Error en la ruta /searchforparameter:', error);
//     res.status(500).send({ error: 'Error interno del servidor' });
//   }
// }});

// app.post('/reset', async (req, res) => {
//   const { userName  } = req.body;

// console.log(req.body);
// if (!userName) {
//   res.status(400).send('Falta información requerida');
//   return;
// }
// else {
//   try {
//       const  password = await generateRandomPassword(6);
//       // const base64string = await generateBarcodeBase64(password);
//       const request = pool.request();
//       console.log(password);
//       request.input('userName', sql.VarChar, userName);
//       request.input('passNew', sql.Int, password);

//       const result_SP = await request.execute('SP_ResetUser');
//       if (parseInt(result_SP.recordset[0].Resultado) === 200) {
//         // const resultEmail = await sendEmail(userName,  'Restablecimiento de Contraseña App Precios' ,password , base64string );
//         const resultEmail = await sendEmail(userName,  'Restablecimiento de Contraseña App Precios' ,password  );
      

//                if (resultEmail.success) {
//                   res.status(200).send({ message: 'contraseña enviada a '+ userName });
//                 } else {
//                   res.status(500).send({ error: 'Error al enviar el correo' }); 
//                 }
//         return
//       }
//       if (parseInt(result_SP.recordset[0].Resultado) === 404) {
//         res.status(404).send({ message: 'No se encontraron resultados' });
//         return
//       }
// }

//   catch (error) {
//     console.error('Error en la ruta /reset:', error);
//     res.status(500).send({ error: 'Error interno del servidor' });
//   }
// }});


// const httpServer = http.createServer(app);
// const HTTP_PORT = process.env.HTTP_PORT || 3005;
// httpServer.listen(HTTP_PORT, () => {
//   console.log('Servidor HTTP escuchando en el puerto', HTTP_PORT);
// });

// // Configurar servidor HTTPS
// const httpsServer = https.createServer(httpsOptions, app);
// const HTTPS_PORT = process.env.HTTPS_PORT || 8443;
// httpsServer.listen(HTTPS_PORT, () => {
//   console.log('Servidor HTTPS escuchando en el puerto', HTTPS_PORT);
// });


