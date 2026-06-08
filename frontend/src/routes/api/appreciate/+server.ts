
import { gqlClient } from '$lib/apolloClient';
import { resolve } from '$lib/gqty';
// import { resolve } from '$lib/gqty';
import { APPRECIATE_FIELDS } from '$lib/queries/appreciate';
import type { GetAllResponse } from '$lib/types';
import type { RequestHandler } from './$types';
import { gql } from '@apollo/client'

export const GET: RequestHandler = async () => {


	const getAll = gql`
	  query GetAll {
	     getAllAppreciates {
	      ...AppreciateFields
	    }
	  }

	  ${APPRECIATE_FIELDS}
	`;

	console.log(getAll.definitions)

	const apprs = await gqlClient.query({
		query: getAll,
		fetchPolicy: 'network-only',
	});

	const data = apprs.data as GetAllResponse

	// const result = await resolve(({ query }) => {
	// 	const apprs = query.getAllAppreciates
	//
	//
	// 	return apprs.map(appr => ({
	// 		id: appr.id,
	// 		userId: appr.user_id,
	// 		text: appr.text,
	// 		createdAt: appr.created_at,
	// 	}))
	// })
	console.log("all", data)
	// console.log("all_res", result)
	
	return Response.json(data.getAllAppreciates ?? []);
}

