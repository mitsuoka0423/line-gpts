import { Message, TemplateMessage } from '@line/bot-sdk';
import { fetchAssistantsByUser } from '../infrastructures/openai';
import { fetchByLineId } from '../infrastructures/user';
import { logger } from '../util/logger';

export const keyword = 'GPTsを選ぶ';

export const execute = async (lineId: string): Promise<Message[]> => {
	logger.info('[START]', 'chooseGpts', 'execute');
	logger.debug({ lineId });

	const user = await fetchByLineId(lineId);

	const assistants = await fetchAssistantsByUser(user);

	const messages: TemplateMessage[] = [
		{
			type: 'template',
			altText: 'GPTs一覧',
			template: {
				type: 'carousel',
				columns: assistants.map((assistant) => {
					return {
						title: assistant.name.substring(0, 40),
						text: assistant.instructions.substring(0, 60),
						actions: [
							{
								type: 'postback',
								label: 'このGPTに切り替える',
								displayText: `${assistant.name} に切り替えます`,
								data: JSON.stringify({ assistantId: assistant.id }),
							},
						],
					};
				}),
			},
		},
	];

	logger.debug({ messages });
	logger.info('[END]', 'chooseGpts', 'execute');

	return messages;
};
