
import { fail, superValidate } from "sveltekit-superforms";
import type { Actions, PageServerLoad } from "./$types";
import { updateAppreciateFormSchema } from "../../../schema";
import { zod4 } from "sveltekit-superforms/adapters";
import { resolve } from '$lib/gqty';


export const load: PageServerLoad = async ({ params }) => {

	const apprId = params.apprId

	let appr = await resolve(({ query }) => {
		let appr = query.getById({
			apprId: apprId
		})


		return { ...appr }
	})


	return {
		form: await superValidate(zod4(updateAppreciateFormSchema)),
		appr
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

		const updatedAppreciation = await resolve(({
			mutation }) => {
			const appr = mutation.updateAppreciate({
				appreciate: {
					id,
					text: form.data.text
				}
			})

			return { ...appr }
		})

		console.log("Updated appreciation to ", updatedAppreciation.user_id)


		return {
			form,
			updatedAppreciation
		};
	},
};
