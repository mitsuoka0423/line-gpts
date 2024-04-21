import { Message } from '@line/bot-sdk';
import { logger } from '../util/logger';
import { findByUser, talkWithAssistant } from '../infrastructures/assistant';
import { fetchByLineId } from '../infrastructures/user';

export const execute = async (text: string, lineId: string): Promise<Message[]> => {
	logger.info('[START]', 'talkGPTs', 'execute');
	logger.debug({ text, lineId });

	const user = await fetchByLineId(lineId);
	const { assistant, thread } = await findByUser(user);
	const talk = await talkWithAssistant(text, assistant, thread);

	const messages: Message[] = talk.contents.map((content) => {
		return {
			type: 'text',
			text: content,
		};
	});

	logger.debug({ messages });
	logger.info('[END]', 'talkGPTs', 'execute');

	return messages;
};
