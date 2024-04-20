import { Message } from '@line/bot-sdk';
import { fetchAssistantsByUser } from '../infrastructures/openai';
import { User } from '../domains/user';

export const keyword = 'GPTsを選ぶ';

export const execute = async (user: User): Promise<Message[]> => {
	const assistants = await fetchAssistantsByUser(user);

	return [
		{
			type: 'template',
			altText: 'GPTs一覧',
			template: {
				type: 'carousel',
				columns: assistants.map((assistant) => {
					return {
						text: assistant.name,
						actions: [{
							type: 'postback',
							label: 'このGPTに切り替える',
							data: ``,
						}],
					};
				}),
			},
		},
	];
};
