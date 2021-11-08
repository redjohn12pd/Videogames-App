import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import style from './styles.module.css';
import { getGenres, getPlatforms, postVideogame } from '../../actions';
import MultipleSelect from '../MultipleSelect'
const ControlledForm = ({getData}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [form, setForm] = useState({
        name: '',
        description: '',
        launchDate: ' ',
        rating: 0,
        genres: [],
        platforms: [],
        backgroundImage: '',
    })
    const [error, setError] = useState({
        name: undefined,
        description: undefined,
        genres: undefined,
        platforms: undefined,
    })
    let genres = useSelector(state => state.genres);
    let platforms = useSelector(state => state.platforms);
    const getSelectedPlatforms = (platform) => {
        if (!form.platforms.includes(platform)) {
            setForm({
                ...form,
                platforms: form.platforms.concat(platform)
            })
        } else {
            setForm({
                ...form,
                platforms: form.platforms.filter(plat => plat !== platform)
            })
        }
        setError({
            ...error,
            platforms: ''
        })
    }
    const getSelectedGenres = (genre) => {
        if (!form.genres.includes(genre)) {
            setForm({
                ...form,
                genres: form.genres.concat(genre)
            })
        } else {
            setForm({
                ...form,
                genres: form.genres.filter(gen => gen !== genre)
            })
        }
        setError({
            ...error,
            genres: ''
        })
    }
    const cleanForm = () => {
        setForm({
            ...form,
            name: '',
            description: '',
            launchDate: '',
            rating: 0,
            genres: [],
            platforms: [],
            backgroundImage: '',
        })
        setError({
            ...error,
            name: undefined,
            description: undefined,
            genres: undefined,
            platforms: undefined,
        })
    }
    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if(!/^\s/.test(value)){
            if(name === 'name' || name ==='backgroundImage'){
                getData(name, value)
            }
            setForm({
                ...form,
                [name]: value
            })
            setError({
                ...error,
                [name]: value
            })
        }else{
            setError({
                ...error,
                [name]: ''
            })
        }
        
    }
    const isEmpty = ()=>{
        return error.name === '' || error.description === '' 
        || form.genres.length === 0 || form.platforms.length === 0;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!isEmpty()){
            dispatch(postVideogame(form));
            cleanForm();
            history.push('/home')
        }else{
            alert("Some fields cannot be empty!")
        }
    }
    useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlatforms());
    }, [dispatch])
    return (
        <form onSubmit={(e) => handleSubmit(e)} className={style.form}>
            <h2 className={style.title}>Create Videogame</h2>
            <div className={style.formItem}>
                <label>Name</label>
                <input onChange={(e) => handleOnChange(e)} name={'name'} value={form.name} 
                style = {{borderColor:error.name === ''?'crimson':'black'}} placeholder='Enter the name of the game' />
                {error.name === ''? <span className = {style.required}>Name is required</span>:null}
            </div>
            <div className={style.formItem}>
                <label>Description</label>
                <textarea rows="8" onChange={(e) => handleOnChange(e)} name={'description'} 
                 style = {{borderColor:error.description === ''?'crimson':'black'}} value={form.description} placeholder='Enter the description of the game' />
                {error.description === ''? <span className = {style.required}>Description is required</span>:null}
            </div>
            <div className={style.formItem}>
                <label>Launch Date</label>
                <input style={{ color: "black", width: 130 }} type="date"
                    min="1950-01-01" max="2022-12-31"
                    onChange={(e) => handleOnChange(e)} name={'launchDate'}/>
            </div>
            <div className={style.formItem}>
                <label>Rating</label>
                <input onChange={(e) => handleOnChange(e)} name={'rating'} value={form.rating}
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                />
            </div>

            <div className={style.formItem}>
                <div className={style.containerSelects}>
                    <div className={style.select}>
                        <label>Genres</label>
                        <MultipleSelect getAllSelected={getSelectedGenres} data={genres}/>
                        {error.genres === '' && !form.genres.length? <span className = {style.required}>you must select at least one genre</span>:null}
                    </div>
                    <div className={style.select}>
                        <label>Platforms</label>
                        <MultipleSelect getAllSelected={getSelectedPlatforms} data={platforms}/>
                        {error.platforms === '' && !form.platforms.length? <span className = {style.required}>you must select at least one platform</span>:null}
                    </div>
                </div>
            </div>

            <div className={style.formItem}>
                <label>Videogame Image</label>
                <input onChange={(e) => handleOnChange(e)} name={'backgroundImage'}
                    value={form.backgroundImage} placeholder = "Enter the videogame image"/>
            </div>
            <input className={style.button} type="submit" value="Create Game" />
        </form>
    );
}
export default ControlledForm;