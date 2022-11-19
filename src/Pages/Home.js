import { data } from 'autoprefixer';
import React, { useState, useEffect } from 'react';
import Form from '../Components/Form'
import { useNavigate } from 'react-router-dom';
import {RiHistoryLine} from 'react-icons/ri'

const Home = ({ name, category, getQuestions, difficulty, amount, setName, setCategory, setDifficulty, setAmount, questions, handleSubmit, datas }) => {
    // const [ questions, setQuestions ] = useState([]);
    // const [ category, setCategory ] = useState('');
    // const [ name, setName] = useState('');
    // const [ difficulty, setDifficulty ] = useState('');
    // const [ amount, setAmount ] = useState('');
    const [data, setData] = useState();
    const navigate = useNavigate();

    const form = {
       maxWidth: '500px'
    }

    const centerElement = {
        left: "50%",
        transform: "translate(-50%, -20%)",
    }

    return(
        <div>
            <div className='float-right relative'>
                <button onClick={() => navigate("history")} className="bg-white px-3 py-2 rounded-lg flex items-center justify-between"><RiHistoryLine className="mr-2" />History</button>
            </div>
            <div className='top-1/2 h-screen absolute' style={centerElement}>
                <div style={form}>
                    <Form 
                        handleSubmit={handleSubmit}
                        getQuestions={getQuestions}
                        questions={questions}
                        category={category}
                        name={name}
                        setData={setData}
                        data={data}
                        setName={setName}
                        setCategory={setCategory}
                        setAmount={setAmount}
                        setDifficulty={setDifficulty}
                        amount={amount}
                        difficulty={difficulty}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home;