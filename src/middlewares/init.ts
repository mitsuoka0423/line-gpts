import { Context, Next } from 'hono';
import { init as initLine } from '../apis/line';
import { init as initDB } from '../repositories/db';

export const init = async (c: Context, next: Next) => {
	const { LINE_CHANNEL_ACCESS_TOKEN, DB } = c.env;

	initLine({
		channelAccessToken: LINE_CHANNEL_ACCESS_TOKEN,
	});
	initDB({ database: DB });

	await next();
};
