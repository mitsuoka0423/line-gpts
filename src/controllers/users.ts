import { User } from "../types/tables";
import { Context } from "hono";

export const get = async (c: Context) => {
	const { users }: { users: User[] } = await c.env.DB.prepare(`select * from users order by id desc limit 5`).all();

	return c.json({ users });
};
