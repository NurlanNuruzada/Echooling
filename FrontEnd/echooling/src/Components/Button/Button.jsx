import React from 'react';
import Styles from './button.module.css';

const Button = ({ category, isClicked, onClick }) => {
    const buttonClassName = isClicked ? Styles.Clicked : Styles.button;

    return (
        <div>
            <button className={buttonClassName} onClick={onClick}>
                {category}
            </button>
        </div>
    );
}

export default Button;
