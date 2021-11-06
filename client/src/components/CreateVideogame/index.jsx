import React from 'react';
import {useState } from 'react';
import style from './styles.module.css';
import ControlledForm from '../ControlledForm';
import SimpleCard from '../SimpleCard';
const CreateVideogame = ()=>{
    const imgPrev = 'https://i.pcmag.com/imagery/roundups/38133..1594409362.jpg'
    const [state, setState] = useState({
        name: '',
        backgroundImage: '',
    })

    const getData = (name, value)=>{
        setState({
            ...state,
            [name]: value,
        })
    }
    return(
        <div className = {style.container}>
        <ControlledForm getData = {getData}/>
        <div className = {style.cardContainer}>
            <h2 style = {{"margin-bottom":25}}>Game Preview</h2>
        <SimpleCard name = {state.name} url = {state.backgroundImage?state.backgroundImage:imgPrev}/>
        </div>
        </div>
    )
}

export default CreateVideogame;