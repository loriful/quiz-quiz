const { Schema } = require('mongoose');

const questionSchema = new Schema(
    {
        question: {
            type: String,
        },
        answersArr: [{type: String}],     
        correct: {
            type: Number
        }
    }

)

module.exports = questionSchema;