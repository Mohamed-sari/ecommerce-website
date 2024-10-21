import React, { useEffect, useState } from 'react';
import './index.css';

const Test = () => {
    const [count, setCount] = useState(0);
    const [time, setTime] = useState(null);

    // Effect to log when count changes
    useEffect(() => {
        console.log("tick");
    }, [count]);
 

    // Effect to set up interval for time updates
    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleString());
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    // Handle increment count
    const handleCount = () => {
        setCount(prevState => prevState + 1);
    };

    // Handle reset count
    const handleReset = () => {
        setCount(0);
    };

    return (
        <>
            <span>{count}</span>
            <button
                onClick={handleCount}
                className='bg-blue'
            >
                Click to increment!!
            </button>
            <button onClick={handleReset}>
                Reset!!
            </button>
            <span>{time}</span>
        </>
    );
};

export default Test;
