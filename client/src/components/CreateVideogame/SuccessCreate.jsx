import React from 'react';
import {useHistory} from 'react-router-dom';
import style from './styles.module.css';
const SuccessCreate = ()=>{
    const history = useHistory();
    const handleOnClick = (e)=>{
        e.preventDefault();
        let url;
        e.target.name === 'home'? url = '/home': url = '/videogames/create'
        history.push(url);
    }
    return(
        <div className = {style.containerSuccess}>
            <div className = {style.overlay}>
            <div className = {style.items}>
            <h1>Congratulations, your video game was successfully created!</h1>
            <div className = {style.buttons}>
            <button name = {'home'} onClick = {e=>handleOnClick(e)}>Go home</button>
            <button name = {'back'} onClick = {e=>handleOnClick(e)}>Go back</button>
            </div>
            </div>
            </div>
        </div>
    )
}
export default SuccessCreate;