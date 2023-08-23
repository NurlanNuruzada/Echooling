import React from 'react';
import Styles from '../../Components/TeacherCard/TeacherCard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
const TeacherCard = ({image,teacherName,Profession}) => {
    return (
        <div   data-aos="zoom-in" className={Styles.MainConatiner}> 
            <div className={Styles.up}><img src={image} alt="" /></div>
            <div className={Styles.down}>
                <div className={Styles.down2}>
                    <h1>{teacherName}</h1>
                    <h2>{Profession}</h2>
                </div>
                <div className={Styles.down3}>
                <FontAwesomeIcon className={Styles.icon}  icon={faFacebook} />
                <FontAwesomeIcon className={Styles.icon} icon={faTwitter} />
                <FontAwesomeIcon className={Styles.icon} icon={faLinkedin} />
                <FontAwesomeIcon className={Styles.icon} icon={faInstagram} />
                </div>
            </div>
        </div>
    );
}

export default TeacherCard;
