import React, { useEffect, useState } from 'react'
import { BiTrash } from 'react-icons/bi'


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

    const datas = ['anda', 'bitch', 'kenapa'];
    // console.log(midpoint)
    const tar = 'kenapa';
    // console.log(linearSearch(datas, tar))

    const binarySubmit = (e) => {
        e.preventDefault();
        setBinary(binarySearch(items, target))
    }

    const linearSubmit = (e) => {
        e.preventDefault();
        setLinear(linearSearch(items, linearTarget));
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
    // console.log(items);

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
        const checkData = items.some(check);
        if (checkData === true) {
            setErr(true);
            setTextError('input yang lain');
        } else {
            setErr(false);
            setItems((oldData) => [...oldData, index])
        }
        items.sort();
    }

    const [historyItem, setHistoryItem] = useState([]);
    const [id, setId] = useState([]);

    const remove = (index) => {
        const data = [...items];
        data.splice(index, 1);
        setItems(data);
        // push data into history
        setId(index);
        const print = [...items];
        setHistoryItem((data) => [...data, print[index]]);
        // setHistoryItem([]);
    }

    const removePermanent = (index) => {
        const data = [...historyItem];
        data.splice(index, 1);
        setHistoryItem(data);
    }

    const restore = (index) => {
        const data = [...historyItem];
        data.splice(index, 1);
        setHistoryItem(data); 
        const print = [...historyItem];
        const oldData = [...items];
        oldData.splice(id, 0, print[index])
        setItems(oldData);   

    }

    const [output, setOutput] = useState([]);
    const [filterValue, setFilterValue] = useState('');
    const [showError, setShowError] = useState(false);

    // the variable we need to make the search filter
    const [strange, setStrange] = useState('')
    const [change, setChange] = useState([]);
    const [idx, setIdx] = useState([]);


    // useEffect to apply search filter
    useEffect(() => {
        if (strange !== '') {
            const filteredStrange = items.filter((isi) => {
                return isi.toLocaleLowerCase().includes(strange.toLocaleLowerCase());
            })
            setChange(filteredStrange);
        }
        // const position = items.toLocaleLowerCase().indexOf(strange.toLocaleLowerCase());
        // console.log(position)
        // console.log(strange);
    }, [items, strange, change])


    
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

  return (
    <div className='bg-white p-3'>
        <div className=''>
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
                        {strange.length === 0 ? (
                            (items.map((item, index) => (
                                <div className='flex justify-between items-center py-2' key={index}>
                                    <h2 className='text-white mr-2'>{index + 1}. <span className='break-all text-white'>{item}</span></h2>
                                    <button className='bg-red-500 p-2.5 text-white rounded-lg' onClick={() => remove(index)} ><BiTrash /></button>
                                </div>
                            )))
                        ) : (
                            (change.length === 0 ? (
                                <h2 className='text-red-300'>Not Found</h2>
                            ) : (
                                (items.filter((it) => {
                                    return it.toLocaleLowerCase().includes(strange.toLocaleLowerCase());
                                }).map((item, index) => {
                                    function highlightText(text, highlight) {
                                        // Split on highlight term and include term into parts, ignore case
                                        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
                                        console.log(parts);
                                        return(
                                            <div className='flex'>
                                                {parts.map((part, i) => 
                                                    <h2 key={i} className={part.toLocaleLowerCase() === highlight.toLowerCase() ? ('break-all bg-lime-400 text-black') : ('break-all text-white')}> {part} </h2>
                                                )}
                                            </div>
                                        )
                                    }
                                    return(
                                        <div className='flex justify-between items-center py-2' key={index}>
                                            <h2 className='text-white mr-2 flex'><span>{index + 1}. </span> <span className='ml-1.5'>{highlightText(item, strange)}</span></h2>
                                            <button className='bg-red-500 p-2.5 text-white rounded-lg' onClick={() => remove(index)} ><BiTrash /></button>
                                        </div>
                                    )
                                }))
                            ))
                        )}
                        </div>
                    </div>
                    <div className=''>
                        <div className='flex'>
                            <div className='binary'>
                                {binary ? (
                                    <div>
                                        <div className='w-fit'>
                                            <form >
                                                <div className=''>
                                                    <input placeholder='target' value={target} onChange={(e) => setTarget(e.target.value)} className="px-3 py-2.5 focus:outline-none mr-3 bg-gray-100 rounded-lg"/>
                                                    {binary === 'Target is not found' ? (
                                                        <button className="py-2.5 px-3 bg-black  rounded-lg text-white" onClick={binarySubmit}>Get New</button>
                                                    ) : (
                                                        <button className="py-2.5 px-3 bg-black text-sm rounded-lg text-white" onClick={binarySubmit}>Get New Again</button>
                                                    )}
                                                </div>
                                            </form>
                                            <h3 className='bg-lime-400 my-2 rounded-lg px-3.5 py-4'>{binary}</h3>
                                        </div>

                                    </div>
                                ) : (
                                    <div className=''>
                                        <form onSubmit={binarySubmit}>
                                            <input placeholder='target' value={target} onChange={(e) => setTarget(e.target.value)} className="px-3 py-2.5 focus:outline-none mr-3 bg-gray-100 rounded-lg"/>
                                            <button className="py-2.5 px-3 bg-black rounded-lg text-white">Search Binary</button>
                                        </form>
                                    </div>
                                )}
                            </div>
                            
                            <div className='linear w-fit'>
                                {linear ? (
                                    <div>
                                        <form onSubmit={linearSubmit}>
                                            <input 
                                                className='px-3 py-2.5 focus:outline-none mr-3 bg-gray-100 rounded-lg'
                                                value={linearTarget}
                                                placeholder='Search Linear...'
                                                onChange={(e) => setLinearTarget(e.target.value)}
                                            />
                                            {linear === 'Target is not found' ? (                                       
                                                <button className='py-2.5 px-3 bg-black rounded-lg text-white'>Get New</button>
                                            ) : (
                                                <button className='py-2.5 px-3 bg-black rounded-lg text-white'>Get New Again</button>
                                            )}
                                        </form>
                                        <h3 className='bg-lime-400 my-2 rounded-lg px-3.5 py-4'>{linear}</h3>
                                    </div>
                                )  :  (
                                    <div>
                                        <form onSubmit={linearSubmit}>
                                            <input 
                                                className='px-3 py-2.5 focus:outline-none mr-3 bg-gray-100 rounded-lg'
                                                value={linearTarget}
                                                placeholder='Search Linear...'
                                                onChange={(e) => setLinearTarget(e.target.value)}
                                            />
                                            <button className='py-2.5 px-3 bg-black rounded-lg text-white'>Search Linear</button>
                                        </form>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className='py-3 filter-value'>
                            <form >
                                <input 
                                    className='bg-gray-100 rounded-lg px-3 py-2 mb-3 mt-1 focus:outline-none'
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