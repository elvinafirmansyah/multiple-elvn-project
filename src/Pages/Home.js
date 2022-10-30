import React, { useState } from 'react';
import Form from '../Components/Form'

const Home = ({ name, category, getQuestions, difficulty, amount, setName, setCategory, setDifficulty, setAmount, questions, handleSubmit }) => {
    // const [ questions, setQuestions ] = useState([]);
    // const [ category, setCategory ] = useState('');
    // const [ name, setName] = useState('');
    // const [ difficulty, setDifficulty ] = useState('');
    // const [ amount, setAmount ] = useState('');

    // const getQuestions = async (category = "", difficulty = "", ammount = "") => {
    //     const {data} = await fetch(
    //         `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
    //     )  
    //     const resp = await data.json();
    //     const createAnswers = resp.results.map((answer) => ({
    //         ...answer,
    //         answers: [answer.correct_answers, ...answer.incorrect_answer].sort(() => Math.random() - 0,5)
    //     }))
    //     setQuestions(createAnswers);
    // }
    return(
        <>
            <h2>Welcome back!!!</h2>
            <Form 
                handleSubmit={handleSubmit}
                getQuestions={getQuestions}
                questions={questions}
                category={category}
                name={name}
                setName={setName}
                setCategory={setCategory}
                setAmount={setAmount}
                setDifficulty={setDifficulty}
                amount={amount}
                difficulty={difficulty}
            />
        </>
    )
}

export default Home;