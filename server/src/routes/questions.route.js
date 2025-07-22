const express = require('express')
const router = express.Router()
const { QUIZ_QUESTIONS_COUNT } = require('../constants')
const { default: prisma } = require('../lib')

router.get('/', async (req, res) => {

    const { language } = req.query

    if (!language) {
        return res.status(400).json({status: 'failed', message: "Programming language required"})
    }

    const allLanguageQuestions = await prisma.question.findMany({
        where: {
            language
        },
        select: {
            id: true,
            title: true,
            answers: true
        }
    })

    if (allLanguageQuestions.length < QUIZ_QUESTIONS_COUNT) {
        return res.status(400).json({status: 'failed', message: `Not enough questions for ${language} language`})
    }

    const randomQuestions = []
    const selectedIndexes = []

    while (randomQuestions.length < QUIZ_QUESTIONS_COUNT) {
        const randomIndex = Math.floor(Math.random() * allLanguageQuestions.length)

        if (selectedIndexes[randomIndex]) continue

        selectedIndexes.push(randomIndex)
        randomQuestions.push(allLanguageQuestions[randomIndex])
    }

    return res.status(200).json({ status: 'success', questions: randomQuestions, language })
})

module.exports = router