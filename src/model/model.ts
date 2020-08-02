export interface Listing {
	name: string;
	id: number;
}

export enum ActionType {
	// listing
	LISTING_REQUEST = "action/LISTING_REQUEST",
	LISTING_REQUEST_SUCCESS = "action/LISTING_REQUEST_SUCCESS",
	LISTING_REQUEST_ERROR = "action/LISTING_REQUEST_ERROR",
}

export interface Action<T> {
	type: ActionType;
	payload: T;
}