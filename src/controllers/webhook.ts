import { ClientConfig, Message, WebhookRequestBody, messagingApi } from '@line/bot-sdk';
import { Context } from 'hono';

import { handle } from '../handlers/messageEventHandler';
import { logger } from '../util/logger';

export const post = async (c: Context) => {
	logger.info('[START]', 'webhook', 'post');

	const lineChannelAccessToken = c.env?.LINE_CHANNEL_ACCESS_TOKEN as string;
	const clientConfig: ClientConfig = {
		channelAccessToken: lineChannelAccessToken,
	};
	const client = new messagingApi.MessagingApiClient(clientConfig);

	logger.debug({ lineChannelAccessToken: lineChannelAccessToken.substring(0, 5) + '*******' });

	try {
		const webhookRequestBody: WebhookRequestBody = await c.req.json();

		for (const event of webhookRequestBody.events) {
			let messages: Message[];

			if (event.type === 'message') {
				messages = await handle(event.message);
				await client.replyMessage({
					replyToken: event.replyToken,
					messages,
				});
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
