import React from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useState} from 'react';
import {getVideogames} from '../../actions';
import style from './styles.module.css';

const SearchBar = ()=>{
   //const history = useHistory();
    const [input,setInput] = useState("");
    const [error,setError] = useState("")
    const dispatch = useDispatch();
    const handleOnClick = (e)=>{
        e.preventDefault();
       // history.push("/Animes");
        dispatch(getVideogames({type: 'name', value:input}));
        setInput("");
        setError("");
    };
    const handleOnChange = (value)=>{
        if(value === ""){
            setError("Please enter a title to continue!")
        }else{
            setError("")
        }
        setInput(value);
    };
    return(
        <form onSubmit={(e)=>{handleOnClick(e)}} className = {style.search}>
            <input className = {style.input} onChange = {e=>handleOnChange(e.target.value)} value ={input} placeholder ={error===""?"Look your favorite game...":error}></input>
           <button disabled = {input === ""?true:false} type ="submit" className={style.button}
           style = {{backgroundColor: input === ""? 'gray':null}}>
           Search Anime
           </button>
        </form>
    )
}
export default SearchBar;