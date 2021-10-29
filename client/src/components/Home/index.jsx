import React from 'react';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getVideogames } from '../../actions';
import style from './styles.module.css';
const Home = ()=>{
    const videogames = useSelector((state)=>state.videogames);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getVideogames('forza'));
    },[])
    return(
        <div>
            {videogames && videogames.map(videogame=>
             <h1>{videogame.name}</h1>  
                )}
        </div>
    );
}
export default Home;