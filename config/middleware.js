const jwt = require('jsonwebtoken');

exports.generateToken = (name) => jwt.sign({ 'name': name }, process.env.SECRET, { expiresIn: 36000 });

exports.verifyToken = (token, callBack) =>
    jwt.verify(token, process.env.SECRET, callBack);
// , (err, decoded) => err ? res.status(500).send({ auth: false, message: 'Gagal autentikasi token.' }) : res.status(200).send(decoded)