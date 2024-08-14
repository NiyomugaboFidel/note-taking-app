import jwt from 'jsonwebtoken';

export const generateToken = (id: string) => {
  const token = jwt.sign({ id },'json_web_token_key', { expiresIn: '5d' });
  return token;
};

export const verifyToken = (token:any) => {
  try {
    const decoded = jwt.verify(token,'json_web_token_key');
    return decoded; // Return the decoded ID if the token is valid
  } catch (error) {
    return false; // Return false if the token is invalid or expired
  }
};
