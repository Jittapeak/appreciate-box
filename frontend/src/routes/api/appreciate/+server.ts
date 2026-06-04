
import { resolve } from '$lib/gqty';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {

	const result = await resolve(({ query }) => {
		const apprs = query.getAllAppreciates


		return apprs.map(appr => ({
			id: appr.id,
			userId: appr.user_id,
			text: appr.text,
			createdAt: appr.created_at,
		}))
	})
	return Response.json(result);
}

