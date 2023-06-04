import { useContext, useState } from "react";
import { UserContext } from "../contexts/userContext";
import {
	deleteCommentByComment_id,
	patchCommentVotesByComment_id,
} from "../utils/utils";
import { Link } from "react-router-dom";

export default function CommentCard({
	deleteError,
	setDeleteError,
	setComments,
	comment: { comment_id, body, author, votes, created_at },
}) {
	const { user } = useContext(UserContext);
	const [patchError, setPatchError] = useState(false);

	const handleCommentUpVoteClick = () => {
		if (author !== user.username) {
			setComments((currComments) => {
				console.log(currComments);
				const newComments = currComments.map((comment) => {
					if (comment.comment_id === comment_id) {
						return { ...comment, votes: comment.votes + 1 };
					} else {
						return comment;
					}
				});
				return newComments;
			});
			patchCommentVotesByComment_id(comment_id, 1)
				.then(() => {
					setPatchError(false);
				})
				.catch(() => {
					setComments((currComments) => {
						const newComments = currComments.map((comment) => {
							if (comment.comment_id === comment_id) {
								return { ...comment, votes: comment.votes - 1 };
							} else {
								return comment;
							}
						});
						return newComments;
					});
					setPatchError(true);
				});
		}
	};
	const handleCommentDownVoteClick = () => {
		if (author !== user.username) {
			setComments((currComments) => {
				const newComments = currComments.map((comment) => {
					if (comment.comment_id === comment_id) {
						return { ...comment, votes: comment.votes - 1 };
					} else {
						return comment;
					}
				});
				return newComments;
			});
			patchCommentVotesByComment_id(comment_id, -1)
				.then(() => {
					setPatchError(false);
				})
				.catch(() => {
					setComments((currComments) => {
						const newComments = currComments.map((comment) => {
							if (comment.comment_id === comment_id) {
								return { ...comment, votes: comment.votes + 1 };
							} else {
								return comment;
							}
						});
						return newComments;
					});
					setPatchError(true);
				});
		}
	};
	const handleCommentDelete = () => {
		setDeleteError(false);
		setComments((currComments) => {
			const newComments = currComments.filter((comment) => {
				return comment.comment_id !== comment_id;
			});
			return newComments;
		});
		deleteCommentByComment_id(comment_id).catch(() => {
			setDeleteError(true);
		});
	};
	return (
		<li className="comment-card" key={comment_id}>
			<span className="username">@{author}</span>
			<div className="body-and-buttons">
				<div className="comment-body">
					<p>{body}</p>
				</div>
				<div className="comment-buttons">
					{user.username !== author && user && (
						<button
							className="upvote"
							onClick={handleCommentUpVoteClick}
						>
							upVote!
						</button>
					)}
					{user.username !== author && user && (
						<button
							className="downvote"
							onClick={handleCommentDownVoteClick}
						>
							downVote :(
						</button>
					)}
					{user.username === author && (
						<button
							className="delete"
							onClick={handleCommentDelete}
						>
							delete comment!
						</button>
					)}
					{/* {!user && <h3 className="username">Please <Link className="link" to={'/login'}>log in</Link>  to vote on comments!</h3>} */}
				</div>
			</div>

			{patchError && (
				<h3 className="patch-error">
					Sorry, your vote could not be patched, please refresh and
					try again!
				</h3>
			)}
			<div>
				<span className="votes">Votes:{votes}</span>{" "}
				<span>{new Date(created_at).toUTCString()}</span>
			</div>
		</li>
	);
}
