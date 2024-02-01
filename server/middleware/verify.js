const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) {
    return res.status(401).json("NO ESTAS AUTORIZADO A ENTRAR!!!!!");
  }

  //   Bearer token
  const token = auth.split(" ")[1];

  if (!token) {
    return res.status(401).json("Token no valido");
  }

  jwt.verify(token, process.env.SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json(error);
    }
    next();
  });
};

module.exports = verify;
