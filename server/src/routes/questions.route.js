const express = require('express');
const router = express.Router();
const { PrismaClient } = require("../../generated/prisma");
const { QUIZ_QUESTIONS_COUNT } = require('../constants');

const prisma = new PrismaClient()

router.get('/', async (req, res) => {

    const { category } = req.query

    if (!category) {
        return res.status(400).json({status: 'failed'})
    }

    // random questions
    const result = await prisma.$runCommandRaw({
        aggregate: 'Question',
        pipeline: [
            { $match: { category } },
            { $sample: { size: QUIZ_QUESTIONS_COUNT } }
        ],
        cursor: {}
    });

    const questions = result.cursor.firstBatch.map((question) => ({
        id: question._id.$oid,
        title: question.title,
        category: question.category,
        answers: question.answers,
    }))

    return res.status(200).json({status: 'success', data: { questions }})
})

module.exports = router;