const {validationResult} = require('express-validator')
const { readJSON, writeJSON } = require("../data");
const {hashSync} = require('bcryptjs')

module.exports = {
    register : (req,res) => {
        res.render('register', { title: 'Registro' });
    },
    processRegister : (req,res) => {

        const errors = validationResult(req);

        if(errors.isEmpty()) {
            const users = readJSON('users.json')
            const {name, age, email, color} = req.body

            const newUser = {
                id: users.length ? users[users.length - 1].id + 1 : 1,
                name: name.trim(),
                email: email.trim(),
                age,
                color,
            }
            
            users.push(newUser);

            req.session.userLogin = {
                name,
                color,
                age,
                email
            }
            /* return res.send(req.session) */
            writeJSON('users.json', users);
            res.render('users', { title: 'Bienvenido', ...newUser });
            /* return res.send(req.body) */
        }else {
            return res.render('register', {
                title: 'Bienvenido',
                errors : errors.mapped(),
                old : req.body
              })
        }
    },
    profile : (req,res) => {
        const { id } = req.params;
        const users = readJSON('users.json')    
        const user = users.find(user => user.id === +id);
    
        return res.render("users", {
          title: "Bienvenido",
          ...user,
        })   
    },
    logout : (req,res) => {
        req.session.destroy();
        return res.redirect('/')
    }
}
