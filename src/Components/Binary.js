import React, { useEffect, useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import {MdModeEditOutline} from 'react-icons/md'


const Binary = () => {

    const [arrays, setArrays] = useState("");
    const [items, setItems] = useState([]);
    const [show, setShow] = useState(false);
    const [binary, setBinary] = useState();
    const [target, setTarget] = useState();
    const [bg, setBg] = useState(false);
    
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
        // 0 + 
        // console.log("not found")
        // setBinary("not found")
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
            setBg(false);
        } else if (items.length >= 10) {
            setShow(true);
            setBg(true);
        } else if (items.length > 0) {
            setShow(true);
            setBg(false);
        } else {
            setShow(true);
            setBg(true);
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

    const [historyItem, setHistoryItem] = useState([]);
    const [id, setId] = useState([]);

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
    }

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

    console.log(output);
    // the variable we need to make the search filter
    const [strange, setStrange] = useState('')
    const [filterOutput, setFilteredOutput] = useState([]);

    useEffect(() => {
        if (strange !== '') {
            const filteredValue = items.map((e) => e.value).filter((filterItem) => {
                return filterItem.toLowerCase().includes(strange.toLowerCase());
            })
            setFilteredOutput(filteredValue)
        }
    }, [strange, items])

    // console.log(filterValue)
    // console.log(filterOutput.map((e, idx) => idx))
    
    // const [editValue, setEditValue] = useState('');
    const [appearEdit, setAppearEdit] = useState(false);
    // const [modal, setModal] = useState(false);
    const [newItems, setNewItems] = useState({});
    // const [getid, setgetid] = useState()
    // const [generateId, setGenerateId] = useState([]);

    // console.log(strange);
    // useEffect(() => {
    //     setNewItems({
    //         ...newItems,
    //     })
    //     console.log(newItems)
    //     // console.log(newItems)
    // }, [newItems, editValue])

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

    // console.log(change);
    // console.log(strange)

    return (
    <div className='bg-white p-3'>
        <div className='max-w-screen-sm'>
            <div className='max-w-screen-sm mt-16'>
                <form onSubmit={handleSubmit} className="">
                    <div className='flex'>
                        <input 
                        className='px-3 py-2 bg-gray-100 focus:outline-none rounded-lg w-full'
                        placeholder='input'
                        value={arrays}
                        onChange={(e) => setArrays(e.target.value)}/>
                        <button className='ml-3 bg-lime-400 rounded-lg font-medium px-3'>Add</button>
                    </div>
                    {err ? (<h4 className='text-red-400 my-3'>{textError}</h4>) : null}
                </form>
                <form className="my-3">
                    <div className='flex'>
                        <input 
                        className='px-3 py-2 bg-gray-100 focus:outline-none rounded-lg w-full'
                        placeholder='Search Filter...'
                        value={strange}
                        onChange={(e) => setStrange(e.target.value)}/>
                    </div>
                </form>
            </div>
            {show ? (
                <div>
                    <div className='bg-black p-3 rounded-lg my-3.5 max-w-screen-sm break-words'>
                        {items.length > 1 && (
                            <div className='flex justify-between '>
                                <div></div>
                                <button onClick={() => setItems([])} className="bg-red-500 px-2 py-1.5 rounded-lg text-white">clear all</button>
                            </div>
                        )}
                        <div>
                        {strange === '' ? (
                            (appearEdit ? (
                                <div>
                                    <form onSubmit={submitForm}>
                                        <input 
                                            value={newItems.value}
                                            placeholder='rename'
                                            onChange={(e) => setNewItems({...newItems, value: e.target.value})}
                                        />
                                        <button className='text-white'>Submit</button>
                                    </form>
                                    <button onClick={disappear} className='text-white'>ilang</button>
                                </div>
                            ) : (
                                (items.map((item, index) => {
                                    return(
                                        <div>
                                            <div>
                                                <div className='flex justify-between items-center py-2' key={index}>
                                                    <h2 className='text-white mr-2'>{index + 1}. <span className='break-all text-white'>{item.value}</span></h2>
                                                    <div>
                                                        <button className='bg-blue-500 p-2.5 text-white rounded-lg' onClick={() => setEditForm(item)}><MdModeEditOutline /></button>
                                                        <button className='bg-red-500 p-2.5 text-white rounded-lg' onClick={() => remove(index)} ><BiTrash /></button>
                                                    </div>
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
    
                                    if (item) {
                                        console.log(item)
                                    }
    
                                    // console.log(highlightText(item, strange))
                                    // console.log(item.length);
                                    return(
                                        <div className='flex justify-between items-center py-2' key={index}>
                                            <h2 className='text-white mr-2 flex'><span>{index + 1}. </span> <span className='ml-1.5'></span>{highlightText(item, strange)}</h2>
                                            <button className='bg-red-500 p-2.5 text-white rounded-lg' onClick={() => remove(index)} ><BiTrash /></button>
                                        </div>
                                    )
                                }))
                            ))
                        )}
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='w-full'>
                            <div className='binary my-4'>
                                {binary ? (
                                    <div>
                                        <form className='w-full'>
                                            <div className='w-full md:flex items-center'>
                                                <input placeholder='Search Binary' value={target} onChange={(e) => setTarget(e.target.value)} className="px-3 py-2.5 focus:outline-none mr-3 bg-gray-100 rounded-lg w-full"/>
                                                {binary === 'Target is not found' ? (
                                                    <button className="py-2.5 px-3 bg-black  rounded-lg text-white w-1/5" onClick={binarySubmit}>Get New</button>
                                                ) : (
                                                    <button className="py-2.5 px-3 bg-black text-sm rounded-lg text-white w-1/5" onClick={binarySubmit}>Get New Again</button>
                                                )}
                                            </div>
                                        </form>
                                        <h3 className='bg-lime-400 my-2 rounded-lg px-3.5 py-4'>{binary}</h3>
                                    </div>
                                ) : (
                                    <div className='w-full'>
                                        <form onSubmit={binarySubmit}>
                                            <div className='md:flex items-center'>
                                                <input placeholder='Search Binary' value={target} onChange={(e) => setTarget(e.target.value)} className="px-3 py-2.5 focus:outline-none mr-3 bg-gray-100 rounded-lg w-full"/>
                                                <button className="py-2.5 px-3 bg-black rounded-lg text-white md:w-3/12">Search Binary</button>
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
                                                {linear === 'Target is not found' ? (                                       
                                                    <button className='py-2.5 px-3 bg-black rounded-lg text-white w-1/5'>Get New</button>
                                                ) : (
                                                    <button className='py-2.5 px-3 bg-black rounded-lg text-white w-1/5'>Get New Again</button>
                                                )}
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
                                                <button className='py-2.5 px-3 bg-black rounded-lg text-white md:w-3/12'>Search Linear</button>
                                            </div>
                                        </form>
                                    </div>
                                )}
                            </div>
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
                </div>
            ) : null}
            <div>
                <h2>{historyItem.map((hello, index) => (
                    <div className='flex justify-between' key={index}>
                        <h3>{index + 1}. <span>{hello}</span></h3>
                        <div>
                            <button onClick={() => removePermanent(index)}>Remove</button>
                            <button onClick={() => restore(index)}>Restore</button>
                        </div>
                    </div>
                ))}</h2>
            </div>
        </div>
    </div>
  )
}

export default Binary;  