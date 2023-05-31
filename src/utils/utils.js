import axios from "axios";

const jacksGamesApi = axios.create({
	baseURL: "https://jack-games.onrender.com/",
});

export const fetchReviews = (category,sort_by,order) => {
	let endpoint = `/api/reviews`;
	if(category || sort_by ||order) endpoint += `?`
	if(category) endpoint +=`?category=${category}&`
	if(sort_by) endpoint +=`?sort_by=${sort_by}&`
	if(order) endpoint +=`?order=${order}`
	return jacksGamesApi.get(endpoint).then(({data:{reviews}}) => {
		return reviews;
	});
};
