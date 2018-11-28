'use strict';

const ValidationContract = require('../validators/fluentValidator');
const repository = require('../repository/customerRepository');
const md5 = require('md5');

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O nome deve conter pelo menos 3 caracteres');
    contract.isEmail(req.body.email, 'E-mail inválido');
    contract.hasMinLen(req.body.password, 3, 'A senha deve conter pelo menos 3 caracteres');

    // Se os dados forem inválidos
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try{
        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)

        })
        res.status(201).send({
            message: 'Cliente cadastrado com sucesso!'
        });
    }catch(e){
        res.status(400).send({
            message: 'Falha ao processar sua requisição!'
        });
    }
};
