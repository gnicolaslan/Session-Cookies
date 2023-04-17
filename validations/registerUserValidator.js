const {check, body} = require('express-validator');
const {readJSON} = require('../data')

module.exports = [
    check('name')
        .notEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({
            min: 2
        }).withMessage('Mínimo 2 letras').bail()
        .isAlpha('es-ES', {
            ignore: " "
        }).withMessage('Solo caracteres alfabéticos'),

    body('email')
        .notEmpty().withMessage('El email es obligatorio').bail()
        .isEmail().withMessage('Debe tener un formato válido').bail()
        .custom((value, {req}) => {
            let user = readJSON('users.json').find(user => user.email === value)
            return user ? false : true
        }).withMessage('El email ya se encuentra registrado'),

    check('age')
        .isNumeric().withMessage('Debe ser un valor númerico').bail()
        .isLength({
            min:1,
            max:2
        }).withMessage('Debe colocar una edad válida')
]