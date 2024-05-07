import { createContext, useEffect, useState } from "react";

import axios from "axios";
import { ReviewsContextType } from "../types/ReviewContextTypes.types";
import { ProviderType } from "../types/MonitorsContextTypes.types";
import { Review } from "../models/review";
import { io } from "socket.io-client";

export const ReviewsContext = createContext<ReviewsContextType | null>(null);

function ReviewsContextProvider({ children }: ProviderType) {
  let [reviews, setReviews] = useState<Review[]>([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isServerOnline, setIsServerOnline] = useState(true);

  useEffect(() => {
    const socket = io("http://localhost:5000", { transports: ["websocket"] });
    socket.on("newReview", (newReview: any) => {
      console.log("Received new review from server:", newReview);
      const review = new Review(
        newReview.id,
        newReview.monitorId,
        newReview.rating,
        newReview.comment
      );
      setReviews((prevReviews) => [...prevReviews, review]);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("online", () => setIsOnline(true));
    window.addEventListener("offline", () => setIsOnline(false));

    return () => {
      window.removeEventListener("online", () => setIsOnline(true));
      window.removeEventListener("offline", () => setIsOnline(false));
    };
  }, []);

  const fetchReviews = () => {
    axios
      .get("http://localhost:5000/api/reviews")
      .then((response) => {
        const reviews = response.data.map(
          (review: any) =>
            new Review(
              review.id,
              review.monitorId,
              review.rating,
              review.comment
            )
        );
        setReviews(reviews);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
        setIsServerOnline(false);
      });
  };
  useEffect(() => {
    fetchReviews();
  }, []);

  const addReview = (newReview: Review) => {
    setReviews((prevState: Review[]) => [...prevState, newReview]);
  };

  const removeReview = (reviewId: number) => {
    setReviews((prevState: Review[]) =>
      prevState.filter((review) => review.getId() !== reviewId)
    );
  };

  const editReview = (reviewId: number, updatedReview: Review) => {
    setReviews((prevState: Review[]) =>
      prevState.map((review) => {
        if (review.getId() == reviewId) {
          return updatedReview;
        } else {
          return review;
        }
      })
    );
  };

  useEffect(() => {
    console.log(reviews);
  }, [reviews]);

  return (
    <ReviewsContext.Provider
      value={{
        reviews,
        addReview,
        removeReview,
        editReview,
        isOnline,
        isServerOnline,
      }}
    >
      {children}
    </ReviewsContext.Provider>
  );
}

export { ReviewsContextProvider };
