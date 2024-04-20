import { TextEventMessage, TextMessage } from '@line/bot-sdk';

export const keyword = 'GPTsを作る';

export const execute = async (textEventMessage: TextEventMessage): Promise<TextMessage[]> => {

	

	return [
		{
			type: 'text',
			text: 'GPTsを作るのユースケース',
		},
	];
};
