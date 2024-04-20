import { EventMessage, Message } from '@line/bot-sdk';
import { execute } from '../usecases/echo';
import { logger } from '../util/logger';

export const handle = async (eventMessage: EventMessage): Promise<Message[]> => {
	logger.info('[START]', 'messageEvent', 'handle');
	logger.debug({ eventMessage });

	let messages: Message[] = [];

	if (eventMessage.type === 'text') {
		messages = await execute(eventMessage);
	} else {
		messages = [
			{
				type: 'text',
				text: `未対応のメッセージです。`,
			},
		];
	}

	logger.debug({ messages });
	logger.info('[END]', 'messageEvent', 'handle');
	return messages;
};
