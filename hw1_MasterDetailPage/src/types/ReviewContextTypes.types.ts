import { Review } from "../models/review";

export type ReviewsContextType = {
    reviews: Review[];
    addReview: (review: Review) => void;
    removeReview: (reviewId: number) => void;
    editReview: (reviewId: number, review: Review) => void;
    isOnline: boolean;
    isServerOnline: boolean;
};

export type ReviewProviderType = {
    reviewContext: ReviewsContextType;
    children: React.ReactNode;
}