import  validateToken  from '../utils/tokevalidate.js'; // Asegúrate de tener un módulo para validar el token


export const isAuth = async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const validationResult = validateToken(token);
    if (validationResult.expired || !validationResult.valid) {
      return res.status(401).send({ error: 'Token expirado o no válido' });
    }
    return res.status(200).send({ message: 'Token válido' });
  } catch (error) {
    console.error('Error en el controlador isAuth:', error);
    res.status(500).send({ error: 'Error interno del servidor' });
  }
};
