import { data } from 'autoprefixer';
import React, { useState, useEffect } from 'react';
import Form from '../Components/Form'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Home = ({ name, category, getQuestions, difficulty, amount, setName, setCategory, setDifficulty, setAmount, questions, handleSubmit, datas }) => {
    // const [ questions, setQuestions ] = useState([]);
    // const [ category, setCategory ] = useState('');
    // const [ name, setName] = useState('');
    // const [ difficulty, setDifficulty ] = useState('');
    // const [ amount, setAmount ] = useState('')
    const navigate = useNavigate();

    const form = {
       maxWidth: '500px'
    }

    const centerElement = {
        left: "50%",
        transform: "translate(-50%, -50%)",
        top: "80%",
    }   
    return(
        <div>
            <div className='h-screen flex justify-center items-center'>
                <div className="flex justify-center items-center flex-col">
                    <h1 className='text-white'>Click one of these buttons to visit</h1>
                    <div className='my-5'>
                        <Link to='/form' className='bg-lime-400 px-3 py-2.5 mr-3 rounded-lg'>Form</Link>
                        <Link to='/timer' className='bg-lime-400 px-3 py-2.5 rounded-lg mr-3'>Timer</Link>
                        <Link to='/binary' className='bg-lime-400 px-3 py-2.5 rounded-lg'>Binary</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;