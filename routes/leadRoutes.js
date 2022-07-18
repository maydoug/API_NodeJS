const router = require('express').Router()

const Lead = require('../models/Lead')


// Criação de Dados
router.post('/', async (req, res) => {

    // req.body
    const { email } = req.body

    // validação
    if(!email){
        res.status(422).json({ error: 'é necessario informar o email' })
        return
    }

    const lead = {
        email
    }

    // create (criando dados)
    try {
        await Lead.create(lead)
        res.status(201).json({ message: 'email cadastrado com sucesso' })

    } catch(error) {
        res.status(500).json({error: error})
    }

})

module.exports = router 