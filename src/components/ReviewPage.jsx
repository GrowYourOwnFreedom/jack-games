import { useEffect, useState } from "react";
import { FetchReviewByReview_id } from "../utils/utils";
import { useParams } from "react-router-dom";
import "../css/ReviewPage.css";

export default function ReviewPage() {
	const { review_id } = useParams();
	const [review, setReview] = useState(false);

	useEffect(() => {
		FetchReviewByReview_id(review_id).then((review) => {
			setReview(review);
		});
	}, []);

	const handleUpVoteClick = () => {};
	const handleDownVoteClick = () => {};

	return (
		!review? <h2>Review Loading...!</h2> :
		<>
			<img className="display-img" src={review.review_img_url} alt="" />
			<main className="review-display">
				<div className="review-box">
					<h2>{review.title}</h2>
					<p>{review.review_body}</p>
					<div className="review-info">
						<span> Category: {review.category} </span>
						<span> Designed by {review.designer} </span>
						<span>Comments : {review.comment_count}</span>
					</div>
				</div>
				<div className="side-buttons">
					<span className="username">@{review.owner} </span>
					<span> votes:{review.votes} </span>
					<button onClick={handleUpVoteClick}>upVote!</button>
					<button onClick={handleDownVoteClick}>downVote :(</button>
				</div>
			</main>
		</>
	);
}
