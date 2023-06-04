import { useEffect, useState } from "react";
import { fetchReviews } from "../utils/utils";
import "../css/ReviewsList.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";

export default function ReviewsList() {
	const [reviews, setReviews] = useState(false);
	const [params, setParams] = useSearchParams();
	const categoriesQuery = params.get("category");
	const sortQuery = params.get("sort_by");
	const orderQuery = params.get("order");

	useEffect(() => {
		fetchReviews({
			params: {
				category: categoriesQuery,
				sort_by: sortQuery,
				order: orderQuery,
			},
		}).then((reviews) => {
			setReviews(reviews);
		});
	}, [categoriesQuery, sortQuery, orderQuery]);

	const handleChange = (param, value) => {
		const newParams = new URLSearchParams(params);
		newParams.set(param, value);
		setParams(newParams);
	};

	return (
		<main className="reviews-list">
			<h2>Reviews</h2>
			<section className="sort-area">
				<div>
					<label htmlFor="sort-by">sort by</label>
					<select
						onChange={(event) => {
							handleChange("sort_by", event.target.value);
						}}
						name="sort_by"
						id="sort-by"
					>
						<option value="created_at">created_at</option>
						<option value="votes">votes</option>
						<option value="comment_count">comment_count</option>
					</select>
				</div>
				<div>
					<label htmlFor="order">order</label>
					<select
						onChange={(event) => {
							handleChange("order", event.target.value);
						}}
						name="order"
						id="order"
					>
						<option value="ASC">ascending</option>
						<option value="DESC">descending</option>
					</select>
				</div>
			</section>
			{!reviews ? (
				<h1>Loading....</h1>
			) : (
				<ul>
					{reviews.map((review) => {
						return (
							<ReviewCard
								key={review.review_id}
								review={review}
							/>
						);
					})}
				</ul>
			)}
		</main>
	);
}
