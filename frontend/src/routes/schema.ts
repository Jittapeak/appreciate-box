import { z } from 'zod'

export const appreciateFormSchema = z.object({
	user_id: z.string().min(1, "You must specify who you want to appreciate!"),
	text: z.string().min(1, "You should send them something.")
})

export const updateAppreciateFormSchema =
	appreciateFormSchema.omit({ user_id: true })

export type AppreciateFormSchema = typeof appreciateFormSchema;
export type UpdateAppreciateFormSchema = typeof updateAppreciateFormSchema
