import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

function validateToken(token) {
  const secret = process.env.SECRET;
  try {
    const decoded = jwt.verify(token, secret);
    return {
      valid: true,
      expired: false,
      decoded
    };
  } catch (err) {
    return {
      valid: false,
      expired: err.name === 'TokenExpiredError',
      decoded: null
    };
  }
}

export default validateToken
