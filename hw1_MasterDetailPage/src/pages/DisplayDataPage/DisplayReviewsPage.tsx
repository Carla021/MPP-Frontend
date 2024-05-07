import { useContext, useState } from "react";

import Layout from "../../components/layout/Layout";


import "./DisplayReviewsPage.css";
import { ReviewsContext } from "../../contexts/ReviewsContext";
import ReviewCard from "../../features/displayReviews/ReviewCard";


const DisplayReviewsPage = () => {
  document.title = "Reviews dashboard!";

  const reviewsContext = useContext(ReviewsContext)!;

  const removeMethod = reviewsContext.removeReview;
  const editMethod = reviewsContext.editReview;

  const reviews = reviewsContext.reviews;

  const reviewsPerPage = 2; // Number of reviews per page
  const [currentPage, setCurrentPage] = useState(1);
  
  const lastIndex = currentPage * reviewsPerPage;
  const firstIndex = lastIndex - reviewsPerPage;

  const records = reviews.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  function prePage() {
    if(currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id: number) {
      setCurrentPage(id);
  }

  function nextPage() {
    if(currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <Layout>
      <div className="main-page-container">
        <div className="reviews-list">
          {records.map((review) => (
            <ReviewCard
                givenReview={review}
                removeMethod={removeMethod}
                editMethod={editMethod}
                key={review.getId()}
            />
          ))}
        </div>
      </div>
      <nav>
        <ul className='pagination'>
            <li className='page-item'>
                <a href='#' className='page-link'
                onClick={prePage}>Prev</a>
            </li>
            {
                numbers.map((n, i) => (
                  <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                      <a href='#' className='page-link'
                      onClick={() => changeCPage(n)} >{n}</a>
                  </li>
                ))
            }
            <li className='page-item'>
                <a href='#' className='page-link'
                onClick={nextPage}>Next</a>
            </li>
        </ul>
    </nav>
    </Layout>
  );
};

export default DisplayReviewsPage;
