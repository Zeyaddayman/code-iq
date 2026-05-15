const express = require('express')
const router = express.Router()

const { default: db } = require('../lib')

router.get('/', async (req, res) => {

    const allQuestions = await db.question.findMany()

    const result = allQuestions.filter(question => {

        return question.answers.length !== 3
    })

    return res.status(200).json({ result, status: 'success' })
})

module.exports = router