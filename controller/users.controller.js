const Users = require("../models/users.model");
const middleware = require("../config/middleware");

exports.login = (req, res) => {
    Users.findOne({ username: req.body.username.toLowerCase(), password: req.body.password }, (err, result) => {
        if (err) {
            next(err);
        }
        if (result) {
            const token = middleware.generateToken(result.username);
            res.setHeader("token", token);
            res.json({ token: token });
        } else {
            res.json({ status: "Username dan password anda tidak sesuai" });
        }
    });

};

exports.readUsers = (req, res) => middleware.verifyToken(req.params.token, (err, decoded) => err ? res.json({ status: "error", desc: "Login Required" }) : Users.find((err, data) => err == null ? res.json({ users: data }) : res.json(err)));

exports.insertUsers = (req, res) => {
    let userInput = new Users({
        'username': req.body.username,
        'password': req.body.password
    });
    userInput.save((err) => {
        if (err) {
            return next(err);
        }
        res.json({ satus: 'User Created successfully' });
    });
};

exports.deleteUsers = (req, res) => middleware.verifyToken(req.params.token, (err, decoded) => err ? res.json({ status: "error", desc: "Login Required" }) : Users.deleteOne({ _id: req.params.id }, (err) => err ? res.json({ error: err }) : res.json({ status: "Delete Successfully" })));

exports.updateUsers = (req, res) => {
    middleware.verifyToken(req.params.token, (err, decoded) => {
        if (err) {
            res.json({ status: "error", desc: "Login Required" })
        } else {
            const newUsers = new Users({
                _id: req.params.id,
                username: req.body.username,
                password: req.body.password
            });
            Users.updateOne({ _id: req.params.id }, newUsers, (err, result) => err == null ? res.send(JSON.parse(JSON.stringify({ status: 'Success Update Data ' }))) : res.send(err));
        }
    });
};