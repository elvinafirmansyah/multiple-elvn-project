import { type } from '@testing-library/user-event/dist/type';
import { data } from 'autoprefixer';
import React, { useEffect, useState } from 'react'
import { BiTrash } from 'react-icons/bi'


const Binary = () => {

    const [arrays, setArrays] = useState("");
    const [items, setItems] = useState([]);
    const [showBinary, setShowBinary] = useState(false);
    const [binary, setBinary] = useState();
    const [target, setTarget] = useState();

    
    const binarySearch = (arr, target) => {
        let first = 0;
        let last = arr.length - 1;
        while(first<=last) {
            const midpoint = Math.floor((first + last) / 2)
            if (arr[midpoint] === target) {
                return "Target is found at index " + midpoint;
                // return midpoint;
                // return midpoint;    
            } else if (arr[midpoint] < target) {
                // console.log(first = midpoint + 1)
                first = midpoint + 1
                // setBinary(first = midpoint + 1);
            } else {
                // console.log(last = midpoint - 1);
                last = midpoint - 1
                // setBinary(last = midpoint - 1);
            }
        } 
        // console.log("not found")
        // setBinary("not found")
        return "Target is not found";
    }

    const binarySubmit = (e) => {
        e.preventDefault();
        setBinary(binarySearch(items, target))
    }

    // console.log(target)

    useEffect(() => {
        if (items.length === 0) {
            setShowBinary(false)
        } else {
            setShowBinary(true);
        }
    }, [items, binary])

    const [err, setErr] = useState(false);
    const [textError, setTextError] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (arrays === '') return;
        // checkArrays(items, arrays)
        addArray(arrays)
        // setId((id) => id + 1);.
        setArrays('');
    }
    
    const addArray = (index) => {
        // data.push(index);
        const check = (item) => item === index;
        const checkData = items.some(check);
        // console.log(checkData);
        if (items.length >= 10) {
            setErr(true);
            setTextError('items are already full')
        } else {
            if (checkData === true) {
                setErr(true);
                setTextError('input yang lain');
            } else {
                setErr(false);
                setItems((oldData) => [...oldData, index])
            }
        }
        items.sort();
    }

    const remove = (index) => {
        const data = [...items];
        data.splice(index, 1);
        setItems(data);
    }

    const [output, setOutput] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (filterValue !== '') {
            const filtered = items.filter((isi) => {
                return isi.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase());
            });  
            setOutput(filtered);
            if (filterValue.length > 1) {
                if (output.length === 0) {
                    setShowError(true);
                } else {
                    setShowError(false);
                }
            } else {
                setShowError(false);
            }
        } else {
            setOutput([]);
        }
    }, [filterValue, items, output])

    console.log(output.length)

  return (
    <div className='bg-white h-full w-full rounded-lg flex justify-center items-center flex-col'>
        <div>
            <div className='w-full'> 
                <div className='rounded-lg'>
                    <form onSubmit={handleSubmit} className="w-full">
                        <div className='flex w-full'>
                            <input 
                            className='px-3 py-2 bg-gray-100 focus:outline-none rounded-lg w-full'
                            placeholder='input'
                            value={arrays}
                            onChange={(e) => setArrays(e.target.value)}/>
                            <button className='ml-3 bg-lime-400 rounded-lg font-medium px-3'>Submit</button>
                        </div>
                        {err ? (<h4 className='text-red-400 my-3'>{textError}</h4>) : null}
                    </form>
                </div>
            </div>   
            {showBinary ? (
                <div>
                    <div className='bg-black p-3 rounded-lg my-3.5'>
                        {items > 1 && (
                            <div className='flex justify-between '>
                                <div></div>
                                <button onClick={() => setItems([])} className="bg-red-500 px-2 py-1.5 rounded-lg text-white">clear all</button>
                            </div>
                        )}
                        {items.map((item, index) => (
                            <div className='flex justify-between items-center py-2' key={index}>
                                <h2 className='text-white'><span>{index + 1}</span>. {item}</h2>
                                <button className='bg-red-500 p-2.5 text-white rounded-lg' onClick={() => remove(index)} ><BiTrash /></button>
                            </div>
                        ))}
                    </div>
                    <div className='flex items-start justify-center'>
                        {binary ? (
                            <div>
                                <div className='mt-4'>
                                    <form>
                                        <div className='flex justify-center'>
                                            <input placeholder='target' value={target} onChange={(e) => setTarget(e.target.value)} className="px-3 py-2.5 focus:outline-none mr-3 bg-gray-100 rounded-lg"/>
                                            {binary === 'Target is not found' ? (
                                                <button className="py-2.5 px-3 bg-black text-normal rounded-lg text-white w-full" onClick={binarySubmit}>Get New</button>
                                            ) : (
                                                <button className="py-2.5 px-3 bg-black text-normal rounded-lg text-white w-full" onClick={binarySubmit}>Get New Again</button>
                                            )}
                                        </div>
                                    </form>
                                    <h3 className='bg-lime-400 my-2 rounded-lg px-3.5 py-4'>{binary}</h3>
                                </div>
                            </div>
                        ) : (
                            <div className='mt-4 w-full'>
                                <form onSubmit={binarySubmit}>
                                    <input placeholder='target' value={target} onChange={(e) => setTarget(e.target.value)} className="px-3 py-2 rounded-lg mb-3 w-full focus:outline-none bg-gray-100"/>
                                    <button onClick={() => setBinary(binarySearch(items, target))} className="py-2.5 px-3 bg-lime-400 w-full rounded-lg">Search Binary</button>
                                </form>
                            </div>
                        )}
                        <div className='py-3 w-full ml-3'>
                            <form >
                                <input 
                                    className='bg-gray-100 rounded-lg w-full px-3 py-2 mb-3 mt-1 focus:outline-none'
                                    value={filterValue}
                                    onChange={(e) => setFilterValue(e.target.value)}
                                    placeholder="Search..."
                                />
                            </form>
                            {showError && (<p>Not found</p>)}
                            {output.map((filterResult, index) => (
                                <div key={index}>
                                    <p>{index + 1}. {filterResult}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    </div>
  )
}

export default Binary;  