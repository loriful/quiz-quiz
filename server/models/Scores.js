const { Schema } = require('mongoose');
const Quiz = require('./Quiz');

const scoresSchema = new Schema(
    {
        quizId: {
            type: String,
            required: true
        },
        missed: [{type: Number}],
        tally: {
            type: Number
        }
    }  
)

module.exports = scoresSchema;
