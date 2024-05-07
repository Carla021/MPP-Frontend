import { useContext } from "react";
import { useParams } from "react-router-dom";

import "./ReviewDetailsPage.css";
import { ReviewsContext } from "../../contexts/ReviewsContext";
import Layout from "../../components/layout/Layout";

const ReviewDetailsPage = () => {
  const { reviewId } = useParams(); 
  const { reviews } = useContext(ReviewsContext)!; 

  const parsedReviewId = reviewId ? parseInt(reviewId) : undefined;

  const review = parsedReviewId
    ? reviews.find((review) => review.getId() === parsedReviewId)
    : undefined;

  if (!review) {
    return <div>Review not found</div>;
  }

  return (
    <Layout>
      <div className="review-details-container">
      <div className="section">
        <h2>Review Details</h2>
        <p>ID: {review.getId()}</p>
        <p>Monitor ID: {review.getMonitorId()}</p>
        <p>Rating: {review.getRating()}</p>
        <p>Comment: {review.getComment()}</p>
      </div>
    </div>
    </Layout>
  );
};

export default ReviewDetailsPage;
