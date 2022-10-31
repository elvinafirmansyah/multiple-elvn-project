import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Quiz from './Components/Quiz'
import axios from 'axios'

function App() {
  const [ questions, setQuestions ] = useState([]);
  const [ category, setCategory ] = useState('');
  const [ name, setName] = useState('');
  const [ difficulty, setDifficulty ] = useState('');
  const [ amount, setAmount ] = useState('');
  
  // const getQuestions = async (category = "", difficulty = "", amount = "") => {
  //   const data = await fetch(
  //     `https://opentdb.com/api.php?${amount && `amount=${amount}`}${category && `&category=${category}`}${difficulty && `&difficulty=${difficulty}`}&type=multiple`
  //   );

  //   const resp = await data.json();
  //   const createAnswers = resp.results.map((answer) => ({
  //       ...answer,
  //       answers: [answer.correct_answer, ...answer.incorrect_answers].sort(() => Math.random() - 0.5),
  //       setQuestions(createAnswers)
  //   }))
  //   console.log(...questions)
  // };
  
  // const getQuestions = async (category = "", difficulty = "", amount = "") => {
  //   const data = await fetch(
  //     `https://opentdb.com/api.php?${amount && `amount=${amount}`}${category && `&category=${category}`}${difficulty && `&difficulty=${difficulty}`}&type=multiple`
  //   );

  //   const resp = await data.json();
  //   const createAnswers = resp.results.map((answer) => ({
  //       ...answer,
  //       answers: [answer.correct_answer, ...answer.incorrect_answers].sort(() => Math.random() - 0.5)
  //   }))
  //   setQuestions(...createAnswers);
  //   console.log(questions)
  // };

  // const getQuestions = async (category = "", difficulty = "", amount = "") => {
  //   const data = await fetch(
  //     `https://opentdb.com/api.php?${amount && `amount=${amount}`}${category && `&category=${category}`}${difficulty && `&difficulty=${difficulty}`}&type=multiple`
  //   );

  //   const resp = await data.json();
  //   let newData = []
  //   const createAnswers = resp.results.map((answer) => {
  //     newData.push({
  //       ...answer,
  //       answers: [answer.correct_answer, ...answer.incorrect_answers].sort(() => Math.random() - 0.5)
  //   })
  //   })
  //   setQuestions(createAnswers);
  //   console.log(questions)
  // };

  const getQuestions = async (category = "", difficulty = "", amount = "") => {
    const {data} = await axios.get(
      `https://opentdb.com/api.php?${amount && `amount=${amount}`}${category && `&category=${category}`}${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    )

    const {results} = data
    const createAnswers = results.map((answer) => ({
        ...answer,
        answers: [answer.correct_answer, ...answer.incorrect_answers].sort(() => Math.random() - 0.5)
    }))
    setQuestions(createAnswers);
  };

  


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={
          <Home
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
          />} 
        />
        <Route path='/quiz' element={
          <Quiz 
            name={name}
            category={category}
            questions={questions}
            amount={amount}
            difficulty={difficulty}
          />
        } />
      </Routes>
    </div>
  );
}

export default App;
