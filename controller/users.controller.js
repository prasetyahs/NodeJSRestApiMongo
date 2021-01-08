const Users = require("../models/users.model");


exports.readUsers = (req, res) => Users.find((err, data) => err == null ? res.send(JSON.parse(JSON.stringify({ users: data }))) : res.send(err));

exports.insertUsers = (req, res) => {
    let userInput = new Users({
        'username': req.body.username,
        'password': req.body.password
    });
    userInput.save((err) => {
        if (err) {
            return next(err);
        }
        res.send(JSON.parse(JSON.stringify({ satus: 'User Created successfully' })));
    });
};

exports.deleteUsers = (req, res) => Users.deleteOne({ _id: req.params.id }, (err) => err == null ? res.send(JSON.parse(JSON.stringify({ status: "Delete successfully" }))) : res.send(err));

exports.updateUsers = (req, res) => {
    const newUsers = new Users({
        _id: req.params.id,
        username: req.body.username,
        password: req.body.password
    });
    Users.updateOne({ _id: req.params.id }, newUsers, (err, result) => err == null ? res.send(JSON.parse(JSON.stringify({ status: 'Success Update Data ' }))) : res.send(err));
};