import React from 'react';
import Styles from "./SocialMediaStyles.module.css"
import { Link } from 'react-router-dom';
const SocialMediaLinks = ({ Icon ,to}) => {
    return (
        <div   className={Styles.mainDiv} >
           <Link to={to}>
        {Icon}
    </Link>
        </div>
    );
}

export default SocialMediaLinks;
