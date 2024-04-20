import { TextEventMessage, TextMessage } from '@line/bot-sdk';

export const keyword = 'GPTsを選ぶ';

export const execute = async (textEventMessage: TextEventMessage): Promise<TextMessage[]> => {
	return [
		{
			type: 'text',
			text: 'GPTsを選ぶのユースケース',
		},
	];
};
