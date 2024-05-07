import { Review } from "../models/review";

export type ReviewFormType = {
    idInput: React.RefObject<HTMLInputElement>;
    monitorId: React.RefObject<HTMLInputElement>;
    rating: React.RefObject<HTMLInputElement>;
    comment: React.RefObject<HTMLInputElement>;
    givenReview?: Review;
};