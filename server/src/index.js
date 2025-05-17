const express = require('express');
const cors = require('cors');

require('dotenv').config();

const questionsRouter = require('./routes/questions.route');
const resultRouter = require('./routes/result.route');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/questions', questionsRouter);
app.use('/api/result', resultRouter);

app.listen(process.env.PORT, () => {
    console.log(`listening on port: ${process.env.PORT}`);
})