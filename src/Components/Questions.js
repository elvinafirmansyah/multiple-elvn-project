import React from 'react';

const Questions = ({ questions, currentQuiz, showScore, handleNextButton, checkAnswers, color, score }) => {
    return(
        <div>
            <h2 className={currentQuiz >= questions.length ? 'block' : 'hidden'}>ur score out {score} of {questions.length}</h2>
            <div>

                <h2>{questions[currentQuiz].question}</h2>
                {questions[currentQuiz].answers.map((question) => (
                    <h2 className={color ? "text-green-500" : "black"} onClick={() => checkAnswers(question)}>{question}</h2>
                ))}
                {showScore && (
                    <button onClick={handleNextButton}>Next</button>
                )}
            </div>
        </div>
    )
}

export default Questions;