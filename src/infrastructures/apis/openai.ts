import OpenAI from 'openai';
import { logger } from '../../util/logger';

let openai: OpenAI | null = null;

export const init = ({ apiKey }: { apiKey: string }) => {
	logger.info('[START]', 'openai', 'init');

	openai = new OpenAI({ apiKey });

	logger.info('[END]', 'openai', 'init');
};

export const createAssistant = async ({
	name,
	instructions,
	tools,
	model,
}: {
	name: string;
	instructions: string;
	tools?: string[]; // TODO: 実装
	model: 'gpt-4-turbo';
}) => {
	logger.info('[START]', 'openai', 'createAssistant');

	const assistant = await openai?.beta.assistants.create({
		name,
		instructions,
		tools: undefined, // TODO: 実装
		model,
	});

	if (!assistant) {
		logger.error('Assistant の生成に失敗しました。');
		logger.error({ name, instructions, tools, model });
		throw new Error('Assistant の生成に失敗しました。');
	}

	logger.debug({assistant});
	logger.info('[END]', 'openai', 'createAssistant');

	return assistant;
};

export const filterAssistantsById = async ({ assistantIds }: { assistantIds: string[] }) => {
	logger.info('[START]', 'openai', 'filterAssistantsById');
	logger.debug({ assistantIds });

	const assistants = [];
	for (const assistantId of assistantIds) {
		const assistant = await openai?.beta.assistants.retrieve(assistantId);
		assistants.push(assistant);
	}

	logger.debug({ assistants });
	logger.info('[END]', 'openai', 'filterAssistantsById');

	return assistants;
};
