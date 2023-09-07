import React from 'react';
import Styles from '../../Components/TeacherCard/TeacherCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link } from 'react-router-dom';

const TeacherCard = ({ image, teacherName, Profession, socialMediaLinks, userId }) => {
    return (
        <a href={`/TeacherDetails/${userId}`}>
            <div data-aos="zoom-in" className={Styles.MainConatiner}>
                <div className={Styles.up}><img src={image} alt="" /></div>
                <div className={Styles.down}>
                    <div className={Styles.down2}>
                        <h1>{teacherName}</h1>
                        <h2>{Profession}</h2>
                    </div>
                    <div className={Styles.down3}>
                        {/* Use the full URLs for the social media links */}
                        <Link to={`http://${socialMediaLinks.facebook}`}>
                            <FontAwesomeIcon className={Styles.icon} icon={faFacebook} />
                        </Link>
                        <a href={`http://${socialMediaLinks.linkedin}`}  rel="noopener noreferrer">
                            <FontAwesomeIcon className={Styles.icon} icon={faTwitter} />
                        </a>
                        <a href={`http://${socialMediaLinks.twitter}`} rel="noopener noreferrer">
                            <FontAwesomeIcon className={Styles.icon} icon={faLinkedin} />
                        </a>
                        <a href={`http://${socialMediaLinks.instagram}`}  rel="noopener noreferrer">
                            <FontAwesomeIcon className={Styles.icon} icon={faInstagram} />
                        </a>
                    </div>
                </div>
            </div>
        </a>
    );
}

export default TeacherCard;
