import { data } from 'autoprefixer';
import React, { useEffect, useState } from 'react';
import {FaRegTrashAlt} from 'react-icons/fa'


const History = ({datas, setDatas, history}) => {
  // remove index from data
  const handleRemove = (index) => {
    const data = [...datas];
    
    data.splice(index, 1);
    setDatas(data);
  }

  // console.log(datas);

  // const full = datas.map((e) => e.date);
  // const datedata = full.sort((date1, date2) => new Date(date2).setHours(0, 0, 0, 0) - new Date(date1).setHours(0, 0, 0, 0));

  // const reverseIt = datedata.reverse();
  const getNew = datas.sort((a, b) => (a.date < b.date) ? 1 : (a.date > b.date) ? -1 : 0);
  // console.log(getNew);
  // const [historyQuiz, setHistoryQuiz] = useState([]);

  // useEffect(() => {
  //   // const filtered = datas.map((e) => e.date).filter((item) => {
  //   //   return item.
  //   // })
  //   // console.log(filtered)
  //   setHistoryQuiz()
  //   // setHistoryQuiz(historyItem);
  // }, [datas, reverseIt, historyQuiz])
  // console.log(historyQuiz)

  // console.log(datas)
  
  return (
    <div className='px-3 pt-12 h-screen overflow-hidden'>   
      <div className='flex justify-between items-center'>
        <h2 className='text-3xl my-4 text-lime-500 font-bold'>History</h2>
        {datas.length > 1 && (<button onClick={() => setDatas([])} className="bg-red-500 px-3 py-2 rounded-md font-semibold">Clear All</button>)} 
      </div>
      <div className='flex text-white overflow-x-auto '>
          {datas.length >= 1 ? (
            (datas.sort((a, b) => (a.date < b.date) ? 1 : (a.date > b.date) ? -1 : 0).map((data) => (
              <div className='bg-lime-400 w-fit p-5 mr-3 my-3 flex rounded-lg'>
                  <div>
                    <h2 className='font-semibold text-black'><span className='font-normal'>Date:</span> {data.date}</h2>
                    <h2 className='font-semibold text-black'><span className='font-normal'>Name:</span> {data.name}</h2>
                    <h2 className='font-semibold text-black'><span className='font-normal'>Score:</span> {data.score}/{data.amount}</h2>
                    <h2 className='font-semibold text-black'><span className='font-normal'>Category:</span> {data.category}</h2>
                  </div>
                  <div>
                    <button onClick={() => handleRemove(data)} className="bg-red-400 p-2 ml-9 rounded-md"><FaRegTrashAlt /></button>
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