import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import True from '../Audio/True.mp3'
import Wrong from '../Audio/Wrong.mp3'

const Quiz = ({questions, category, name, difficulty, amount}) => {
    const [ currentQuiz, setCurrentQuiz ] = useState(0);
    const [ score, setScore ] = useState(0);
    const [ showScore, setShowScore ] = useState(false);
    const [ color, setColor ] = useState(false)
    const [ text, setText ] = useState(false)
    const [showText, setShowText] = useState(false);
    const [timer, setTimer] = useState(0);


    useEffect(() => {
        if (name) {
            setShowText(true);
        } else {
            setShowText(false);
        }
    })

    console.log(questions.length);

    let checkTrue = new Audio(True);
    let checkWrong = new Audio(Wrong);


    // const checkTrue = () => {
    //     audio.play();
    // }


    checkWrong.volume = 0.3;


    const checkAnswers = (correct) => {
        if (!showScore) {
            // setShowText(false)
            if (correct === questions[currentQuiz].correct_answer) {
                setScore(score + 1);
                setColor(true)
                // setText(true);
                checkTrue.play();
            } else {
                setColor(false)
                // setText(false);
                checkWrong.play();
            }
        }
        setShowScore(true);
    }

    const handleNext = () => {
        setCurrentQuiz(currentQuiz + 1);
        setShowScore(false)
    }

    // const handleClick = (e, correct) => {
    //     e.preventDefault();
    //     handleClick();
    //     checkAnswers(correct)  
    // }

    console.log(questions[currentQuiz])


    return(
        <div className='bg-black h-screen'>
            {showText && (<h2 className='text-white font-bold text-3xl'>Welcome!! {name}</h2>)}
            <div className='flex justify-center items-center h-screen flex-col'>
                <div className='bg-lime-400 w-fit p-6 rounded-xl'>
                    {currentQuiz >= questions.length ? (
                        <div>
                            <h2>Your score is {score} out of {questions.length}</h2>
                            <div className='flex flex-col'>
                                <button onClick={() => {setCurrentQuiz(0); setScore(0)}} className="bg-black text-white p-3 rounded-xl m-3">Try Again</button>
                                <button>
                                    <Link to='/'>Go Home</Link>
                                </button>
                            </div>
                        </div>

                    ) : (
                        <div className='w-fit'>
                            <h2 className='text-white font-bold text-3xl'>Cateogry: {questions[currentQuiz].category}</h2>
                            <div className='flex justify-between items-center'>
                                <div>
                                    <h2>{currentQuiz + 1}/{questions.length}</h2>
                                </div>
                                <div>
                                </div>
                            </div>
                            <h2>{questions[currentQuiz]?.question}</h2>

                            <div className="flex justify-between items-center">
                                <div>
                                    {questions?.[currentQuiz]?.answers.map((question) => (
                                        <h2
                                            className='cursor-pointer py-3 grid grid-cols-4 gap-4'
                                            onClick={() => { checkAnswers(question); handleNext() }}
                                        >
                                            <div>
                                                {question}
                                            </div>
                                        </h2>
                                    ))}
                                </div>
                                
                            </div>
                        </div>
                    )}
                </div>     
            </div>
        </div>
    )
}

export default Quiz;