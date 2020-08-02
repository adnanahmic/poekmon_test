import { getCookie } from "utils/cookies";

export const apiBaseRoute = "https://pokeapi.co/api/v2";

export enum MethodType {
	POST = "POST",
	GET = "GET",
	PUT = "PUT",
	DELETE = "DELETE",
}

export const listingRoute = `/pokemon/`;
export const typeRoute = `/type/`;

export const createApiCall = async ({
	method = "GET",
	url = "",
	data = {},
	auth = false,
}) => {
	const headers: any = {
		"Content-Type": "application/json",
	};
	if (auth) {
		headers["Authorization"] = getCookie("token");
	}
	return fetch(`${apiBaseRoute}${url}`, {
		body: method === "GET" ? undefined : JSON.stringify(data),
		cache: "no-cache",
		headers,
		method,
	})
		.then((response) => response.json())
		.then((result) => result);
};
