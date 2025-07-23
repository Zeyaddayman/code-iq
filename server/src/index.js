const express = require('express')
const cors = require('cors')

require('dotenv').config()

const questionsRouter = require('./routes/questions.route')
const resultRouter = require('./routes/result.route')
const { default: prisma } = require('./lib')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/questions', questionsRouter)
app.use('/api/result', resultRouter)
app.get('/api/test', async (req, res) => {

    const allQuestions = await prisma.question.findMany({
        where: { language: "c-plus-plus" },
        // select: {
        //     id: true,
        //     answers: true
        // }
    })

    return res.status(200).json({ status: 'success', questions: allQuestions, count: allQuestions.length })

    const specialAnswers = ["both", "Both of the above", "Both A and B", "None of the above."]

    for (let i = 0; i < allQuestions.length; i++) {
        let newAnswers = []
        if (allQuestions[i].answers[2] === "None of the above." || allQuestions[i].answers[2] === "Both of the above") {
            newAnswers[2] = allQuestions[i].answers[2]
        }

        allQuestions[i].answers.forEach(answer => {
            if (specialAnswers.includes(answer)) {
                newAnswers[2] = answer
            }
        })

        for (let j = 0; newAnswers.filter((answer) => answer !== undefined).length < 3;) {
            const randomIndex = Math.floor(Math.random() * allQuestions[i].answers.length)

            if (newAnswers[randomIndex] === undefined) {
                newAnswers[randomIndex] = allQuestions[i].answers[j]
                j++
            }
        }

        await prisma.question.update({
            where: { id: allQuestions[i].id },
            data: { answers: newAnswers }
        })
    }

    return res.status(200).json({ status: 'success' })
})

app.listen(process.env.PORT, () => {
    console.log(`listening on port: ${process.env.PORT}`)
})