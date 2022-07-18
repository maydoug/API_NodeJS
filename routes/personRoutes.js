const router = require('express').Router()

const Person = require('../models/Person')


// Criação de Dados
router.post('/', async (req, res) => {

    // req.body
    const {name, sobrenome, email, fone, app, pais, descricao} = req.body

    // validação
    if(!name){
        res.status(422).json({ error: 'O nome é obrigatório' })
        return
    }

    const person = {
        name,
        sobrenome,
        email,
        fone,
        app,
        pais,
        descricao
    }

    // create (criando dados)
    try {
        await Person.create(person)
        res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso' })

    } catch(error) {
        res.status(500).json({error: error})
    }

})

// Leitura todos os dados (read)
router.get('/', async (req, res) => {
    try {
        const people = await Person.find()

        res.status(200).json(people)
    } catch (error){
        res.status(500).json({ error: error })
    }
})

// Leitura pelo ID (read)
router.get('/:id', async (req, res) => {

// extrair o dado da requisição, pela url = req.params
    const id = req.params.id
    try{
        const person = await Person.findOne({_id: id})
        
        if(!person){
            res.status(422).json({message: 'Usuário não encontrado'})
            return
        }
        
        res.status(200).json(person)
    }catch {
        res.status(500).json({ error: error })
    }

})

// *UPDATE* Atualização dos dados (PU|T, PATCH)
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const { name, sobrenome, email, fone, app, pais, descricao} = req.body
    const person = {
        name, 
        sobrenome,
        email,
        fone,
        app,
        pais,
        descricao
    }
    try{

        const updatePerson = await Person.updateOne({ _id: id }, person)
        if(updatePerson.matchedCount === 0){
            res.status(422).json({message: 'Usuário não encontrado'})
            return
        }
        
        res.status(200).json(person)

    }catch {
        res.status(500).json({error: error})
    }

})

// *DELETE* - Apagar Registros
router.delete('/:id', async (req, res) => {
    const id = req.params.id

    const person = await Person.findOne({ _id: id })

    if(!person){
        res.status(422).json({ message: 'Usuário não foi encontrado!'})
        return
    }

    try{

        await Person.deleteOne({ _id: id })
        res.status(200).json({ message: 'O usuário foi removido com sucesso!' })

    }catch{
        res.status(500).json({ error: error })
    }
})


module.exports = router