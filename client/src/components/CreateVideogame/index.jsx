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
        genres:[],
    })

    const getData = (name, value)=>{
        console.log(name, value)
        setState({
            ...state,
            [name]: value,
        })
    }
    return(
        <div className = {style.container}>
        <ControlledForm getData = {getData}/>
        <div className = {style.cardContainer}>
            <h1 className = {style.titleOverlay}>Game Preview</h1>
        <SimpleCard name = {state.name} url = {state.backgroundImage?state.backgroundImage:imgPrev}
        genres = {state.genres}/>
        </div>
        </div>
    )
}

export default CreateVideogame;