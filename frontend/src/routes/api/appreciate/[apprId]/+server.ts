import { resolve } from "$lib/gqty";
import { type RequestHandler } from "@sveltejs/kit";

export const DELETE: RequestHandler = async ({ params }) => {
	const apprId = params.apprId as string
	await resolve(({ mutation }) => {
		mutation.deleteAppreciate({
			appreciate_id: apprId
		})
	})
	return Response.json({
		status: "success"
	});
}

