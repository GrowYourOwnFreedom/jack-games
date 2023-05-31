import axios from "axios";

const jacksGamesApi = axios.create({
	baseURL: "https://jack-games.onrender.com/",
});

export const fetchReviews = ({categoriesQuery}) => {
	return jacksGamesApi.get("/api/reviews",{params:{category:categoriesQuery}}).then(({data:{reviews}}) => {
		return reviews;
	});
};

export const FetchReviewByReview_id = (id) => {
	return jacksGamesApi.get(`/api/reviews/${id}`).then(({data:{review}})=> {
		return review
	})
}

