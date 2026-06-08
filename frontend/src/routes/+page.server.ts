import { fail, superValidate } from "sveltekit-superforms";
import type { Actions, PageServerLoad } from "./$types";
import { appreciateFormSchema } from "./schema";
import { zod4 } from "sveltekit-superforms/adapters";
import { resolve } from '$lib/gqty';
import { gqlClient } from "$lib/apolloClient";
import { APPRECIATE_FIELDS } from "$lib/queries/appreciate";
import type { addApprResponse, UpdateByIdResponse } from "$lib/types";
import { gql } from "@apollo/client";


export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod4(appreciateFormSchema))
	}
}


export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod4(appreciateFormSchema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}



		const createAppr = gql`
		  mutation CreateAppr($input: AppreciateInsertInput!) {
		     addAppreciate(appreciate: $input) {
		      ...AppreciateFields
		    }
		  }

		  ${APPRECIATE_FIELDS}
		`;
		const apprs = await gqlClient.mutate({
			mutation: createAppr,
			variables: {
				input: {
					user_id: form.data.user_id,
					text: form.data.text
				},
			},
		});

		const data = apprs.data as addApprResponse;

		// const addAppreciation = await resolve(({
		// 	mutation }) => {
		// 	const appr = mutation.addAppreciate({
		// 		appreciate: {
		// 			user_id: form.data.user_id,
		// 			text: form.data.text
		// 		}
		// 	})
		//
		// 	return { ...appr }
		// })

		console.log("Added appreciation to ", data.addAppreciate.user_id)

		// Call to backend
		return {
			form,
		};
	},
};
