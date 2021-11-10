import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './styles.module.css';
import { useParams } from 'react-router-dom';
import SimpleCard from '../SimpleCard';
import DetailCard from '../DetailCard';
import { getVideogame } from '../../actions';
import LoadingPage from '../LoadingPage';
const DetailsVideogame = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const {videogame, isEmpty} = useSelector(state => state)
    useEffect(() => {
        dispatch(getVideogame(id))
    }, [dispatch, id]);
    return (
        <div className={style.container}>
            {
                videogame.id + '' !== '' + id &&
                <div className={style.loading}>
                    <div className={style.overlay}>
                        <LoadingPage isEmpty = {!isEmpty} />
                    </div>
                </div>
            }
            <div className={style.containerDetailCard}>
                {videogame.id + '' === '' + id && <DetailCard game={videogame} />}
            </div>
            <div className={style.containerSimpleCard}>

                {videogame.id + '' === '' + id && <SimpleCard
                    name={videogame.name}
                    url={videogame.backgroundImage}
                    genres={videogame.genres}
                    limit={videogame.genres && videogame.genres.length}
                />}
            </div>
            {
                videogame.id + '' === '' + id && <div className={style.containerDescription}>
                    <h2>Game Description</h2>
                    <p className={style.description}>{videogame.description}</p>
                </div>
            }
        </div>
    );
}
export default DetailsVideogame;