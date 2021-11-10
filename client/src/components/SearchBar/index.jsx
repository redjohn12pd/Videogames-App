import React from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {getVideogames} from '../../actions';
import style from './styles.module.css';

const SearchBar = ()=>{
    const history = useHistory();
    const [input,setInput] = useState("");
    const dispatch = useDispatch();
    const handleOnClick = (e)=>{
        e.preventDefault();
        dispatch(getVideogames({type: 'name', value:input}));
        history.push(`/videogames?search=${input}`);
    };
    const handleOnChange = (value)=>{
        setInput(value);
        if(value === ""){
            history.push(`/home`);
        }else{
            dispatch(getVideogames({type: 'name', value:value}));
            history.push(`/videogames?search=${value}`);
        }
    };
    return(
        <form onSubmit={(e)=>{handleOnClick(e)}} className = {style.search}>
            <input className = {style.input} onChange = {e=>handleOnChange(e.target.value)} value ={input} ></input>
           <button disabled = {input === ""?true:false} type ="submit" className={style.button}
           style = {{backgroundColor: input === ""? 'gray':null}}>
           Search Game
           </button>
        </form>
    )
}
export default SearchBar;