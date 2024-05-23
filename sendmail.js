import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter =  nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: false, // true para SSL

    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });
  

  
  // Función para enviar correo electrónico
//   const sendEmail = async (to, subject, pass, base64) => {
  const sendEmail = async (to, subject, pass) => {

    try {
      // Construye el objeto mailOptions
      const mailOptions = {
        from: `"Nombre" <${process.env.SMTP_USER}>`, // Remitente
        to, // Destinatario
        subject, // Asunto
        html: `
          <h2>Restablecimiento de Contraseña</h2>
          <p>Hola ${to}</p>
          <p>Su nueva contraseña es: ${pass}</p>

        `, // Contenido del correo en HTML
      };
  //          <img src="data:image/png;base64,${base64}" alt="Código de barras">
      // Envía el correo electrónico
      const info = await transporter.sendMail(mailOptions);
      console.log('Correo enviado: %s', info.messageId);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error al enviar el correo electrónico:', error);
      return { success: false, error };
    }
  };
  
  export default sendEmail;