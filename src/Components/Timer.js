import React, {useState, useEffect} from 'react'

const Timer = () => {
    const [start, setStart] = useState(false);
    const [hours, setHours] = useState(0);
    const [mins, setMins] = useState(0);
    const [secs, setSecs] = useState(0);
    
    const [time, setTime] = useState(0);
    useEffect(() => {
        // let mininterval = null;
        let timeinterval = null;
        if (start) {
            timeinterval = setInterval(() => {
                setTime((time) => time + 1);
            }, 1000);
        } else {
            clearInterval(timeinterval);
            // clearInterval(mininterval);
        }
        
        setSecs(Math.floor(time % 60))
        setMins(Math.floor(time / 60) % 60)
        setHours(Math.floor(time / 3600))


        
        return () => clearInterval(timeinterval);
    }, [start, time]);

    const centerElement = {
        left: "50%",
        transform: "translate(-50%, -20%)",
    }
  return (
    <div className='top-1/2 h-screen absolute overflow-hidden	' style={centerElement}>
        <div className='block p-6 rounded-xl bg-lime-400 max-w-md'>
            <div className="numbers bg-white flex justify-center">
                <p className='flex'><span>{hours > 9 ? (<h2>{hours}</h2>): (
                    (<h2>{`0${hours} `} </h2>) 
                    )
                }</span>
                <span className='mx-1'> : </span>
                <span>{mins > 9 ? (
                    <h2>{mins}</h2>
                    ) : (
                    <h2> {` 0${mins}`} </h2>
                )}</span>
                <span className='mx-1'> : </span>
                <span>{secs < 9 ? (<h2> {` 0${secs} `} </h2>) : (
                    <h2> {secs} </h2>
                )}</span></p>
            </div>
            <div className='flex justify-center items-center'>
                <button onClick={() => setStart(true)}>Start</button>
                <button onClick={() => setStart(false)} className="mx-3">Stop</button>
                <button onClick={() => {setStart(false); setSecs(0); setMins(0); setHours(0)}}>Reset</button>
            </div>
        </div>
    </div>
  )
}

export default Timer