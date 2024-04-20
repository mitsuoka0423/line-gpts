import { EventMessage, ImageEventMessage, Message, TextEventMessage } from '@line/bot-sdk';
import { execute } from '../usecasexs/echo';
import { logger } from '../util/logger';

export const handle = async (message: TextEventMessage | ImageEventMessage): Promise<Message[]> => {
	logger.info('[START]', 'messageEvent', 'handle');
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
	logger.info('[END]', 'messageEvent', 'handle');
	return messages;
};
