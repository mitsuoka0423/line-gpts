import { EventMessage, Message } from '@line/bot-sdk';
import { execute } from '../usecasexs/echo';
import { logger } from '../util/logger';

export const handle = async (message: EventMessage): Promise<Message[]> => {
	logger.info('[START]', 'messageEventHandler', 'handle');
	logger.debug({ message });

	let messages: Message[] = [];

	if (message.type === 'text') {
		messages = await execute(message);
	} else {
		messages = [
			{
				type: 'text',
				text: `未対応のメッセージです。`,
			},
		];
	}

	logger.debug({ message });
	logger.info('[END]', 'messageEventHandler', 'handle');
	return messages;
};
