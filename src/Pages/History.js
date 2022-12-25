import React, { useEffect } from 'react';
import {FaRegTrashAlt} from 'react-icons/fa'


const History = ({datas, setDatas, history}) => {
  // remove index from data
  const handleRemove = (index) => {
    const data = [...datas];
    data.splice(index, 1);
    setDatas(data);
  }
  const datedata = [...datas].sort((a, b) => b-a);
  console.log(datedata);


  
  return (
    <div className='px-3 pt-12 overflow-hidden'>   
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl my-4 text-lime-500 font-bold'>History</h2>
        {datas.length > 1 && (<button onClick={() => setDatas([])} className="bg-red-500 px-3 py-2 rounded-md font-semibold">Clear All</button>)} 
      </div>
      <div className='flex text-white overflow-x-auto '>
          {datas.length >= 1 ? (
            (datas.map((data) => (
              <div className='bg-lime-400 w-fit p-5 mr-3 my-3 flex rounded-lg'>
                  <div>
                    <h2 className='font-semibold text-black'><span className='font-normal'>Date:</span> {data.date}</h2>
                    <h2 className='font-semibold text-black'><span className='font-normal'>Name:</span> {data.name}</h2>
                    <h2 className='font-semibold text-black'><span className='font-normal'>Score:</span> {data.score}/{data.amount}</h2>
                    <h2 className='font-semibold text-black'><span className='font-normal'>Category:</span> {data.category}</h2>
                  </div>
                  <div>
                    <button onClick={() => handleRemove(data)} className="bg-red-400 p-2 ml-9 rounded-md"><FaRegTrashAlt /></button>
                  </div>
              </div>
            )))
          ) : (
            <h2>No Result</h2>
          )}
        </div>
    </div>
  )
}

export default History