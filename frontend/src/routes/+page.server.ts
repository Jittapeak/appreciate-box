import { fail, superValidate } from "sveltekit-superforms";
import type { Actions, PageServerLoad } from "./$types";
import { appreciateFormSchema } from "./schema";
import { zod4 } from "sveltekit-superforms/adapters";
import { resolve } from '$lib/gqty';


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

		const addAppreciation = await resolve(({
			mutation }) => {
			const appr = mutation.addAppreciate({
				appreciate: {
					user_id: form.data.user_id,
					text: form.data.text
				}
			})

			return { ...appr }
		})

		console.log("Added appreciation to ", addAppreciation.user_id)

		// Call to backend
		return {
			form,
		};
	},
};
