import axios from "axios";

const jacksGamesApi = axios.create({
	baseURL: "https://jack-games.onrender.com/",
});

export const fetchReviews = ({categoriesQuery}) => {
	return jacksGamesApi.get("/api/reviews",{params:{category:categoriesQuery}}).then(({data:{reviews}}) => {
		return reviews;
	});
};

export const fetchReviewByReview_id = (id) => {
	return jacksGamesApi.get(`/api/reviews/${id}`).then(({data:{review}})=> {
		return review
	})
}

export const fetchCommentByReview_id = (id) => {
	return jacksGamesApi.get(`/api/reviews/${id}/comments`).then(({data:{comments}}) => {
		return comments
	})

}
export const patchReviewVotesByReview_id = (id,num) => {
	return jacksGamesApi.patch(`/api/reviews/${id}`,{inc_votes: num})

}

