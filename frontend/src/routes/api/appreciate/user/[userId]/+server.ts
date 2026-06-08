
import { gqlClient } from '$lib/apolloClient';
// import { resolve } from '$lib/gqty';
import { APPRECIATE_FIELDS } from '$lib/queries/appreciate';
import type { GetByUserIdResponse } from '$lib/types';
import { gql } from '@apollo/client';
import { error, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const userId = params.userId;

	if (!userId) {
		error(400, "UserId is not provided.")
	}


	const getByUserId = gql`
	  query GetByUserId($id: String!) {
	     getByUserId(user_id: $id) {
	      ...AppreciateFields
	    }
	  }

	  ${APPRECIATE_FIELDS}
	`;
	const apprs = await gqlClient.query({
		query: getByUserId,
		variables: {
			id: userId,
		},
	});

	const data = apprs.data as GetByUserIdResponse;
	//
	// const result = await resolve(({ query }) => {
	// 	const apprs = query.getByUserId({
	// 		user_id: userId
	// 	})
	//
	// 	return apprs.map(appr => ({
	// 		id: appr.id,
	// 		userId: appr.user_id,
	// 		text: appr.text,
	// 		createdAt: appr.created_at,
	// 	}))
	// })
	//
	// console.log("res", result)
	return Response.json(data.getByUserId);
}




