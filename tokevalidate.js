import jwt from 'jsonwebtoken';

function validateToken(token, secret) {
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
