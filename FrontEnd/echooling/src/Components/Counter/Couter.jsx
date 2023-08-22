import React from 'react';
import CountUp from 'react-countup';
import Styles from '../Counter/Counter.module.css'
const Couter = ({InlineText,MaxNumber}) => {
    return (
        <div   data-aos="fade-up" className={Styles.Container}>
            <div><CountUp start={0} end={MaxNumber} duration={2.5} /></div>
            <div><h1>{InlineText}</h1></div>
        </div>
    );
}

export default Couter;
