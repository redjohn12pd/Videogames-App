import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import style from './styles.module.css';
import { getGenres, getPlatforms, postVideogame } from '../../actions';
import MultipleSelect from '../MultipleSelect'
const ControlledForm = ({ getData }) => {
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
        name: '',
        description: '',
        genres: undefined,
        platforms: undefined,
        backgroundImage: '',
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
    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'name' || name === 'backgroundImage') {
            getData(name, value)
        }
        else if (value.length > 0 && value.length < 600) {
            setError({
                ...error,
                [name]: ''
            })
        } else {
            let textError;
            if (name === 'backgroundImage') textError = value.length === 0?'':'enter up to 600 characters';
            if (name === 'name') textError = 'Name is required';
            if (name === 'description') textError = value.length>600?'enter up to 600 characters':'Description is required';
            setError({
                ...error,
                [name]: textError,
            })
        }
        setForm({
            ...form,
            [name]: value
        })
    }
    const isValidate = () => {
        return error.name === '' && error.description === '' && error.backgroundImage === ''
            && form.genres.length > 0 && form.platforms.length > 0;
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isValidate()) {
            dispatch(postVideogame(form))
            history.push('/videogames/create/success')
        } else {
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
                    style={{ borderColor: error.name === 'Name is required' ? 'crimson' : 'black' }} placeholder='Enter the name of the game' />
                {error.name === 'Name is required' ? <span className={style.required}>{error.name}</span> : null}
            </div>
            <div className={style.formItem}>
                <label>Description</label>
                <textarea rows="8" onChange={(e) => handleOnChange(e)} name={'description'}
                    style={{ borderColor: error.description&&error.description.length>0 ? 'crimson' : 'black' }} value={form.description} placeholder='Enter the description of the game' />
                {error.description&&error.description.length>0? <span className={style.required}>{error.description}</span> : null}
            </div>
            <div className={style.formItem}>
                <label>Launch Date</label>
                <input style={{ color: "black", width: 130 }} type="date"
                    min="1950-01-01" max="2022-12-31"
                    onChange={(e) => handleOnChange(e)} name={'launchDate'} />
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
                        {error.genres === '' && !form.genres.length ? <span className={style.required}>you must select at least one genre</span> : null}
                    </div>
                    <div className={style.select}>
                        <label>Platforms</label>
                        <MultipleSelect getAllSelected={getSelectedPlatforms} data={platforms} />
                        {error.platforms === '' && !form.platforms.length ? <span className={style.required}>you must select at least one platform</span> : null}
                    </div>
                </div>
            </div>

            <div className={style.formItem}>
                <label>Videogame Image</label>
                <textarea rows="4" onChange={(e) => handleOnChange(e)} name={'backgroundImage'}
                    style={{ borderColor: error.backgroundImage === 'Enter up to 600 characters' ? 'crimson' : 'black' }} value={form.backgroundImage} placeholder="Enter the videogame image" />
                {error.backgroundImage === 'enter up to 600 characters' ? <span className={style.required}>{error.backgroundImage}</span> : null}
            </div>
            <input className={style.button} type="submit" value="Create Game" />
        </form>
    );
}
export default ControlledForm;