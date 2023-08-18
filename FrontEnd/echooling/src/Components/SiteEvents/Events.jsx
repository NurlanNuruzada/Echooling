 import React from 'react';

 import Styles from './events.module.css'
import EventCard from '../EventCard/EventCard';
 const Events = () => {
    return (
        <div className={Styles.mainContainer}>
             <EventCard/>
        </div>
    );
 }
 
 export default Events;
 