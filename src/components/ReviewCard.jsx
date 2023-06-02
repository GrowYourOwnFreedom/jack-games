import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function ReviewCard({review:{ review_id, review_img_url, title, owner, category, votes, comment_count, created_at}}) {
    const navigate = useNavigate();

	const handleClick = (route) => {
		navigate(route);
	};
	const handleLinkClick = (event) => {
		event.stopPropagation();
	};
    return (
        <li
            className="review-card"
            onClick={() => {
                handleClick(`/${review_id}`);
            }}
        >
            <img src={review_img_url} alt="" />
            <div className="reviews-info">
                <div>
                    <h3>{title}</h3>
                </div>
                <div className="reviews-info-buttons">
                    <span className="username">
                        @{owner}
                    </span>
                    <span onClick={handleLinkClick}>
                        <Link
                            className="link"
                            to={`/?category=${category}`}
                        >
                            category: {category}
                        </Link>
                    </span>
                    <span>votes: {votes}</span>
                    <span>
                        comments:{comment_count}
                    </span>
                </div>
                <span>{new Date(created_at).toUTCString()}</span>
            </div>
        </li>
    );
}