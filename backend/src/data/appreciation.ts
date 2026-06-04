import { uuidv7 } from "uuidv7"

interface Appreciate {
	id: string,
	user_id: string,
	text: string,
	created_at: Date,
	updated_at: Date,
}

type AppreciateInsert = Omit<Appreciate, "id" | "created_at" | "updated_at">;
type AppreciateUpdate = Omit<Appreciate, "user_id" | "created_at" | "updated_at">;

class AppreciateService {
	private appreciates: Appreciate[] = []
	getByUserId(user_id: string): Appreciate[] {
		return this.appreciates.filter(appr => appr.user_id == user_id)
	}

	getAll(): Appreciate[] {
		// Could be improve by doing cursor pointer
		return this.appreciates
	}

	add(appreciate: AppreciateInsert): Appreciate {
		const newAppreciate: Appreciate = { ...appreciate, id: uuidv7(), created_at: new Date(), updated_at: new Date() }
		this.appreciates.push(newAppreciate)
		return newAppreciate
	}

	delete(appreciate_id: string): boolean {
		const prevLength = this.appreciates.length
		this.appreciates = this.appreciates.filter(appr => appr.id !== appreciate_id)
		// Got deleted successfully :D
		return this.appreciates.length < prevLength
	}

	update(appreciate: AppreciateUpdate): Appreciate {

		let updatedItem: Appreciate | null = null;
		this.appreciates = this.appreciates.map(appr => {
			if (appr.id === appreciate.id) {
				updatedItem = { ...appr, ...appreciate }
				return updatedItem
			}
			return appr
		})

		if (updatedItem === null) throw Error(`Can not update appreciate (id: ${appreciate.id}) not found`)

		return updatedItem
	}

	constructor() {
		this.getByUserId = this.getByUserId.bind(this)
		this.getAll = this.getAll.bind(this)
		this.add = this.add.bind(this)
		this.delete = this.delete.bind(this)
		this.update = this.update.bind(this)
	}
}


const appreciate = new AppreciateService()

export default appreciate

