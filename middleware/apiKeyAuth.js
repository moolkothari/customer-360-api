require('dotenv').config();
const { API_KEY } = process.env;

const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey ) {
    return res.status(401).json({ error: 'API Key is missing' });
  }

  if(apiKey !== API_KEY) {
    return res.status(401).json({ error: 'Invalid API Key' });
  }

  next();
};

module.exports = apiKeyAuth;
