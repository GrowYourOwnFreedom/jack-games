import { useEffect, useState } from "react";
import { fetchReviews } from "../utils/utils";
import "../css/ReviewsList.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

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
							<li
								key={review.review_id}
								className="review-card"
								onClick={() => {
									handleClick(`/${review.review_id}`);
								}}
							>
								<img src={review.review_img_url} alt="" />
								<div>
									<h3>{review.title}</h3>
									<span className="username">
										@{review.owner}{" "}
									</span>
									<span onClick={handleLinkClick}>
										<Link
											className="link"
											to={`/?category=${review.category}`}
										>
											{" "}
											category: {review.category}{" "}
										</Link>
									</span>
									<span>votes: {review.votes}</span>
								</div>
							</li>
						);
					})}
				</ul>
			)}
		</main>
	);
}
