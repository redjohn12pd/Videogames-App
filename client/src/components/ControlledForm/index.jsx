import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from './styles.module.css';
import { getGenres, getPlatforms, postVideogame } from '../../actions';
import MultipleSelect from '../MultipleSelect'
const ControlledForm = ({getData}) => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        name: '',
        description: '',
        launchDate: '',
        rating: 0,
        genres: [],
        platforms: [],
        backgroundImage: ''
    })
    const genres = useSelector(state => state.genres);
    const platforms = useSelector(state => state.platforms);
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
            backgroundImage: ''
        })
    }
    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if(name === 'name' || name ==='backgroundImage'){
            getData(name, value)
        }
        setForm({
            ...form,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postVideogame(form));
        cleanForm();
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
                <input onChange={(e) => handleOnChange(e)} name={'name'} value={form.name} placeholder='Enter the name of the game' />
            </div>

            <div className={style.formItem}>
                <label>Description</label>
                <textarea rows="8" onChange={(e) => handleOnChange(e)} name={'description'} value={form.description} placeholder='Enter the description of the game' />
            </div>

            <div className={style.formItem}>
                <label>Launch Date</label>
                <input style={{ color: "black", width: 130 }} type="date"
                    min="1950-01-01" max="2022-12-31"
                    onChange={(e) => handleOnChange(e)} name={'launchDate'} value={form.launchDate} />
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
                        <MultipleSelect getAllSelected={getSelectedGenres} data={genres} />
                    </div>
                    <div className={style.select}>
                        <label>Platforms</label>
                        <MultipleSelect getAllSelected={getSelectedPlatforms} data={platforms} />
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