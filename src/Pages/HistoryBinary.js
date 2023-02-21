import React from 'react';
import { BiTrash } from 'react-icons/bi'
import {FaTrashRestoreAlt} from 'react-icons/fa'

const HistoryBinary = ({historyItem, items, setItems, setHistoryItem, id}) => {
    const removePermanent = (index) => {
        const data = [...historyItem];
        data.splice(index, 1);
        setHistoryItem(data);
    }

    const restore = (index) => {
        const print = [...historyItem];
        const oldData = [...items];
        oldData.splice(id, 0, {value: print[index]});
        // console.log(oldData)
        setItems(oldData);   
        print.splice(index, 1);
        setHistoryItem(print);
    }

    console.log(historyItem)
  return (
    <div className='h-screen p-3'>
        <div className='my-14'>
            <h2 className='text-3xl my-5 text-lime-500 font-bold'>History</h2>

            <div className='bg-white p-3 rounded-lg'>
                <div>
                    {historyItem.length > 1 ? (
                        <div className='flex justify-between w-full mb-3'>
                            <div></div>
                            <button onClick={() => setHistoryItem([])} className="bg-red-500 px-2 py-1.5 rounded-lg text-white">clear all</button>
                        </div>
                    ) : null}
                    {historyItem.length === 0 ? (
                        <h2>No Result</h2>
                    ) : (
                        (historyItem.map((hello, index) => (
                            <div className='flex justify-between items-center py-2' key={index}>
                                <h3>{index + 1}. <span>{hello}</span></h3>
                                <div>
                                    <button className='bg-red-500 p-2.5 text-white rounded-lg' onClick={() => removePermanent(index)} ><BiTrash /></button>
                                    <button className='bg-blue-500 p-2.5 text-white rounded-lg ml-2' onClick={() => restore(index)}><FaTrashRestoreAlt /></button>
                                </div>
                            </div>
                        )))
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default HistoryBinary;  