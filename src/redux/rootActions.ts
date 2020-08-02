import * as ListingActions from "redux/listing/listingActions";
import * as DetailActions from "redux/detail/detailActions";

export const ActionCreators = Object.assign(
	{},
	{ ...ListingActions, ...DetailActions }
);
