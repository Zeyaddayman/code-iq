const express = require('express')
const router = express.Router()
const { QUIZ_QUESTIONS_COUNT } = require('../constants')
const { default: prisma } = require('../lib')

router.get('/', async (req, res) => {

    const { language } = req.query

    if (!language) {
        return res.status(400).json({status: 'failed', message: "Programming language required"})
    }

    // random questions by language
    const result = await prisma.$runCommandRaw({
        aggregate: 'Question',
        pipeline: [
            { $match: { language } },
            { $sample: { size: QUIZ_QUESTIONS_COUNT } }
        ],
        cursor: {}
    })

    const questions = result.cursor.firstBatch.map((question) => ({
        id: question._id.$oid,
        title: question.title,
        language: question.language,
        answers: question.answers,
    }))

    if (questions.length !== QUIZ_QUESTIONS_COUNT) {
        return res.status(400).json({status: 'failed', message: `Language ${language} is not available`})
    }

    return res.status(200).json({status: 'success', questions, language })
})

module.exports = router