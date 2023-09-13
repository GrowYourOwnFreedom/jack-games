import axios from "axios";

// const beUrl = "https://jack-games.onrender.com/";
const beUrl = "http://localhost:9090";

const jacksGamesApi = axios.create({
	baseURL: beUrl,
});

export const fetchReviews = (params) => {
	return jacksGamesApi
		.get("/api/reviews", params)
		.then(({ data: { reviews } }) => {
			return reviews;
		});
};

export const fetchReviewByReview_id = (id) => {
	return jacksGamesApi
		.get(`/api/reviews/${id}`)
		.then(({ data: { review } }) => {
			return review;
		});
};

export const fetchCommentByReview_id = (id) => {
	return jacksGamesApi
		.get(`/api/reviews/${id}/comments`)
		.then(({ data: { comments } }) => {
			return comments;
		});
};
export const patchReviewVotesByReview_id = (id, num) => {
	return jacksGamesApi.patch(`/api/reviews/${id}`, { inc_votes: num });
};
export const fetchUserByUsername = (username, password) => {
	const body = { password };
	return jacksGamesApi
		.post(`/api/users/${username}`, body)
		.then(({ data: { user } }) => {
			return user;
		});
};
export const patchCommentVotesByComment_id = (id, num) => {
	return jacksGamesApi.patch(`/api/comments/${id}`, { inc_votes: num });
};

export const fetchCategories = () => {
	return jacksGamesApi
		.get("/api/categories")
		.then(({ data: { categories } }) => {
			return categories;
		});
};

export const postCommentByReview_id = (id, body) => {
	console.log("in post");
	return jacksGamesApi.post(`/api/reviews/${id}/comments`, body);
};

export const deleteCommentByComment_id = (id) => {
	return jacksGamesApi.delete(`/api/comments/${id}`);
};

export const deleteReviewByReview_id = (id, username) => {
	const body = { username };
	return jacksGamesApi.post(`/api/reviews/${id}`, body);
};

export const postUser = (body) => {
	return jacksGamesApi.post('/api/users', body).then(({ data: { user } }) => {
		return user;
	});

}

export const postReview =(body) => {
	return jacksGamesApi.post('/api/reviews', body).then(({data: { review }}) => {
		return review
	})
}
