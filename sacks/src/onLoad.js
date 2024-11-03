import { useEffect, useState } from 'react';
import './onLoad.css';
import loadingGif from './assets/loading-gif.gif';

const useOnLoad = (duration) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        // create a timer in milliseconds
        const timer = setTimeout(() => { 
            // console.log("Loading finished");
            // console.log(duration);
            setIsLoading(false);
        }, duration);
        // clean up
        return () => clearTimeout(timer);
    }, [duration]);

    const loadDisplay = () => (
        <div className="container">
            <img src={loadingGif} alt="Loading..." className="gif" />
        </div>
    );

    return { isLoading, loadDisplay };
};
export default useOnLoad