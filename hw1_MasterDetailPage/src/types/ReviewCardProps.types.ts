import { Review } from "../models/review";

export type ReviewCardPropsType = {
    givenReview: Review;
    removeMethod: (reviewId: number) => void;
    editMethod: (reviewId: number, review: Review) => void;
};