import { useEffect, useState } from "react";
import {
	fetchCommentByReview_id,
	fetchReviewByReview_id,
	patchReviewVotesByReview_id,
} from "../utils/utils";
import { useParams } from "react-router-dom";
import "../css/ReviewPage.css";
import CommentCard from "./CommentCard";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

export default function ReviewPage() {
	const { user } = useContext(UserContext);

	const { review_id } = useParams();
	const [review, setReview] = useState(false);
	const [comments, setComments] = useState(false);
	const [patchError, setPatchError] = useState(false);

	useEffect(() => {
		fetchReviewByReview_id(review_id).then((review) => {
			setReview(review);
			fetchCommentByReview_id(review.review_id).then((commentsData) => {
				setComments(commentsData);
			});
		});
	}, []);

	const handleReviewUpVoteClick = () => {
		if (review.owner !== user.username) {
			setReview((currReview) => {
				return { ...currReview, votes: currReview.votes + 1 };
			});
			patchReviewVotesByReview_id(review.review_id, 1)
				.then(() => {
					setPatchError(false);
				})
				.catch(() => {
					setReview((currReview) => {
						return { ...currReview, votes: currReview.votes - 1 };
					});
					setPatchError(true);
				});
		}
	};
	const handleReviewDownVoteClick = () => {
		if (review.owner !== user.username) {
			setReview((currReview) => {
				return { ...currReview, votes: currReview.votes - 1 };
			});
			patchReviewVotesByReview_id(review.review_id, -1)
				.then(() => {
					setPatchError(false);
				})
				.catch(() => {
					setReview((currReview) => {
						return { ...currReview, votes: currReview.votes + 1 };
					});
					setPatchError(true);
				});
		}
	};

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
					{user.username !== review.owner && (
						<button onClick={handleReviewUpVoteClick}>
							upVote!
						</button>
					)}
					{user.username !== review.owner && (
						<button onClick={handleReviewDownVoteClick}>
							downVote :(
						</button>
					)}
				</div>
			</section>
			{patchError && (
				<h3 className="patch-error">
					Sorry, there seems to be a problem, please refresh and try
					again!
				</h3>
			)}
			<section className="comment-display">
				<h2 className="comment-display-title">Comments!</h2>
				{!comments ? (
					<h2>Comments Loading...!</h2>
				) : (
					<ul>
						{comments.map((comment) => {
							return (
								<CommentCard
									key={comment.comment_id}
									comment={comment}
								/>
							);
						})}
					</ul>
				)}
				{comments.length === 0 && (
					<h3>No comments yet :( Be the first to make a comment!</h3>
				)}
			</section>
		</main>
	);
}
