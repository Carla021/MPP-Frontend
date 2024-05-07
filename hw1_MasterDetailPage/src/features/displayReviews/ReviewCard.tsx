import { useNavigate } from "react-router-dom";

import "./ReviewCard.css";
import axios from "axios";
import { ReviewCardPropsType } from "../../types/ReviewCardProps.types";

const ReviewCard = ({ givenReview, removeMethod }: ReviewCardPropsType) => {
  // let path: string = "./assets/" + givenMonitor.getPictureUrl();

  const navigate = useNavigate();

  const handleCardOnClick = () => {
    navigate("/ReviewDetails/" + givenReview.getId());
  };

  const handleEditOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    navigate("/editReview/" + givenReview.getId());
  };

  return (
    <div
      className="card"
      data-testid="review-card"
      onClick={handleCardOnClick}
    >
      <button
        className="remove-button"
        onClick={(e) => {
          e.stopPropagation(); // any parent elements that also have click event listeners will not receive the event

          // removeMethod(givenMonitor.getId());

          axios
            .delete(`http://localhost:5000/api/reviews/${givenReview.getId()}`)
            .then(() => {
              removeMethod(givenReview.getId());
            })
            .catch((error) => {
              console.error("Error deleting review:", error);
            });
        }}
      >
        X
      </button>

      <button className="edit-button" onClick={handleEditOnClick}>
        Edit
      </button>

      <div className="card-info">

        <div className="review-info">
          <div className="review-id">ID: {givenReview.getId()}</div>
          <div className="comment">Comment: {givenReview.getComment()}</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
