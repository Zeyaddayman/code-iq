const express = require('express')
const router = express.Router()

const { QUIZ_QUESTIONS_COUNT, LANGUAGES } = require('../constants')
const { default: db } = require('../lib')

router.get('/', async (req, res) => {

    const { language } = req.query

    if (!language) {
        return res.status(400).json({status: 'failed', message: "Programming language required"})
    }

    if (!LANGUAGES.includes(language)) {
        return res.status(400).json({status: 'failed', message: "Unsupported programming language"})
    }

    const allLanguageQuestions = await db.question.findMany({
        where: { language },
        select: {
            id: true,
            title: true,
            answers: true
        }
    })

    const randomQuestions = []
    const selectedIDs = {}

    while (randomQuestions.length < QUIZ_QUESTIONS_COUNT) {

        const randomIndex = Math.floor(Math.random() * allLanguageQuestions.length)

        // Check if question is already selected
        if (selectedIDs[allLanguageQuestions[randomIndex].id]) continue

        selectedIDs[allLanguageQuestions[randomIndex].id] = true
        randomQuestions.push(allLanguageQuestions[randomIndex])
    }

    return res.status(200).json({ status: 'success', questions: randomQuestions, language })
})

module.exports = router