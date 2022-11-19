import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './Pages/Home'
import Quiz from './Components/Quiz'
import History from './Pages/History';
import {BiArrowBack} from 'react-icons/bi'

// import axios from 'axios'

function App() {
  const [ questions, setQuestions ] = useState([]);
  const [ category, setCategory ] = useState('');
  const [ name, setName] = useState('');
  const [ difficulty, setDifficulty ] = useState('');
  const [ amount, setAmount ] = useState('');
  const [ score, setScore ] = useState(0);
  const [ datas, setDatas] = useState([])
  // const [ currentQuiz, setCurrentQuiz ] = useState(0);

  // console.log(questions)s
  // console.log(datas.category);

  // console.log([...datas]);  
  // useEffect(() => {
  //   // const getHistory = (index) => {
  //     //   let items = []
  //     //   items.push(index);
  //     //   setDatas(items);
  //     // }
  //     // console.log(questions);
  //   // let categories = {
  //   //   category: questions[currentQuiz].category,
  //   // }
  //   // setCategoryItem(categories.category)
      
  //   // console.log(categoryItem);
    
  //   // console.log(category)
  //   let items = [];
  //   let data = {
  //     category: questions,
  //     score: score,
  //   }
    
  //   // console.log(data[0].map((i) => i.category))
    
  //   items.push(data)
  //   setDatas(items[0]);
  //   console.log(datas);
  // })

  
  // Fetch Data / Mengambil data API
  
  const getQuestions = async (category = "", difficulty = "", amount = "") => {
    const data = await fetch(
      `https://opentdb.com/api.php?${amount && `amount=${amount}`}${category && `&category=${category}`}${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );

    const resp = await data.json();
    const createAnswers = resp.results.map((answer) => ({
        ...answer,
        answers: [answer.correct_answer, ...answer.incorrect_answers].sort(() => (Math.random() > .5) ? 1 : -1),
    }))
    setQuestions(createAnswers);
  };

  // const getQuestions = async (category = "", difficulty = "", amount = "") => {
  //   const {data} = await axios.get(
  //     `https://opentdb.com/api.php?${amount && `amount=${amount}`}${category && `&category=${category}`}${difficulty && `&difficulty=${difficulty}`}&type=multiple`
  //   )

  //   const {results} = data
  //   const createAnswers = results.map((answer) => ({
  //       ...answer,
  //       answers: [answer.correct_answer, ...answer.incorrect_answers].sort(() => Math.random() - 0.5)
  //   }))
  //   setQuestions(createAnswers);
  //   console.log(questions)
  
  // };

  const navigate = useNavigate();

  // if (navigate('/')) {
  //   console.log("ok berarti benar")
  // }

  return (
    <div className="bg-black h-screen p-3">
      <div>
        <button className='bg-lime-500 p-3 rounded-lg absolute' onClick={() => navigate(-1)}><BiArrowBack /></button>
      </div>
      <div>
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
              datas={datas}
            />} 
          />
          <Route path='/quiz' element={
            <Quiz 
              name={name}
              category={category}
              questions={questions}
              amount={amount}
              difficulty={difficulty}
              setScore={setScore}
              score={score}
              datas={datas}
              setDatas={setDatas}
            />
          } />
          <Route path='/history' element={
            <History
              datas={datas}
              setDatas={setDatas}
            />
          }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
