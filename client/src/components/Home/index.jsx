import React from 'react';
import { useEffect, useState } from 'react';
import {useDispatch , useSelector} from 'react-redux';
import { getVideogames, getGenres} from '../../actions';
import SideBar from '../SideBar';
import Pagination from '../Pagination';
import DinamicBanner from '../DinamicBanner';
import Filter from '../Filter';
import style from './styles.module.css';
const Home = () => {
    const genres = useSelector(state=>state.genres);
    const videogames = useSelector(state=>state.videogames);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGenres());
        dispatch(getVideogames({type: "name", value: "Naruto"}));
    }, [dispatch])
    return (
        <div className={style.container}>
                <SideBar title = {"Filter By"} width={300} height={"100vh"}>
                <Filter genres = {genres} videogames = { videogames }/>
                </SideBar>
                <div className = {style.row}>
                {videogames.length>0&&<DinamicBanner data = {videogames}/>}
                {videogames.length>0&&<Pagination title = {"Games"} data = {videogames}/>}
                </div>
                
        </div>
    );
}
export default Home;