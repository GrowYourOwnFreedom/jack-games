import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { fetchCategories, postReview } from "../utils/utils";
import { useNavigate } from "react-router-dom";

export default function () {
	const { user, setUser } = useContext(UserContext);
	const [categories, setCategories] = useState(false);

	const [newReview, setNewReview] = useState({
		title: "",
		designer: "",
		review_img_url: "",
		owner:"",
		review_body: "",
		category: "strategy",
	});

	const navigate = useNavigate();

	useEffect(() => {
		fetchCategories().then((categories) => {
			setCategories(categories);
		});
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		let review = { ...newReview };
		review.owner = user.username;
		postReview(review);
		navigate("/");
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setNewReview((currentReview) => {
			let newReview = { ...currentReview, [name]: value };
			return newReview;
		});
	};

	return (
		<main>
			<form onSubmit={handleSubmit} className="review-form" action="">
				<h2 className="review-grid-header">Leave a Review</h2>
				<label htmlFor="review-grid-title-input">Review Title:</label>
				<input
					id="review-grid-title-input"
					className="review-grid-title-input"
					aria-label="review title input"
					type="text"
					value={newReview.title}
					onChange={handleChange}
					name="title"
					placeholder="your title..."
				/>
				<label htmlFor="review-grid-designer-input">Designed By:</label>
				<input
					id="review-grid-designer-input"
					className="review-grid-designer-input"
					aria-label="review designer input"
					type="text"
					value={newReview.designer}
					onChange={handleChange}
					name="designer"
					placeholder="designed by..."
				/>
				<label htmlFor="review-grid-url-input">Image URL:</label>
				<input
					id="review-grid-url-input"
					className="review-grid-url-input"
					aria-label="review image URL input"
					type="text"
					value={newReview.review_img_url}
					onChange={handleChange}
					name="review_img_url"
					placeholder="review image url..."
				/>
				<label htmlFor="review-grid-category-input">category</label>
				<select
					name="category"
					id="review-grid-category-input"
					onChange={handleChange}
					value={newReview.category}
					aria-label="review image category selector"
				>
					{categories &&
						categories.map((category) => {
							return (
								<option
									key={category.slug}
									value={category.slug}
								>
									{category.slug}
								</option>
							);
						})}
				</select>
				<span className="review-grid-body-input">
					<h3>review body:</h3>
					<textarea
						id="review-grid-body-input"
						cols="30"
						rows="10"
						aria-label="review body input"
						value={newReview.review_body}
						onChange={handleChange}
						name="review_body"
						placeholder="enter your review here..."
					></textarea>
				</span>
				<button className="review-grid-submit-button" type="submit">
					Submit
				</button>
			</form>
		</main>
	);
}
