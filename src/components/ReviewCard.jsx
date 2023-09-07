import { useContext, useState } from "react";
import { UserContext } from "../contexts/userContext";

import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { deleteReviewByReview_id } from "../utils/utils";
export default function ReviewCard({ setDeleteError, setReviews, review:{ review_id, review_img_url, title, owner, category, votes, comment_count, created_at }}) {
    const { user } = useContext(UserContext);

    const navigate = useNavigate();

	const handleClick = (route) => {
		navigate(route);
	};
	const handleLinkClick = (event) => {
		event.stopPropagation();
	};
    const handleDeleteClick = (event) => {
        event.stopPropagation()
		let deletedIndex = null;
		setDeleteError(false);
		setReviews((currReviews) => {
			const newReviews = currReviews.filter((review, index) => {
				if (review.review_id === review_id) {
					deletedIndex = index;
				}
				return review.review_id !== review_id;
			});
			return newReviews;
		});
		deleteReviewByReview_id(review_id, user.username).catch(() => {
			setReviews((currReviews) => {
				const newReviews = [...currReviews];
				newReviews.splice(deletedIndex, 0, {
					error: "error",
					review_id,
				});
				return newReviews;
			});
		});
	};
    return (
        <li
            className="review-card"
            onClick={() => {
                handleClick(`/${review_id}`);
            }}
        >
            <img className="review-card-image" src={review_img_url} alt="" />
            <div className="reviews-info">
                <div className="review-title-line">
                    <h3 className="review-title">{title}</h3>
                    {user.username === owner && <button className="delete-review" onClick={handleDeleteClick}>X</button>} 
                </div>
                <div className="reviews-info-buttons">
                    <span className="username">
                        @{owner}
                    </span>
                    <span onClick={handleLinkClick}>
                        <Link
                            className="link"
                            to={`/?category=${category}`}
                        >
                            {category}
                        </Link>
                    </span>
                    <span className="votes">votes: {votes}</span>
                    <span>
                        comments:{comment_count}
                    </span>
                </div>
                <span>{new Date(created_at).toUTCString()}</span>
            </div>
        </li>
    );
}