const express = require('express')
const router = express.Router()
const { QUIZ_QUESTIONS_COUNT } = require('../constants')
const { default: prisma } = require('../lib')

router.post('/', async (req, res) => {

    const { userAnswers } = req.body

    const quizPoints = QUIZ_QUESTIONS_COUNT * 10

    let attempts = Object.keys(userAnswers).length

    let earnedPoints = 0

    for (const id in userAnswers) {
        const question = await prisma.question.findUnique({
            where: {
                id
            },
            select: {
                correct: true
            }
        })

        const correctAnswer = question ? question.correct : null

        if (correctAnswer && correctAnswer === userAnswers[id]) {
            earnedPoints += 10
        }
    }

    const percentage = earnedPoints / quizPoints * 100

    const isPassed = percentage >= 50 ? true : false

    const date = Date.now()

    const result = {
        date,
        attempts,
        questions: QUIZ_QUESTIONS_COUNT,
        quizPoints,
        earnedPoints,
        percentage,
        isPassed
    }

    res.status(200).json(result)
})

module.exports = router