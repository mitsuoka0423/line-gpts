import { TextEventMessage, TextMessage } from '@line/bot-sdk';

export const keyword = 'GPTsを消す';

export const execute = async (textEventMessage: TextEventMessage): Promise<TextMessage[]> => {
	return [
		{
			type: 'text',
			text: 'GPTsを消すのユースケース',
		},
	];
};
