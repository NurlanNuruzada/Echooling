import React from 'react';
import Styles from './CourseAre.module.css'
import CourseCard from '../CourseCard/CourseCard';
import image from '../../Images/Course1.jpg'
import image1 from '../../Images/Teacher1.png'
import image2 from '../../Images/Teacher2.png'
import image3 from '../../Images/teacher3.png'
const CourseArea = () => {
    const courseTitle ="C# .NET Core 7 with MS SQL Complete Beginner to Master 2023"
    const Price = "$60.99"
    return (
        <div  className={Styles.MainContainer}>
            < CourseCard CreatorImage={image} price={Price} title={courseTitle} image={image}/> 
        </div> 
    );
}

export default CourseArea;
