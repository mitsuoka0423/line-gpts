import { EventMessage, Message } from '@line/bot-sdk';
import { execute as executeEcho } from '../usecases/echo';
import { logger } from '../util/logger';
import { keyword as keywordChooseGpts, execute as executeChooseGpts } from '../usecases/chooseGpts';
import { keyword as keywordRegisterGpts, execute as executeRegisterGpts } from '../usecases/registerGpts';
import { keyword as keywordRemoveGpts, execute as executeRemoveGpts } from '../usecases/removeGpts';

export const handle = async (eventMessage: EventMessage): Promise<Message[]> => {
	logger.info('[START]', 'messageEvent', 'handle');
	logger.debug({ eventMessage });

	let messages: Message[] = [];

	if (eventMessage.type === 'text') {
		switch (eventMessage.text) {
			case keywordChooseGpts:
				messages = await executeChooseGpts(eventMessage);
				break;
			case keywordRegisterGpts:
				messages = await executeRegisterGpts(eventMessage);
				break;
			case keywordRemoveGpts:
				messages = await executeRemoveGpts(eventMessage);
				break;
			default:
				messages = await executeEcho(eventMessage);
				break;
		}
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
