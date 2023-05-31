import { useEffect, useState } from "react";
import { fetchReviews } from "../utils/utils";
import "../css/ReviewsList.css"
import { Link, useSearchParams } from "react-router-dom";

export default function ReviewsList() {
	const [reviews, setReviews] = useState(false);
    const [params, setParams ] = useSearchParams()
    const categoriesQuery = params.get("category") ?? undefined



	useEffect(() => {
        fetchReviews({categoriesQuery}).then((reviews) => {
            console.log(reviews);
            setReviews(reviews);
        });
	}, [categoriesQuery]);

	return (
		<main className="reviews-list">
			<h2>Reviews</h2>
            {!reviews ?
            <h1>Loading....</h1> :
			<ul>
				{reviews.map((review) => {
					return (
						<li key={review.review_id} className="review-card">
							<h3>{review.title}</h3>
                            <Link to={`/?category=${review.category}`}> category: {review.category}  </Link>
                            <span>category: {review.category} </span>
                            <span>user: {review.owner} </span>
                            <span>votes: {review.votes}</span>
						</li>
					);
				})}
			</ul>

            }
		</main>
	);
}
