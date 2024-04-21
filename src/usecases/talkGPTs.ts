import { Message } from '@line/bot-sdk';
import { logger } from '../util/logger';

export const execute = async (text: string, lineId: string): Promise<Message[]> => {
	logger.info('[START]', 'talkGPTs', 'execute');
	logger.debug({ text, lineId });

	const messages: Message[] = [
		{
			type: 'text',
			text: text,
		},
	];

	logger.debug({ messages });
	logger.info('[END]', 'talkGPTs', 'execute');

	return messages;
};
