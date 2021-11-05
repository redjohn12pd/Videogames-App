import React from 'react';
import style from './styles.module.css';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getVideogames, filterVideogames, sortVideogames} from '../../actions'
const Filter = ({genres, videogames}) => {
    const dispatch = useDispatch();
    const [showVideogames, setShowVideogames] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [sortingOrder, setSortingOrder] = useState("");
    const handleOnChange = (e)=>{
        const value = e.target.value;
        const name = e.target.name
        if(name === "genre"){
            console.log(value)
            value === 'All' ? dispatch(getVideogames()):
            dispatch(getVideogames({type:"genre", value:value}));
            setShowVideogames("showAll")
            setSortBy("")
            setSortingOrder("")
        }
        else if(name === "showVideogames"){
            dispatch(filterVideogames({name,value}))
            setShowVideogames(value)
        }
        else if(name === "sortBy"){
            dispatch(sortVideogames({name,value}))
            setSortBy(value)
            setSortingOrder("ascending")
        }
        else if(name === "sortingOrder"){
            if(sortBy === ''){
                setSortBy('rating');
                dispatch(sortVideogames({name,value,sortBy:'rating'}));
            }else{
                dispatch(sortVideogames({name,value,sortBy}));
            }
            setSortingOrder(value)
        }
    }

    return (
        <div className={style.containerFilter}>
            <div className={style.item}>
                <h3>Genre</h3>
                <div className={style.select}>
                    <select name = {"genre"} onChange = {(e)=>handleOnChange(e)}>
                        <option value ={'All'}>All Genres</option>
                        {
                            genres && genres.map((genre, i) => 
                                <option key ={i} value={genre.name}>{genre.name}</option>
                            )
                        }
                    </select>
                </div>
            </div>
            <div className={style.item}>
                <h3>Show Videogames</h3>
                <div className={style.radioButtons}>
                <div className={style.selection}>
                        <input type={"radio"} name = {"showVideogames"} value = {"showAll"}
                        checked = {showVideogames === 'showAll'?true:false} onChange = {(e)=>handleOnChange(e)} />
                        <label>All</label>
                    </div>
                    <div className={style.selection}>
                        <input type={"radio"} name = {"showVideogames"} value = {"created"}
                        checked = {showVideogames === 'created'?true:false} onChange = {(e)=>handleOnChange(e)} />
                        <label>Created</label>
                    </div>
                    <div className={style.selection}>
                        <input type="radio" name = "showVideogames" value = "existing"
                        checked = {showVideogames === 'existing'?true:false} onChange = {(e)=>handleOnChange(e)}/>
                        <label> Existing </label>
                    </div>
                </div>
            </div>
            <div className={style.item}>
                <h3>Sort By</h3>
                <div className={style.radioButtons}>
                    <div className={style.selection}>
                        <input type="radio" name = "sortBy" value = "alphabetically" 
                        checked = {sortBy === 'alphabetically'?true:false} onChange = {(e)=>handleOnChange(e)}/>
                        <label >Alphabetically</label>
                    </div>
                    <div className={style.selection}>
                        <input type="radio" name = "sortBy" value = "rating" 
                        checked = {sortBy === 'rating'?true:false} onChange = {(e)=>handleOnChange(e)}/>
                        <label > Rating </label>
                    </div>
                </div>
            </div>
            <div className={style.item}>
                <h3>Sorting Order</h3>
                <div className={style.selection}>
                        <input type="radio" name = "sortingOrder" value = "ascending" 
                        checked = {sortingOrder === 'ascending'} onChange = {(e)=>handleOnChange(e)}/>
                        <label> Ascending </label>
                    </div>
                <div className={style.radioButtons}>
                    <div className={style.selection}>
                        <input type="radio" name = "sortingOrder" value = "descending" 
                        checked = {sortingOrder === 'descending'} onChange = {(e)=>handleOnChange(e)}/>
                        <label>Descending</label>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Filter;