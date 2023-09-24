import React, { useEffect, useState } from 'react';
import Styles from '../../../Components/Review/CommentArea.module.css';
import { useQuery, useQueryClient } from 'react-query'; // Import useQuery and useQueryClient
import { getallCommentOfCourse, AddCommnent } from '../../../Services/CommentService'; // Import AddCommnent
import CourseReviewAdminPanel from './CourseReview';


export default function CommentArea2({ id }) {
  const [CourseId, setCourseId] = useState(id);

  const queryClient = useQueryClient(); // Get the query client

  const { data: comment, isLoading, error } = useQuery(
    ['comments', CourseId], 
    () => getallCommentOfCourse(CourseId), 
    {
      onSuccess: (resp) => {
        console.log('comment', resp);
      },
    }
  );

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  // Function to add a comment and then invalidate the query
  const addCommentAndInvalidate = async (formData) => {
    try {
      await AddCommnent(formData);
      // Invalidate the query to refetch the comments
      queryClient.invalidateQueries(['comments', CourseId]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={Styles.ReviewArea}>
      {comment?.data?.map((data, index) => (
        <CourseReviewAdminPanel
          key={index}
          point={data?.rate}
          Fullname={data?.fullname}
          Comment={data?.comment}
          CreateDate={formatDate(data?.dateCreated)}
          userId={data?.userId}
          CommentId = {data.guId}
          CourseId={CourseId}
        />
      ))}
    </div>
  );
}
