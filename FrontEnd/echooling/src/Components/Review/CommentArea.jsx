import React from 'react'
import ReviewMessage from '../ReviewMessage/ReviewMessage'
import Styles from './CommentArea.module.css'
export default function CommentAreas1() {
  return (
    <div style={Styles.ReviewArea}>
      <ReviewMessage />
      <ReviewMessage />
      <ReviewMessage />
      <ReviewMessage />
      <ReviewMessage />
      <ReviewMessage />
      <ReviewMessage />
    </div>
  )
}

