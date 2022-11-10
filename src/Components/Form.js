import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Data from '../Data/Data'

const Form = ({ name, category, getQuestions, difficulty, amount, setName, setCategory, setDifficulty, setAmount }) => {
    const [ error, setError ] = useState(false);
    const [items, setItems] = useState([]);
    const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // let anjir = {
    //     name: name,
    //     category: category,
    //     amount: amount,
    //     difficulty: difficulty,
    // }
    // setItems(anjir);
    if (!category || !name || !difficulty || !amount) {
      setError(true);
    } else { 
      setError(false);
      getQuestions(category, difficulty, amount);
      navigate('quiz')
    }
  }
    return(
        <div>
            <div className='block p-6 rounded-lg bg-gray-200 max-w-md'>
                <form onSubmit={handleSubmit}>
                    {error && <h1 className='text-red-500'>anjay tulah isi form</h1>}
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

                        value={category}
                        onChange={(e) => setCategory(e.target.value)}

                    >
                            <option selected>Category</option>
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
                    
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}

                    >
                            <option selected>Difficulty</option>
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
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' min='1' max='50' placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    <button type="submit" className="
                        w-full
                        px-6
                        py-2.5
                        bg-blue-600
                        text-white
                        font-medium
                        text-xs
                        leading-tight
                        uppercase
                        rounded
                        shadow-md
                        hover:bg-blue-700 hover:shadow-lg
                        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                        active:bg-blue-800 active:shadow-lg
                        transition
                        duration-150
                        ease-in-out"
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Form;