
import { resolve } from '$lib/gqty';
import { error, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	const userId = params.userId;

	if (!userId) {
		error(400, "UserId is not provided.")
	}

	const result = await resolve(({ query }) => {
		const apprs = query.getByUserId({
			user_id: userId
		})

		return apprs.map(appr => ({
			id: appr.id,
			userId: appr.user_id,
			text: appr.text,
			createdAt: appr.created_at,
		}))
	})
	return Response.json(result);
}




