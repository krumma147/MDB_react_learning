import { useState, useEffect } from 'react'; //add useCallback if let fetchMovie outside
import API from '../API';
//Helpers
import { isPersistedState } from '../helpers';

export const useMovieFetch = movieId => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    // const fetchMovie = useCallback(async () =>{
    //     try {
    //         setLoading(true);
    //         setError(false);

    //         const movie = await API.fetchMovie(movieId);
    //         const credits = await API.fetchCredits(movieId);
    //         // Get director name
    //         const directors = credits.crew.filter(member=>
    //             member.job === 'Director'
    //         );

    //         setState({
    //             ...movie,
    //             actors: credits.cast,
    //             directors
    //         });

    //         setLoading(false);

    //     } catch (error) {
    //         setError(true);
    //     }
    // }, [movieId]); //wont recreated unless movieId change if let fetch movie outside of useEffect

    useEffect(() => {
        const fetchMovie = async () =>{
            try {
                setLoading(true);
                setError(false);
    
                const movie = await API.fetchMovie(movieId);
                const credits = await API.fetchCredits(movieId);
                // Get director name
                const directors = credits.crew.filter(member=>
                    member.job === 'Director'
                );
    
                setState({
                    ...movie,
                    actors: credits.cast,
                    directors
                });
    
                setLoading(false);
            } catch (error) {
                setError(true);
            }
        };

        const sessionState = isPersistedState(movieId);
        if(sessionState) {
            setState(sessionState);
            setLoading(false);
            return; //skip under function
        }

        fetchMovie(); //invoke data
    }, [movieId]); //add fetchMovie if let it outside of useEffect
 
    //Write to session
    useEffect(() => {
        sessionStorage.setItem(movieId, JSON.stringify(state));
    },[movieId, state]);
    return { state, loading, error };
};