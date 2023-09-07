import React from 'react';
import CountUp from 'react-countup';
import Styles from '../Counter/Counter.module.css';

const Couter = ({ InlineText, MaxNumber }) => {
  return (
    <div data-aos="fade-up" className={Styles.Container}>
      <div className={Styles.counter}><CountUp start={0} end={MaxNumber} duration={3} delay={2} /></div>
      <div  className={Styles.text} ><h1>{InlineText}</h1></div>
    </div>
  );
}

export default Couter;
