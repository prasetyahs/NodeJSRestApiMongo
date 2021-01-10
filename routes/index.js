var express = require('express');
var router = express.Router();
const users_controller = require("../controller/users.controller");

router.get('/:token', users_controller.readUsers);

router.post('/add', users_controller.insertUsers);

router.delete('/delete/:id/:token', users_controller.deleteUsers);

router.put('/update/:id/:token', users_controller.updateUsers);

router.post('/login', users_controller.login);

module.exports = router;