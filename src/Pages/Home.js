import { data } from 'autoprefixer';
import React, { useState, useEffect } from 'react';
import Form from './Form'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Home = ({ name, category, getQuestions, difficulty, amount, setName, setCategory, setDifficulty, setAmount, questions, handleSubmit, datas }) => {
    // const [ questions, setQuestions ] = useState([]);
    // const [ category, setCategory ] = useState('');
    // const [ name, setName] = useState('');
    // const [ difficulty, setDifficulty ] = useState('');
    // const [ amount, setAmount ] = useState('')
    const navigate = useNavigate();

    const height = {
       height: '95vh'
    }

    const centerElement = {
        left: "50%",
        transform: "translate(-50%, -50%)",
        top: "80%",
    }   
    return(
        <div>
            <div className='flex justify-center items-center h-screen'>
                <div className="flex justify-center items-center flex-col">
                    <h1 className='text-white'>Click one of these buttons to visit</h1>
                    <div className='my-5 text-md'>
                        <Link to='/form' className='bg-lime-400 px-4 py-3 mr-3 rounded-lg'>Play Quiz</Link>
                        <Link to='/timer' className='bg-lime-400 px-4 py-3 rounded-lg mr-3'>Timer</Link>
                        <Link to='/binary' className='bg-lime-400 px-4 py-3 rounded-lg'>Multiple Search Input</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;