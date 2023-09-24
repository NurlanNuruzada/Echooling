import React from 'react'
import CommentArea1 from '../../../Components/Review/CommentArea1'
import { useParams } from 'react-router'
import { Button, Center, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import CommentArea2 from './CommnetArea2';
export default function GetCourseReviews() {
    const { id } = useParams();
    return (
    <div  style={{display:"flex",justifyContent:"center",flexDirection:"column",paddingLeft:"10px"}}>
    <div style={{maxWidth:"500px"}}><CommentArea2 id={id} /></div>
    <Link to={"/ControlPanel/CourseList"}><Button>getBack</Button></Link>
    </div>
  )
}
