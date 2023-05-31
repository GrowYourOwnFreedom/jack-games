import axios from "axios";

const jacksGamesApi = axios.create({
	baseURL: "https://jack-games.onrender.com/",
});

export const fetchReviews = ({categoriesQuery}) => {
	return jacksGamesApi.get("/api/reviews",{params:{category:categoriesQuery}}).then(({data:{reviews}}) => {
		return reviews;
	});
};
