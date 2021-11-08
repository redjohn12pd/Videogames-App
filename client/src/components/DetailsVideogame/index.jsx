import React from 'react';
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import style from './styles.module.css';
import {useParams} from 'react-router-dom';
import SimpleCard from '../SimpleCard';
import DetailCard from '../DetailCard';
import {getVideogame} from '../../actions';
const DetailsVideogame = ()=>{
    const dispatch = useDispatch();
    const {id} = useParams();
    const videogame = useSelector(state=>state.videogame)
    useEffect(()=>{
        dispatch(getVideogame(id))
    },[dispatch,id]);
    return(
        <div className = {style.container}>
                <div className = {style.containerDetailCard}>
              { videogame && <DetailCard game = {videogame}/>}
               </div>
               <div className = {style.containerSimpleCard}>
                
              { videogame && <SimpleCard 
                name = {videogame.name}
                url = {videogame.backgroundImage}
                genres = {videogame.genres}
                limit = {videogame.genres&&videogame.genres.length}
                />}
                </div>
                <div className = {style.containerDescription}>
                    <h2>Game Description</h2>
                <p className = {style.description}>{videogame.description}</p>
                </div>
        </div>
    );
}
export default DetailsVideogame;