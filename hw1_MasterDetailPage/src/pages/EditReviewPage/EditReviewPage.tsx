import { useContext, useRef, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";

import Layout from "../../components/layout/Layout";
import Button from "../../components/button/Button";

import "./EditReviewPage.css";
import axios from "axios";
import { ReviewsContext } from "../../contexts/ReviewsContext";
import { Review } from "../../models/review";

const EditReviewPage = () => {
  document.title = "Edit a review";

  const { reviewId } = useParams();
  const idInput = useRef<HTMLInputElement>(null);
  const monitorIdInput = useRef<HTMLInputElement>(null);
  const ratingInput = useRef<HTMLInputElement>(null);
  const commentInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const reviewsContext = useContext(ReviewsContext);

  if (!reviewId) {
    navigate("/reviews");
    return;
  }

  useEffect(() => {
    if (!reviewsContext) return;

    const review = reviewsContext.reviews.find(
      (review) => review.getId() === parseInt(reviewId)
    );
    if (!review) return;

    idInput.current!.value = review.getId().toString();
    monitorIdInput.current!.value = review.getMonitorId().toString();
    ratingInput.current!.value = review.getRating().toString();
    commentInput.current!.value = review.getComment();
  }, [reviewId, reviewsContext]);

  const handleClickOnWrapper = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      if (
        !idInput.current ||
        !monitorIdInput.current ||
        !ratingInput.current ||
        !commentInput.current
      )
        throw new Error("Inputs references are null");

      const reviewId = parseInt(idInput.current.value);
      const reviewMonitorId = parseInt(monitorIdInput.current.value);
      const reviewRating = parseInt(ratingInput.current.value);
      const reviewComment = commentInput.current.value;

      const updatedReview = new Review(
        reviewId,
        reviewMonitorId,
        reviewRating,
        reviewComment
      );

      axios
        .put(
          `http://localhost:5000/api/reviews/${updatedReview.getId()}`,
          updatedReview
        )
        .then((response) => {
          reviewsContext?.editReview(
            updatedReview.getId(),
            new Review(
              response.data.id,
              response.data.monitorId,
              response.data.rating,
              response.data.comment
            )
          );
          navigate("/reviews");
        })
        .catch((error) => {
          console.error("Error updating review:", error);
        });

      // monitorsContext?.editMonitor(monitorId, updatedMonitor);
      // navigate("/"); // Navigate back to the main page after editing
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Layout>
      <div className="edit-page-container">
        <div className="edit-title">Edit review</div>

        <form onSubmit={handleClickOnWrapper}>
          <input type="text" placeholder="ID" ref={idInput} readOnly />
          <input type="text" placeholder="MonitorId" ref={monitorIdInput} />
          <input type="text" placeholder="Rating" ref={ratingInput} />
          <input
            type="text"
            placeholder="Comment"
            ref={commentInput}
          />

          <Button
            type="submit"
            buttonMessage="Edit review"
            className="form-button"
          />
        </form>
      </div>
    </Layout>
  );
};

export default EditReviewPage;
