import { app } from '@getcronit/pylon'
import { serve } from '@hono/node-server'
import appreciate from './data/appreciation'

export const graphql = {
	Query: {
		hello: () => {
			return 'Hello, world!'
		},

		getAllAppreciates: appreciate.getAll,

		getByUserId: appreciate.getByUserId
	},
	Mutation: {
		updateAppreciate: appreciate.update,
		deleteAppreciate: appreciate.delete,
		addAppreciate: appreciate.add,

	}
}

serve(app, info => {
	console.log(`Server running at ${info.port}`)
})
