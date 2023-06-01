import { useContext } from "react";
import { UserContext } from "../contexts/userContext";

export default function CommentCard({ comment: { comment_id, body, author, votes, created_at}}) {
	
	const { user } = useContext(UserContext);

	const handleCommentUpVoteClick = () => {};
	const handleCommentDownVoteClick = () => {};
	const handleCommentDelete = () => {};

							return (
								<li
									className="comment-card"
									key={comment_id}
								>
									<div>
										<p>{body}</p>
									</div>
									<div className="comment-buttons">
										<span className="username">
											@{author}
										</span>
										<span>Votes:{votes}</span>
										{user.username !== author &&<button
											onClick={handleCommentUpVoteClick}
										>
											upVote!
										</button>}
										{user.username !== author &&<button
											onClick={handleCommentDownVoteClick}
										>
											downVote :(
										</button>}
										{user.username === author && (
											<button
												onClick={handleCommentDelete}
											>
												delete comment!
											</button>
										)}
									</div>
									<span>{created_at}</span>
								</li>
							);
						
}