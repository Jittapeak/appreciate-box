import { gqlClient } from "$lib/apolloClient";
import { resolve } from "$lib/gqty";
import { APPRECIATE_FIELDS } from "$lib/queries/appreciate";
import type { GetByUserIdResponse } from "$lib/types";
import { gql } from "@apollo/client";
import { type RequestHandler } from "@sveltejs/kit";

export const DELETE: RequestHandler = async ({ params }) => {
	const apprId = params.apprId as string
	
	const deleteById = gql`
	  mutation delete($appreciate_id: String!) {
	     deleteAppreciate(appreciate_id: $appreciate_id)
	  }

	`;

	const apprs = await gqlClient.mutate({
		mutation: deleteById,
		variables: {
			appreciate_id: apprId,
		},
	});

	const data = apprs.data ;

	console.log(data)


	// await resolve(({ mutation }) => {
	// 	mutation.deleteAppreciate({
	// 		appreciate_id: apprId
	// 	})
	// })
	return Response.json({
		status: "success"
	});
}

