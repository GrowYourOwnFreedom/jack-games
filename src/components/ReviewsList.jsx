import { useEffect, useState } from "react";
import { fetchReviews } from "../utils/utils";
import "../css/ReviewsList.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";

export default function ReviewsList() {
	const [reviews, setReviews] = useState(false);
	const [params, setParams] = useSearchParams();
	const categoriesQuery = params.get("category") ?? undefined;
	const navigate = useNavigate();

	const handleClick = (route) => {
		navigate(route);
	};
	const handleLinkClick = (event) => {
		event.stopPropagation();
	};

	useEffect(() => {
		fetchReviews({ categoriesQuery }).then((reviews) => {
			setReviews(reviews);
		});
	}, [categoriesQuery]);

	return (
		<main className="reviews-list">
			<h2>Reviews</h2>
			{!reviews ? (
				<h1>Loading....</h1>
			) : (
				<ul>
					{reviews.map((review) => {
						return (
							<ReviewCard key={review.review_id} review={review} />
						);
					})}
				</ul>
			)}
		</main>
	);
}
