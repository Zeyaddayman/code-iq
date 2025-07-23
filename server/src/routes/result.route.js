const express = require('express')
const router = express.Router()
const { QUIZ_QUESTIONS_COUNT } = require('../constants')
const { default: prisma } = require('../lib')

router.post('/', async (req, res) => {

    const { userAnswers } = req.body

    const quizPoints = QUIZ_QUESTIONS_COUNT * 10

    let attempts = Object.keys(userAnswers).length

    let earnedPoints = 0

    const wrongAnsweredQuestions = []

    for (const id in userAnswers) {
        const question = await prisma.question.findUnique({
            where: { id },
            select: {
                title: true,
                correct: true
            }
        })

        const correctAnswer = question.correct

        if (correctAnswer === userAnswers[id]) {
            earnedPoints += 10
        } else {
            const wrongAnsweredQuestion = {
                title: question.title,
                userAnswer: userAnswers[id],
                correctAnswer
            }
            wrongAnsweredQuestions.push(wrongAnsweredQuestion)
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
        isPassed,
        wrongAnsweredQuestions
    }

    res.status(200).json(result)
})

module.exports = router