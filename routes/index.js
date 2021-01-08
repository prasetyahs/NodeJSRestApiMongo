var express = require('express');
var router = express.Router();
const users_controller = require("../controller/users.controller");

router.get('/', users_controller.readUsers);

router.post('/add', users_controller.insertUsers);

router.delete('/delete/:id', users_controller.deleteUsers);

router.put('/update/:id', users_controller.updateUsers);

module.exports = router;