import React from 'react';
import { useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import style from './styles.module.css';
import {getGenres, getPlatforms} from '../../actions';
import MultipleSelect from '../MultipleSelect'
const ControlledForm = ()=>{
    const dispatch = useDispatch();
    const genres = useSelector(state=>state.genres);
    const platforms = useSelector(state=>state.platforms);
    const generateRating = (n)=>{
        const array = [];
        for (let i = 0; i <= n; i++) {
            array.push(i);
        }
        return array;
    }

    useEffect(()=>{
        dispatch(getGenres());
        dispatch(getPlatforms());
    },[dispatch])
    return(
        <form className = {style.form}>
            <h2 className = {style.title}>Create Videogame</h2>
            <div className = {style.formItem}>
            <label>Name</label>
            <input placeholder = 'Enter the name of the game'/>
            </div>

            <div className = {style.formItem}>
            <label>Description</label>
            <textarea rows = "8" placeholder = 'Enter the description of the game'/>
            </div>

            <div className = {style.formItem}>
            <label>Launch Date</label>
            <input style={{color:"black", width: 130}} type="date" id="start" name="trip-start"
       min="1950-01-01" max="2022-12-31"/>
            </div>

            <div className = {style.formItem}>
            <label>Rating</label>
            <select>
                {
                generateRating(10).map(rating=>
                    <option value = {rating}>{rating}</option>
                    )
                }
            </select>
            </div>

            <div className = {style.formItem}>
                <div className={style.containerSelects}>
                <div className = {style.select}>
                    <label>Genres</label>
                    <MultipleSelect data = {genres}/>
                </div>
                <div className = {style.select}>
                    <label>Platforms</label>
                    <MultipleSelect data = {platforms}/>
                </div>
                </div>
            </div>

            <div className = {style.formItem}>
            <label>Videogame Image</label>
            <input type = "file"/>
            </div>
        </form>
    );
}
export default ControlledForm;