import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres } from '../../actions';
import SideBar from '../SideBar';
import Pagination from '../Pagination';
import LoadingPage from '../LoadingPage';
import Filter from '../Filter';
import style from './styles.module.css';
const VideogamesResult = () => {
    const genres = useSelector(state => state.genres);
    const { videogames, isEmpty } = useSelector(state => state);
    const dispatch = useDispatch();
    useEffect(() => {

        dispatch(getGenres());
    }, [dispatch])
    return (
        <div className={style.container}>
            <SideBar title={"Filter By"} width={300} height={"100vh"}>
                <Filter genres={genres} videogames={videogames} />
            </SideBar>
            {
                !isEmpty ? videogames.length === 0 ?
                    <div className={style.loading}>
                        <div className={style.overlay}>
                            <LoadingPage />
                        </div>
                    </div>
                    : null
                    :
                    <div className={style.notFound}>
                    <h1>Sorry, there is no match to the title entered...</h1>
                    </div>
            }
            <div className={style.row}>
                {videogames.length > 0 && <Pagination title={"Games"} data={videogames} />}
            </div>
        </div>
    );
}
export default VideogamesResult;