import { useEffect, useState } from "react";
import {
	fetchCommentByReview_id,
	fetchReviewByReview_id,
	patchReviewVotesByReview_id,
	postCommentByReview_id,
} from "../utils/utils";
import { Link, useParams } from "react-router-dom";
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
	const [newComment, setNewComment] = useState("");
	const [typedCommentMemory, setTypedCommentMemory] = useState("");
	const [deleteError, setDeleteError] = useState(false);
	const [submitError, setSubmitError] = useState(false);

	useEffect(() => {
		fetchReviewByReview_id(review_id).then((review) => {
			setReview(review);
			fetchCommentByReview_id(review.review_id).then((commentsData) => {
				setComments(commentsData);
			});
		});
	}, []);

	useEffect(() => {
		if (submitError && typedCommentMemory) {
			setNewComment(typedCommentMemory);
			console.log(typedCommentMemory);

		}
	}, [typedCommentMemory, submitError]);

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

	const handleChange = (event) => {
		setNewComment(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (newComment) {
			setSubmitError(false);
			const body = { username: user.username, body: newComment };
			const tempComment = {
				author: user.username,
				body: newComment,
				votes: 0,
				created_at: Date(),
				comment_id: Date(),
				temp: true,
			};
			setTypedCommentMemory(newComment);
			setNewComment("");

			setComments((currComments) => {
				return [tempComment, ...currComments];
			});
			postCommentByReview_id(review.review_id, body).catch(() => {
				setSubmitError(
					"Sorry, comment not submitted. /n Please check your connection,  and/or refresh your browser and try again!"
				);
				setComments((currComments) => {
					const tempComments = [...currComments];
					tempComments.shift();
					return tempComments;
				});
			});
		} else {
			setSubmitError("Sorry, comments must contain information...");
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
					<span className="votes"> votes:{review.votes} </span>
					{user.username !== review.owner && user && (
						<button
							className="upvote"
							onClick={handleReviewUpVoteClick}
						>
							upVote!
						</button>
					)}
					{user.username !== review.owner && user && (
						<button
							className="downvote"
							onClick={handleReviewDownVoteClick}
						>
							downVote :(
						</button>
					)}
				</div>
			</section>
			{!user && (
				<h3 className="login-prompt">
					Please{" "}
					<Link className="link" to={"/login"}>
						log in
					</Link>{" "}
					to vote or comment!
				</h3>
			)}
			{patchError && (
				<h3 className="patch-error">
					Sorry, there seems to be a problem, please refresh and try
					again!
				</h3>
			)}
			<h2 className="comment-display-title">Comments!</h2>
			<section className="comment-display">
				{submitError && <h3 className="post-error">{submitError}</h3>}
				{user && (
					<form className="comment-form" onSubmit={handleSubmit}>
						{/* <label htmlFor="comment-box"> New Comment:</label> */}
						<textarea
							onChange={handleChange}
							value={newComment}
							name=""
							id="comment-box"
							cols="30"
							rows="10"
							placeholder="Interesting text..."
						></textarea>
						<button>submit new comment</button>
					</form>
				)}
				{!comments ? (
					<h2>Comments Loading...!</h2>
				) : (
					<ul>
						{comments.map((comment, index) => {
							return comment.error === "error" ? (
								<h3
									key={comment.comment_id}
									className="patch-error"
								>
									Sorry comment not deleted, please refresh
									and try again!
								</h3>
							) : (
								<CommentCard
									key={comment.comment_id}
									comment={comment}
									setComments={setComments}
									setDeleteError={setDeleteError}
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
