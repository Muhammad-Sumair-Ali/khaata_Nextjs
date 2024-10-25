// src/utils/auth.js
import jwt from 'jsonwebtoken';

export const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) return res.sendStatus(403); // Forbidden

  jwt.verify(token, 'your_jwt_secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // Store user information in request
    next();
  });
};