import { clear } from '@testing-library/user-event/dist/clear';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import True from '../Audio/True.mp3'
import Wrong from '../Audio/Wrong.mp3'

const Quiz = ({questions, category, name, difficulty, amount, datas, setDatas}) => {
    const [ currentQuiz, setCurrentQuiz ] = useState(0);
    const [ score, setScore ] = useState(0);
    const [ showScore, setShowScore ] = useState(false);
    // const [ color, setColor ] = useState(false)
    // const [ text, setText ] = useState(false)
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        if (name) {
            setShowText(true);
        } else {
            setShowText(false);
        }
    })

    // console.log(questions.length);

    let checkTrue = new Audio(True);
    let checkWrong = new Audio(Wrong);

    checkWrong.volume = 0.3;

    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(59);

    useEffect(() => {
        const timer = minutes > 0 && setInterval(() => {
            setMinutes(minutes - 1);
        }, 1000);
        if (minutes <= 0) {
            clearInterval(timer);
            const startseconds = seconds > 0 && setInterval(() => {
                setSeconds(seconds - 1);
            }, 1000);
            if (seconds <= 0) {
                setCurrentQuiz(currentQuiz + 1);
                // checkWrong.play();
                if (!showScore) {
                    checkWrong.play();
                }
                setMinutes(1);
                setSeconds(59);
                // const newTimer = minutes > 0 && setInterval(() => {
                //     setMinutes(minutes - 1);
                // }, 1000)
                // if (minutes <= 0) {
                //     clearInterval(newTimer)
                // }
            }
            return () => clearInterval(startseconds);
        }
    }, [minutes, seconds, currentQuiz])

    const handleNext = () => {
        setCurrentQuiz(currentQuiz + 1);
        setShowScore(false)
        setMinutes(1);
        setSeconds(59)
    }
    
    const checkAnswers = (correct) => {
        if (!showScore) {
            // setShowText(false)
            if (correct === questions[currentQuiz].correct_answer) {
                setScore(score + 1);
                // setColor(true)
                // setText(true);
                checkTrue.play();
            } else {
                // setColor(false)
                // setText(false);
                checkWrong.play();
            }
        }
        setShowScore(true);
    }

    const pushData = () => {
        const items = [...datas];
        let data = {
            "score": score,
            "category": category,
            "name": name,
            "amount": questions.length, 
        }
        items.push(data);
        setDatas(items);
    }
    // console.log(questions.category)

    // console.log(questions.length)
    // if (questions.length <= 0) {
    //     console.log("tidak ada")
    // }

    const centerElement = {
        left: "50%",
        transform: "translate(-50%, -20%)",
    }


    return(
        <div className='bg-black h-screen'>
            {showText && (<h2 className='text-white font-bold text-3xl pt-12'>Welcome!! <span className='text-lime-400'>{name}</span></h2>)}
            <div className='top-1/2 absolute h-screen ' style={centerElement}>
            {questions.length > 0 ? (
                (currentQuiz >= questions.length ? (
                    <div className='bg-lime-400 w-fit p-6 rounded-xl'>    
                            <h2>Your score is {score} out of {questions.length}</h2>
                            <div className='flex flex-col'>
                            <button onClick={() => {setCurrentQuiz(0); setScore(0)}} className="bg-black text-white p-3 rounded-xl m-3">Try Again</button>
                                <button onClick={pushData}>
                                <Link to='/'>Go Home</Link>
                                </button>
                            </div>
                    </div>    
                            
                    ) : (
                    <div>
                        <h2 className='text-white font-bold text-3xl mb-3'><span className='text-lime-300'>Category:</span> {questions[currentQuiz].category}</h2>
                        <div className='bg-lime-400 w-fit p-6 rounded-xl'>
                        
                            <div className='w-fit'>
                                <h2 className='white'>{minutes} : {seconds}</h2>
                                <div className='flex justify-between items-center'>
                                    <div>
                                        <h2 className='mr-2'>{questions[currentQuiz]?.question}</h2>
                                    </div>
                                    <div>
                                        <h2>{currentQuiz + 1}/{questions.length}</h2>
                                    </div>
                                </div>
    
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
                    </div>    
                </div>
                ))
            ) : (
                <div className='text-center'>
                    <h2 className='text-white'>Sorry, No Result</h2>
                    <button className="bg-lime-400 p-3 rounded-xl m-3 font-semibold">
                        <Link to='/'>Try Another Question</Link>
                    </button>
                </div>
            )}
            </div>
        </div>
    )
}

export default Quiz;