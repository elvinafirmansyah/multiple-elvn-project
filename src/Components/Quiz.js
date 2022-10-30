import React, { useState, useEffect } from 'react';

const Quiz = ({questions, category, name, difficulty, amount}) => {
    const [ currentQuiz, setCurrentQuiz ] = useState(0);
    const [ score, setScore ] = useState(0);
    const [ showScore, setShowScore ] = useState(false);
    const [ color, setColor ] = useState(false)


    const checkAnswers = (correct) => {
        if (!showScore) {
            if (correct === questions[currentQuiz].correct_answer) {
                setScore(score + 1);
                setColor(true)
            } else {
                setColor(false);
            }
        }
        setShowScore(true);
    }


    const handleNextButton = () => {
        setCurrentQuiz(currentQuiz + 1)
        setShowScore(false);
    }


    return(
        <div>
            <div>
            <h2 className={currentQuiz >= questions.length ? 'block' : 'hidden'}>ur score out {score} of {questions.length}</h2>
            <div>
                <h2>{currentQuiz + 1}/{questions.length}</h2>
                <h2>{questions[currentQuiz].question}</h2>
                {questions[currentQuiz].answers.map((question) => (
                    <h2 className={color ? "text-green-500" : "black"} onClick={() => checkAnswers(question)}>{question}</h2>
                ))}
                {showScore && (
                    <button onClick={handleNextButton}>Next</button>
                )}
            </div>
    </div>

        </div>
    )
}

export default Quiz;