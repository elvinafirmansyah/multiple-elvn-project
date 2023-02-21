import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Data from '../Data/Data'
import ErrorMessage from '../Components/ErrorMessage';
import {RiHistoryLine} from 'react-icons/ri'


const Form = ({ name, category, getQuestions, difficulty, amount, setName, setCategory, setDifficulty, setAmount}) => {
    // const [ error, setError ] = useState(false);
    const navigate = useNavigate();
    const [err, setErr] = useState('');
    // const currentSecs = new Date().getSeconds();
    // const currentMins = new Date().getMinutes();
    // const currentHours = new Date().getHours();

    // console.log(currentHours, currentMins, currentSecs);
    const centerElement = {
        left: "50%",
        transform: "translate(-50%, -20%)",
    }
    const form = {
        maxWidth: '500px'
     }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!category || !difficulty || !amount || !name) {
            setErr('Isi form dengan lengkap')
        } else if (category === "Category" || difficulty === 'Difficulty') {
            setErr("Isi form dengan lengkap");
        } else {
            getQuestions(category, difficulty, amount);
            navigate('/quiz');
        }
    }

    return(
        <div>
            <div className='float-right absolute right-0 m-3'>
                <button onClick={() => navigate("/history")} className="bg-white px-3 py-2 rounded-lg flex items-center justify-between"><RiHistoryLine className="mr-2" />History</button>
            </div>
            <div className='h-screen flex justify-center items-center flex-col'>
            <div style={form}>
                <div className='block p-6 rounded-xl bg-lime-400 max-w-md'>
                    <form onSubmit={handleSubmit}>
                        <ErrorMessage>{err}</ErrorMessage>
                        <div className="form-group mb-6">
                        <input  className="form-control block
                            w-full
                            px-4
                            py-2
                            text-base
                            font-normal
                            text-gray-700
                            bg-white
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput7"
                            placeholder="Name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        </div>
                        <div className="form-group mb-6">
                        <select class="form-select form-select-lg mb-3
                            appearance-none
                            block
                            w-full
                            px-4
                            py-2
                            text-base
                            font-normal
                            text-gray-700
                            bg-white
                            outline-0
                            rounded
                            border-0
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-0 focus:outline-none" aria-label=".form-select-lg example"
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}

                        >
                                <option selected className='text-gray-700'>Category</option>
                                {Data.map((item) => (
                                <option value={item.id} key={item.category}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group mb-6">
                        <select class="form-select form-select-lg mb-3
                            appearance-none
                            block
                            w-full
                            px-4
                            py-2
                            text-base
                            font-normal
                            text-gray-700
                            bg-white
                            outline-0
                            rounded
                            border-0
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-0 focus:outline-none" aria-label=".form-select-lg example
                        " 
                            name="difficulty"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value)}

                        >
                                <option selected className='text-gray-700'>Difficulty</option>
                                <option value='easy'>Easy</option>
                                <option value='medium'>Medium</option>
                                <option value='hard'>Hard</option>
                            </select>
                        </div>
                        <div className="form-group mb-6">
                            <input type='number' className='form-control block
                            w-full
                            px-4
                            py-2
                            text-base
                            font-normal
                            text-gray-700
                            bg-white
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' min='1' max='50' placeholder="Amount" 
                            name="amount"
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)} />
                        </div>
                        <button type="submit" className="
                            w-full
                            px-6
                            py-3
                            bg-black
                            text-white
                            font-medium
                            text-xs
                            leading-tight
                            uppercase
                            rounded-lg
                            shadow-md
                            hover:bg-gray-800 hover:shadow-lg
                            focus:shadow-lg focus:outline-none focus:ring-0
                            active:bg-gray-800 active:shadow-lg
                            transition
                            duration-150
                            ease-in-out"
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Form;