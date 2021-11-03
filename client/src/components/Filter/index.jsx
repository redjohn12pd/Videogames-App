import React from 'react';
import style from './styles.module.css';
import { useEffect, useState} from 'react';
const Filter = ({genres}) => {
    const handleOnChange = (e)=>{
        e.preventDefault();
        if(e.target.name === "genre"){
            console.log(e.target.value)
        }
        else if(e.target.name === "showVideogames"){
            console.log(e.target.value)
        }
        else if(e.target.name === "sortBy"){
            console.log(e.target.value)
        }
        else{
            console.log(e.target.value)
        }
    }
    return (
        <div className={style.containerFilter}>
            <div className={style.item}>
                <h3>Genre</h3>
                <div className={style.select}>
                    <select name = {"genre"} onChange = {(e)=>handleOnChange(e)}>
                        <option>All Genres</option>
                        {
                            genres && genres.map(genre => 
                                <option value={genre.name}>{genre.name}</option>
                            )
                        }
                    </select>
                </div>
            </div>
            <div className={style.item}>
                <h3>Show Videogames</h3>
                <div className={style.radioButtons}>
                    <div className={style.selection}>
                        <input type={"radio"} name = {"showVideogames"} value = {"created"} onChange = {(e)=>handleOnChange(e)} />
                        <label>Created</label>
                    </div>
                    <div className={style.selection}>
                        <input type="radio" name = "showVideogames" value = "existing" onChange = {(e)=>handleOnChange(e)}/>
                        <label> Existing </label>
                    </div>
                </div>
            </div>
            <div className={style.item}>
                <h3>Sort By</h3>
                <div className={style.radioButtons}>
                    <div className={style.selection}>
                        <input type="radio" name = "sortBy" value = "alphabetically" onChange = {(e)=>handleOnChange(e)}/>
                        <label >Alphabetically</label>
                    </div>
                    <div className={style.selection}>
                        <input type="radio" name = "sortBy" value = "rating" onChange = {(e)=>handleOnChange(e)}/>
                        <label > Rating </label>
                    </div>
                </div>
            </div>
            <div className={style.item}>
                <h3>Sorting Order</h3>
                <div className={style.radioButtons}>
                    <div className={style.selection}>
                        <input type="radio" name = "sortingOrder" value = "descending" onChange = {(e)=>handleOnChange(e)}/>
                        <label>Descending</label>
                    </div>
                    <div className={style.selection}>
                        <input type="radio" name = "sortingOrder" value = "ascending" onChange = {(e)=>handleOnChange(e)}/>
                        <label> Ascending </label>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Filter;