import { useContext, useRef } from "react";


import { useNavigate } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Button from "../../components/button/Button";

import './AddReviewPage.css'
import axios from "axios";
import { Review } from "../../models/review";
import { ReviewsContext } from "../../contexts/ReviewsContext";

function handleOnClick(
    idInput: React.RefObject<HTMLInputElement>,
    monitorIdInput: React.RefObject<HTMLInputElement>,
    ratingInput: React.RefObject<HTMLInputElement>,
    commentInput: React.RefObject<HTMLInputElement>,
): Review {
    if (!idInput.current || !monitorIdInput.current || !ratingInput.current || !commentInput.current)
        throw new Error('Inputs references are null');

    const reviewId: number = parseInt(idInput.current.value);
    const monitorId: number = parseInt(monitorIdInput.current.value);
    const reviewRatingInput: number = parseInt(ratingInput.current.value);
    const reviewCommentInput: string = commentInput.current.value;

    return new Review(reviewId, monitorId, reviewRatingInput, reviewCommentInput);
}

const AddReviewPage = () => {
    document.title = 'Add a review';

    const idInput = useRef<HTMLInputElement>(null);
    const monitorIdInput = useRef<HTMLInputElement>(null);
    const ratingInput = useRef<HTMLInputElement>(null);
    const commentInput = useRef<HTMLInputElement>(null);

    const reviewsContext = useContext(ReviewsContext);
    const navigate = useNavigate();

    const handleClickOnWrapper = () => {
        try {
            const inputReview = handleOnClick(idInput, monitorIdInput, ratingInput, commentInput);
            
            axios.post('http://localhost:5000/api/addReview', inputReview)
                .then(response => {
                    reviewsContext?.addReview(response.data);
                    navigate('/reviews');
                })
                .catch(error => {
                    console.error('Error adding review:', error);
                }); 
        } catch (error) {
            alert(error);
        }
    };
    
    return (
        <Layout>
            <div className='add-page-container'>
                <div className='add-title'>Add review</div>

                <form>
                    <input type="text" placeholder="ID" ref={idInput} />
                    <input type="text" placeholder="Monitor ID" ref={monitorIdInput} />
                    <input type="text" placeholder="Rating" ref={ratingInput} />
                    <input type="text" placeholder="Comment" ref={commentInput} />
                </form>

                <Button type="submit" buttonMessage="Add review" className="form-button" onClick={handleClickOnWrapper} />
            </div>
        </Layout>
    ) 
}

export default AddReviewPage;