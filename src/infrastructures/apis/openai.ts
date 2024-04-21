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

	logger.debug({ assistant });
	logger.info('[END]', 'openai', 'createAssistant');

	return assistant;
};

export const createThread = async () => {
	logger.info('[START]', 'openai', 'createThread');

	const thread = await openai?.beta.threads.create();

	logger.debug({ thread });
	logger.info('[END]', 'openai', 'createThread');

	return thread;
};

export const createThreadMessage = async (threadId: string, text: string) => {
	logger.info('[START]', 'openai', 'createThreadMessage');
	logger.debug({ threadId });

	const message = await openai?.beta.threads.messages.create(threadId, {
		role: 'user',
		content: text,
	});

	logger.debug({ message });

	if (!message) {
		throw new Error('threads message create に失敗しました');
	}

	logger.info('[END]', 'openai', 'createThreadMessage');

	return message;
};

export const createRun = async (assistantId: string, threadId: string, instructions: string) => {
	logger.info('[START]', 'openai', 'createRun');
	logger.debug({ threadId, instructions });

	const run = await openai?.beta.threads.runs.createAndPoll(threadId, {
		assistant_id: assistantId,
		instructions,
	});

	logger.debug({ run });
	logger.info('[END]', 'openai', 'createRun');

	return run;
};

export const getMessage = async (threadId: string, messageId: string) => {
	logger.info('[START]', 'openai', 'getMessage');

	// const message = await openai?.beta.threads.messages.retrieve(threadId, messageId);
	const messages = await openai?.beta.threads.messages.list(threadId);

	if (!messages) {
		throw new Error('メッセージリストの取得に失敗しました');
	}

	logger.debug({ messages });

	logger.info('[END]', 'openai', 'getMessage');

	return messages.data[0];
};

export const fetchAssistantById = async (assistantId: string) => {
	logger.info('[START]', 'openai', 'fetchAssistantById');
	logger.debug({ assistantId });

	const assistant = await openai?.beta.assistants.retrieve(assistantId);

	logger.debug({ assistant });
	logger.info('[END]', 'openai', 'fetchAssistantById');

	if (!assistant) {
		throw new Error('アシスタントの取得に失敗しました。');
	}

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
