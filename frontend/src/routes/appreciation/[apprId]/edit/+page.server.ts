
import { fail, superValidate } from "sveltekit-superforms";
import type { Actions, PageServerLoad } from "./$types";
import { updateAppreciateFormSchema } from "../../../schema";
import { zod4 } from "sveltekit-superforms/adapters";
import { resolve } from '$lib/gqty';
import { gqlClient } from "$lib/apolloClient";
import { APPRECIATE_FIELDS } from "$lib/queries/appreciate";
import type { GetByIdResponse, UpdateAppreciateInput, UpdateByIdResponse } from "$lib/types";
import { gql } from "@apollo/client";
import { error } from "@sveltejs/kit";


export const load: PageServerLoad = async ({ params }) => {

	const apprId = params.apprId


	const getById = gql`
	  query GetById($id: String!) {
	     getById(apprId: $id) {
	      ...AppreciateFields
	    }
	  }

	  ${APPRECIATE_FIELDS}
	`;
	const apprs = await gqlClient.query({
		query: getById,
		variables: {
			id: apprId,
		},
	});

	const data = apprs.data as GetByIdResponse | null;
	if (!data) {
		error(404, "Appreciation not found")
	}
	console.log(data.getById)


	// let appr = await resolve(({ query }) => {
	// 	let appr = query.getById({
	// 		apprId: apprId
	// 	})
	//
	//
	// 	return { ...appr }
	// })


	return {
		form: await superValidate(zod4(updateAppreciateFormSchema)),
		appr: data.getById
	}
}


export const actions: Actions = {
	default: async (event) => {
		const id = event.params.apprId
		const form = await superValidate(event, zod4(updateAppreciateFormSchema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		const updateAppr = gql`
		  mutation UpdateAppr($input: AppreciateUpdateInput!) {
		     updateAppreciate(appreciate: $input) {
		      ...AppreciateFields
		    }
		  }

		  ${APPRECIATE_FIELDS}
		`;
		const apprs = await gqlClient.mutate({
			mutation: updateAppr,
			variables: {
				input: {
					id,
					text: form.data.text
				},
			},
		});

		const data = apprs.data as UpdateByIdResponse;


		// const updatedAppreciation = await resolve(({
		// 	mutation }) => {
		// 	const appr = mutation.updateAppreciate({
		// 		appreciate: {
		// 			id,
		// 			text: form.data.text
		// 		}
		// 	})
		//
		// 	return { ...appr }
		// })

		console.log("Updated appreciation to ", data.updateAppreciate.id)

		return {
			form,
			updatedAppreciation: data.updateAppreciate
		};
	},
};
