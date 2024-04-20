import { Message, WebhookRequestBody } from '@line/bot-sdk';
import { Context } from 'hono';
import { handle as handleMessageEvent } from '../handlers/messageEvent';
import { handle as handleFollowEvent} from "../handlers/followEvent";
import { logger } from '../util/logger';
import { replyMessage } from '../infrastructures/apis/line';

export const post = async (c: Context) => {
	logger.info('[START]', 'webhook', 'post');

	try {
		const webhookRequestBody: WebhookRequestBody = await c.req.json();

		for (const event of webhookRequestBody.events) {
			let messages: Message[];

			if (event.type === 'message') {
				messages = await handleMessageEvent(event.message);
				await replyMessage({
					replyToken: event.replyToken,
					messages,
				});
			} else if (event.type === 'follow') {
				await handleFollowEvent(event);
			}
		}

		logger.info('[END]', 'webhook', 'post');
		return c.json({ message: 'ok!' });
	} catch (e) {
		console.error(e);
		logger.info('[END]', 'webhook', 'post');

		return c.json({ message: 'Internal Server Error' }, 500);
	}
};
