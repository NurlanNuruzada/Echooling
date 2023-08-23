import React from 'react';
import Styles from '../Atendee/Atende.module.css'
import image from '../../Images/teacher/teacher1.jpg'
const Atendee = ({image,title,Profesion}) => {
    return (
        <div className={Styles.MainConatiner}>
            <div className={Styles.ImageContainer}>
                <img className={Styles.Image}  src={image} alt="" />
            </div>
            <h1 className={Styles.title}>{title}</h1>
            <h2 className={Styles.Profesion}>{Profesion}</h2>
        </div>
    );
}

export default Atendee;
