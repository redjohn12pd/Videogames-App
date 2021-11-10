import React from 'react';
import { useHistory } from 'react-router-dom';
import style from './styles.module.css';
import ImageDecorator from '../ImageDecorator';
const LandingPage = () => {
    const history = useHistory();
    const handleOnClick = (e) => {
        history.push('/home');
    }
    return (
        <div className={style.landingPage}>
            <div className={style.overlay}>
                <div className={style.items}>
                    <ImageDecorator
                        url={'https://thumbs.gfycat.com/DevotedSilkyJavalina-max-1mb.gif'}
                        top={5}
                        right={0}
                        width={180}
                        height={180}
                    />
                    <ImageDecorator
                        url={'https://phoneky.co.uk/thumbs/screensavers/down/games/residentev_hotkawt5.gif'}
                        bottom={0}
                        left={20}
                        right={0}
                        width={180}
                        height={180}
                    />
                    <h1>¡WELCOME TO PD GAMES!</h1>
                    <div className={style.buttons}>
                        <button name={'home'} onClick={e => handleOnClick(e)}>Go home</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LandingPage;