const express = require('express');
const router = express.Router();
const { PrismaClient } = require("../../generated/prisma");
const { QUIZ_QUESTIONS_COUNT } = require('../constants');

const prisma = new PrismaClient()

router.post('/', async (req, res) => {

    const { categoryName, userAnswers } = req.body;

    const quizPoints = QUIZ_QUESTIONS_COUNT * 10;

    let attempts = Object.keys(userAnswers).length;

    let earnedPoints = 0;

    for (const i in userAnswers) {
        const question = await prisma.question.findUnique({
            where: {
                id: i,
            },
            select: {
                correct: true
            },
        })

        const correctAnswer = question ? question.correct : null

        if (correctAnswer && correctAnswer === userAnswers[i]) {
            earnedPoints += 10
        }
    }

    const percentage = earnedPoints / quizPoints * 100

    const isPassed = percentage >= 50 ? true : false;

    const timeNow = Date.now()

    const result = {
        date: timeNow,
        categoryName,
        attempts,
        questions: QUIZ_QUESTIONS_COUNT,
        quizPoints,
        earnedPoints,
        percentage,
        isPassed
    };

    res.status(200).json(result);
})

module.exports = router;