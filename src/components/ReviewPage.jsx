import { useEffect, useState } from "react";
import {
	fetchCommentByReview_id,
	fetchReviewByReview_id,
} from "../utils/utils";
import { useParams } from "react-router-dom";
import "../css/ReviewPage.css";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

export default function ReviewPage() {
	const { user } = useContext(UserContext);

	const { review_id } = useParams();
	const [review, setReview] = useState(false);
	const [comments, setComments] = useState(false);

	useEffect(() => {
		fetchReviewByReview_id(review_id).then((review) => {
			setReview(review);
			fetchCommentByReview_id(review.review_id).then((commentsData) => {
				setComments(commentsData);
			});
		});
	}, []);

	const handleReviewUpVoteClick = () => {};
	const handleReviewDownVoteClick = () => {};
	const handleCommentUpVoteClick = () => {};
	const handleCommentDownVoteClick = () => {};
	const handleCommentDelete = () => {};

	return !review ? (
		<h2>Review Loading...!</h2>
	) : (
		<main>
			<img className="display-img" src={review.review_img_url} alt="" />
			<section className="review-display">
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
					<button onClick={handleReviewUpVoteClick}>upVote!</button>
					<button onClick={handleReviewDownVoteClick}>
						downVote :(
					</button>
				</div>
			</section>
			<section className="comment-display">
				<h2 className="comment-display-title">Comments!</h2>
				{!comments ? (
					<h2>Comments Loading...!</h2>
				) : (
					<ul>
						{comments.map((comment) => {
							return (
								<li
									className="comment-card"
									key={comment.comment_id}
								>
									<div>
										<p>{comment.body}</p>
									</div>
									<div className="comment-buttons">
										<span className="username">
											@{comment.author}
										</span>
										<span>Votes:{comment.votes}</span>
										<button
											onClick={handleCommentUpVoteClick}
										>
											upVote!
										</button>
										<button
											onClick={handleCommentDownVoteClick}
										>
											downVote :(
										</button>
										{user.username === comment.author && (
											<button
												onClick={handleCommentDelete}
											>
												delete comment!
											</button>
										)}
									</div>
									<span>{comment.created_at}</span>
								</li>
							);
						})}
					</ul>
				)}
				{comments.length === 0 && <h3>No comments yet :( Be the first to make a comment!</h3>}
			</section>
		</main>
	);
}
