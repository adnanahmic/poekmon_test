export interface Listing {
	name: string;
	url: string;
}

export interface Detail {
	name: string;
	url: string;
}

export enum ActionType {
	// listing
	LISTING_REQUEST = "action/LISTING_REQUEST",
	LISTING_REQUEST_SUCCESS = "action/LISTING_REQUEST_SUCCESS",
	LISTING_REQUEST_ERROR = "action/LISTING_REQUEST_ERROR",
	DETAIL_REQUEST = "action/DETAIL_REQUEST",
	DETAIL_REQUEST_SUCCESS = "action/DETAIL_REQUEST_SUCCESS",
	DETAIL_REQUEST_ERROR = "action/DETAIL_REQUEST_ERROR",
}

export interface Action<T> {
	type: ActionType;
	payload: T;
}
