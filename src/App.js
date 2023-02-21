import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Pages/Home';
import Quiz from './Components/Quiz';
import Form from './Pages/Form';
import Timer from './Pages/Timer';
import History from './Pages/History';
import Binary from './Pages/Binary';
import HistoryBinary from './Pages/HistoryBinary';
import {BiArrowBack} from 'react-icons/bi'

// import axios from 'axios'

function App() {
  const [ questions, setQuestions ] = useState([]);
  const [ category, setCategory ] = useState('');
  const [ name, setName] = useState('');
  const [ difficulty, setDifficulty ] = useState('');
  const [ amount, setAmount ] = useState('');
  const [ score, setScore ] = useState(0);
  
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
  

  const navigate = useNavigate();

  // Add data to localStorage 
  const savedItems = () => {
    const saved = JSON.parse(localStorage.getItem('items'));
    if (saved) {
      return JSON.parse(localStorage.getItem('items'));
    } else {
      return []
    }
  } 

  const savedHistoryBinary = () => {
    const saved = JSON.parse(localStorage.getItem('historybinary'));
    if (saved) {
      return JSON.parse(localStorage.getItem('historybinary'));
    } else {
      return []
    }
  } 

  const savedHistory = () => {
    const saved = JSON.parse(localStorage.getItem('history'));
    if (saved) {
      return JSON.parse(localStorage.getItem('history'));
    } else {
      return []
    }
  } 
  
  // history Quiz
  const [datas, setDatas] = useState(savedHistory);

  // console.log(datas);

  // const [newTest, setNewTest] = useState([]);




  // History Data Binary
  const [items, setItems] = useState(savedItems);
  const [historyItem, setHistoryItem] = useState(savedHistoryBinary);
  const [id, setId] = useState([]);
  
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
    localStorage.setItem('historybinary', JSON.stringify(historyItem));
    localStorage.setItem('history', JSON.stringify(datas));
  }, [items, historyItem, datas]);
  return (
    <div className="bg-black relative">
      <div className="absolute m-3 ">
        <button className='bg-lime-500 p-3 rounded-lg absolute' onClick={() => navigate(-1)}><BiArrowBack /></button>
      </div>
      <div className=''>
        <button className='bg-lime-500 p-2 rounded-lg absolute m-3 ml-16' onClick={() => navigate('/')}>Home</button>
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
          <Route path='/form' element={
            <Form 
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
          }/>
          <Route path='/timer' element={
            <Timer />
          }/>
          <Route path='/binary' element={
            <Binary
              setHistoryItem={setHistoryItem}
              historyItem={historyItem}
              setId={setId}
              id={id}
              items={items}
              setItems={setItems}
            />
          }/>
          <Route path='/historybinary' element={
            <HistoryBinary
              setHistoryItem={setHistoryItem}
              historyItem={historyItem}
              setId={setId}
              id={id}
              items={items}
              setItems={setItems}
            />
          }/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
