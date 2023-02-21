import React, { useEffect, useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import {MdModeEditOutline} from 'react-icons/md'
import {RiHistoryLine} from 'react-icons/ri'
import { Link } from 'react-router-dom'


const Binary = ({historyItem, setHistoryItem, setId, id, items, setItems}) => {

    const [arrays, setArrays] = useState("");
    const [show, setShow] = useState(false);
    const [binary, setBinary] = useState();
    const [target, setTarget] = useState();
    
    const binarySearch = (arr, target) => {
        let first = 0;
        let last = arr.length - 1;
        while(first<=last) {
            const midpoint = Math.floor((first + last) / 2)
            console.log(midpoint)
            if (arr[midpoint] === target) {
                return "Target is found at index " + midpoint;
                // return midpoint;
                // return midpoint;    
            } else if (arr[midpoint] < target) {
                // console.log(first = midpoint + 1)
                first = midpoint + 1
                console.log('kurang')
                // setBinary(first = midpoint + 1);
            } else {
                // console.log(last = midpoint - 1);
                last = midpoint - 1
                console.log('lebih')
                // setBinary(last = midpoint - 1);
            }
        } 
        return "Target is not found";
    }

    const [linear, setLinear] = useState();
    const [linearTarget, setLinearTarget] = useState('');

    const linearSearch = (arr, target) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === target) {
                return "Target is found at index " + i;
            }
        }
        return 'Target is not found'
    }

    const binarySubmit = (e) => {
        e.preventDefault();
        setBinary(binarySearch(items.map((item) => item.value), target))
    }

    const linearSubmit = (e) => {
        e.preventDefault();
        setLinear(linearSearch(items.map((item) => item.value), linearTarget));
    }
    
    useEffect(() => {
        if (items.length === 0) {
            setShow(false)
        } else if (items.length >= 10) {
            setShow(true);
        } else if (items.length > 0) {
            setShow(true);
        } else {
            setShow(true);
        }
        // console.log(linearTarget)
    }, [items, binary, linearTarget])

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
        const check = (item) => item === index;
        const newMap = items.map((e) => e.value);
        const checkData = newMap.some(check);
        if (checkData === true) {
            setErr(true);
            setTextError('input yang lain');
        } else {
            setErr(false);
            const newValue = {
                value: index,
                id: items.length,
            }
            setItems((oldData) => [...oldData, newValue])
        }
        items.sort();
    }

    // const [historyItem, setHistoryItem] = useState([]);
    // const [id, setId] = useState([]);

    const remove = (index) => {
        const getValue = [...items]
        getValue.splice(index, 1);
        setItems(getValue);
        // console.log(items);
        // push data into history
        // console.log(data);
        setId(index);
        const print = [...items.map((e) => e.value)];
        setHistoryItem((data) => [...data, print[index]]);
        // setShow(true);
    }

    const [appearEdit, setAppearEdit] = useState(false);
    const [newItems, setNewItems] = useState({});

    const createEdit = (id, newItem) => {
        const edit = items.map((e) => {
           if (e.id ===  id) {
                return newItem;
           } else {
                return e;
           }
        })
        setAppearEdit(false);
        setItems(edit);
    }

    const submitForm = (e) => {
        e.preventDefault();
        createEdit(newItems.id, newItems)
    }

    const disappear = () => {
        setAppearEdit(false);
    }
    
    const setEditForm = (item) => {
        setAppearEdit(true)
        setNewItems({ ...item })
        // console.log(newItems)
    }

    const [output, setOutput] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [showError, setShowError] = useState(false);
    
    useEffect(() => {
        if (filterValue !== '') {
            // const getValue = 
            const filtered = items.map((item) => item.value).filter((isi) => {
                return isi.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase());
            });  
            // console.log(filtered);
            setOutput(filtered);
            // console.log(output)
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

    const [strange, setStrange] = useState('')
    const [filterOutput, setFilteredOutput] = useState([]);

    useEffect(() => {
        if (strange !== '') {
            const filteredValue = items.map((e) => e.value).filter((filterItem) => {
                return filterItem.toLowerCase().includes(strange.toLowerCase());
            })
            setFilteredOutput(filteredValue)
        }
    }, [strange, items]);

    return (
    <div className='bg-white p-3'>
        <div className='float-right absolute right-0'>
            <Link to='/historybinary' className="bg-black text-white px-3 py-2 rounded-lg flex items-center justify-between mr-3"><RiHistoryLine className="mr-2" /> History</Link>
        </div>
        <div className='max-w-screen-sm md:max-w-full mt-14'>
            <div className='main-item'>
                <div className='md:flex md:justify-between'>
                    <div className='md:w-7/12'>
                        <div className='w-full'>
                            <form onSubmit={handleSubmit} className="">
                                <div className='flex'>
                                    <input 
                                    className='px-3 py-2.5 bg-gray-100 focus:outline-none rounded-lg w-full'
                                    placeholder='input'
                                    value={arrays}
                                    onChange={(e) => setArrays(e.target.value)}/>
                                    <button className='ml-3 bg-lime-400 rounded-lg font-medium px-3'>Add</button>
                                </div>
                                {err ? (<h4 className='text-red-400 my-3'>{textError}</h4>) : null}
                            </form>
                        </div>
                        {show ? (
                            <div className='w-full'>
                                <form className="my-2">
                                    <div className='flex'>
                                        <input 
                                        className='px-3 py-2.5 bg-gray-100 focus:outline-none rounded-lg w-full'
                                        placeholder='Search...'
                                        value={strange}
                                        onChange={(e) => setStrange(e.target.value)}/>
                                    </div>
                                </form>
                                <div className='bg-black p-3 rounded-lg my-3.5 break-words w-full'>
                                    {items.length > 1 && (
                                        <div className='flex justify-between w-full'>
                                            <div></div>
                                            <button onClick={() => setItems([])} className="bg-red-500 px-2 py-1.5 rounded-lg text-white">clear all</button>
                                        </div>
                                    )}
                                    <div>
                                    {strange === '' ? (
                                        (appearEdit ? (
                                            <div>
                                                <form onSubmit={submitForm}>
                                                    <div className='flex'>
                                                        <input 
                                                            value={newItems.value}
                                                            placeholder='rename'
                                                            className='px-3 py-2.5 bg-gray-100 focus:outline-none rounded-lg w-full'
                                                            onChange={(e) => setNewItems({...newItems, value: e.target.value})}
                                                        />
                                                        <div className='flex ml-3'>
                                                            <button className='bg-lime-400 rounded-lg font-medium px-3'>Change</button>
                                                            <button onClick={disappear} className='text-white bg-red-500 rounded-lg font-medium px-3 ml-3'>Cancel</button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        ) : (
                                            (items.map((item, index) => {
                                                return(
                                                    <div className='w-full'>
                                                        <div className='flex justify-between items-center py-2 w-full' key={index}>
                                                            <h2 className='text-white mr-2'>{index + 1}. <span className='break-all text-white'>{item.value}</span></h2>
                                                            <div className='flex'>
                                                                <button className='bg-blue-500 p-2.5 text-white rounded-lg' onClick={() => setEditForm(item)}><MdModeEditOutline /></button>
                                                                <button className='bg-red-500 p-2.5 text-white rounded-lg ml-2' onClick={() => remove(index)} ><BiTrash /></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }))
                                        ))
                                    ) : (
                                        (filterOutput.length === 0 ? (
                                            <h2 className='text-red-300'>not found</h2>
                                        ) : (
                                            (appearEdit ? (
                                                <div>
                                                    <form onSubmit={submitForm}>
                                                        <input 
                                                            className='px-3 py-2.5 bg-gray-100 focus:outline-none rounded-lg w-full'
                                                            value={newItems.value}
                                                            placeholder='rename'
                                                            
                                                            onChange={(e) => setNewItems({...newItems, value: e.target.value})}
                                                        />
                                                        <button className='text-white'>Submit</button>
                                                        <button onClick={disappear} className='text-white'>ilang</button>
                                                    </form>
                                                </div>
                                            ) : (
                                                (filterOutput.map((item, index) => {
                                                    function highlightText(text, highlight) {
                                                        // Split on highlight term and include term into parts, ignore case
                                                        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
                                                        return(
                                                            <div className='flex'>
                                                                {parts.map((part, i) => (
                                                                    <h2 key={i} className={part.toLocaleLowerCase() === highlight.toLowerCase() ? ('break-all bg-lime-400 text-black') : ('break-all text-white')}> {part} </h2>
                                                                ))}
                                                            </div>
                                                        )
                                                    }
                                                    return(
                                                        <div className=''>
                                                            <h1 className='text-white'>Result: </h1>
                                                            <div className='flex justify-between items-center py-2' key={index}>
                                                                <h2 className='text-white mr-2 flex'><span>{index + 1}. </span> <span className='ml-1.5'></span>{highlightText(item, strange)}</h2>
                                                            </div>
                                                        </div>
                                                    )
                                                }))
                                            )) 
                                        ))
                                    )}
                                    </div>
                                </div>                        
                            </div>
                        ) : null}
                        
                            
                    </div>

                    <div className='md:w-5/12 md:ml-4'>
                        {show ? (
                            <div className='w-full'>
                                <div className='binary'>
                                    {binary ? (
                                        <div>
                                            <form>
                                                <div className='w-full md:flex items-center'>
                                                    <input placeholder='Search Binary' value={target} onChange={(e) => setTarget(e.target.value)} className="px-3 py-2.5 focus:outline-none mr-3 bg-gray-100 rounded-lg w-full"/>
                                                    <div className='md:w-4/12'>
                                                        {binary === 'Target is not found' ? (
                                                            <button className="py-2.5 px-3 bg-black  rounded-lg text-white" onClick={binarySubmit}>Get New</button>
                                                        ) : (
                                                            <button className="py-2.5 px-3 bg-black  rounded-lg text-white   " onClick={binarySubmit}>Get New Again</button>
                                                        )}
                                                    </div>
                                                </div>
                                            </form>
                                            <h3 className='bg-lime-400 my-2 rounded-lg px-3.5 py-4'>{binary}</h3>
                                        </div>
                                    ) : (
                                        <div className='w-full'>
                                            <form onSubmit={binarySubmit}>
                                                <div className='md:flex items-center'>
                                                    <input placeholder='Search Binary' value={target} onChange={(e) => setTarget(e.target.value)} className="px-3 py-2.5 focus:outline-none mr-3 bg-gray-100 rounded-lg w-full"/>
                                                    <button className="py-2.5 px-3 bg-black rounded-lg text-white md:w-4/12 ">Search Binary</button>
                                                </div>
                                            </form>
                                        </div>
                                    )}
                                </div>
                                
                                <div className='linear'>
                                    {linear ? (
                                        <div className='w-full'>
                                            <form onSubmit={linearSubmit}>
                                                <div className='md:flex w-full items-center'>
                                                    <input 
                                                        className='px-3 py-2.5 focus:outline-none mr-3 bg-gray-100 rounded-lg w-full'
                                                        value={linearTarget}
                                                        placeholder='Search Linear...'
                                                        onChange={(e) => setLinearTarget(e.target.value)}
                                                    />
                                                    <div className='md:my-2 w-4/12'>
                                                        {linear === 'Target is not found' ? (                                       
                                                            <button className='py-2.5 px-3 bg-black rounded-lg text-white'>Get New</button>
                                                        ) : (
                                                            <button className='py-2.5 px-3 bg-black rounded-lg text-white'>Get New Again</button>
                                                        )}
                                                    </div>
                                                </div>
                                            </form>
                                            <h3 className='bg-lime-400 my-2 rounded-lg px-3.5 py-4'>{linear}</h3>
                                        </div>
                                    )  :  (
                                        <div className='w-full'>
                                            <form onSubmit={linearSubmit}>
                                                <div className='md:flex items-center'>
                                                    <input 
                                                    className='px-3 py-2.5 focus:outline-none mr-3 bg-gray-100 rounded-lg w-full'
                                                    value={linearTarget}
                                                    placeholder='Search Linear...'
                                                    onChange={(e) => setLinearTarget(e.target.value)}
                                                    />
                                                    <button className='py-2.5 px-3 bg-black rounded-lg text-white md:w-4/12 md:my-2'>Search Linear</button>
                                                </div>
                                            </form>
                                        </div>
                                    )}
                                </div>

                                <div className='py-3 filter-value'>
                                    <form >
                                        <input 
                                            className='bg-gray-100 rounded-lg px-3 py-2 mb-3 mt-1 focus:outline-none w-full'
                                            value={filterValue}
                                            onChange={(e) => setFilterValue(e.target.value)}
                                            placeholder="Search..."
                                        />
                                    </form>
                                    <div className='flex justify-center items-center w-fit'>
                                        {showError ? (<p className='text-red-500 font-medium px-3.5 py-4'>Not found</p>) : null}
                                    </div>
                                    {output.map((filterResult, index) => (
                                        <div key={index}>
                                            <p>{index + 1}. {filterResult}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (null)}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Binary;  