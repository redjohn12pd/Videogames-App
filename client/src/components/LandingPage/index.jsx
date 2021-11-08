import React from 'react';
import {useHistory} from 'react-router-dom';
import style from './styles.module.css';
const LandingPage = ()=>{
    const history = useHistory();
    const handleOnClick = (e)=>{
        history.push('/home');
    }
    return(
        <div className = {style.landingPage}>
            <div className = {style.overlay}>
            <div className = {style.items}>
            <h1>¡WELCOME TO PD GAMES!</h1>
            <div className = {style.buttons}>
            <button name = {'home'} onClick = {e=>handleOnClick(e)}>Go home</button>
            </div>
            </div>
            </div>
        </div>
    )
}
export default LandingPage;