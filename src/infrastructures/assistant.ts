import {
	createAssistant,
	createRun,
	createThreadMessage,
	createThread as createThreadViaApi,
	fetchAssistantById,
	filterAssistantsById,
	getMessage,
} from './apis/openai';
import { Assistant } from '../domains/assistant';
import { User } from '../domains/user';
import { findByUserId as findByUserIdFromRepository, list, save as saveAssistantsTable } from './repositories/assistant';
import { findByLineId } from './repositories/user';
import { logger } from '../util/logger';
import { Thread } from '../domains/thread';
import { Talk } from '../domains/Talk';

export const findByUser = async (userDomain: User): Promise<{ assistant: Assistant; thread: Thread }> => {
	logger.info('[START]', 'openai', 'fetchAssistantsByUser');
	logger.debug({ userDomain });

	const userEntity = (await findByLineId(userDomain.lineId)).user;
	const assistantEntity = (await findByUserIdFromRepository(userEntity.id)).assistant;
	const assistantResponse = await fetchAssistantById(assistantEntity.assistant_id);

	const assistantDomain: Assistant = {
		id: assistantResponse.id || 'No ID',
		name: assistantResponse.name || 'No name',
		instructions: assistantResponse.instructions || 'No instructions',
		tools: [], // TODO: 実装
		model: assistantResponse.model || 'No model',
		threadId: '', // TODO 実装
	};
	const threadDomain: Thread = {
		id: assistantEntity.thread_id,
	};

	logger.debug({ assistantDomain });
	logger.info('[END]', 'openai', 'fetchAssistantsByUser');

	return {
		assistant: assistantDomain,
		thread: threadDomain,
	};
};

export const listByUser = async (userDomain: User): Promise<Assistant[]> => {
	logger.info('[START]', 'openai', 'fetchAssistantsByUser');
	logger.debug({ userDomain });

	const userEntity = (await findByLineId(userDomain.lineId)).user;
	const assistantEntities = (await list(userEntity.id)).assistants;
	const assistantIds = assistantEntities.map((assistantEntity) => assistantEntity.assistant_id);
	const assistantResponses = await filterAssistantsById({ assistantIds });

	const assistantDomains = assistantResponses.map((assistant): Assistant => {
		return {
			id: assistant?.id || 'No ID',
			name: assistant?.name || 'No name',
			instructions: assistant?.instructions || 'No instructions',
			tools: [], // TODO: 実装
			model: assistant?.model || 'No model',
			threadId: '', // TODO 実装
		};
	});

	logger.debug({ assistantDomains });
	logger.info('[END]', 'openai', 'fetchAssistantsByUser');

	return assistantDomains;
};

export const create = async (userDomain: User): Promise<Assistant> => {
	logger.info('[START]', 'assistant', 'create');
	logger.debug({ userDomain });

	const name = `${userDomain.name}さんの秘書`;
	const instructions = `
		## 役割
		- ${userDomain.name}の秘書として振る舞ってください
		`;
	// @ts-ignore
	const tools = []; // TODO: 実装
	const model = 'gpt-4-turbo';

	const assistantResponse = await createAssistant({
		name,
		instructions,
		// @ts-ignore
		tools,
		model,
	});
	const threadResponse = await createThreadViaApi();

	const assistnt: Assistant = {
		id: assistantResponse.id,
		name,
		instructions,
		// @ts-ignore
		tools, // TODO 実装
		model,
		threadId: threadResponse?.id || 'No thread', // NOTE: ドメイン分けたほうが良いかも
	};

	logger.debug({ assistnt });
	logger.info('[END]', 'assistant', 'create');

	return assistnt;
};

export const talkWithAssistant = async (text: string, assistant: Assistant, thread: Thread) => {
	logger.info('[START]', 'assistant', 'talk');
	logger.debug({ text, assistant, thread });

	const createMessageResponse = await createThreadMessage(thread.id, text);
	await createRun(assistant.id, thread.id, assistant.instructions);
	const messageResponse = await getMessage(thread.id, createMessageResponse.id);

	if (!messageResponse) {
		throw new Error('メッセージの取得に失敗しました。');
	}

	logger.debug({ messageResponse });
	logger.debug({ content: JSON.stringify(messageResponse.content, null, 2) });
	logger.info('[END]', 'assistant', 'talk');

	let contents: string[] = messageResponse.content.map((content) => {
		if (content.type === 'text') {
			return content.text.value;
		}

		return '';
	}).filter(content => content);

	if (contents.length > 5) {
		contents = contents.slice(0, 5);
	}

	return {
		contents,
	};
};

export const save = async ({ userDomain, assistantDomain }: { userDomain: User; assistantDomain: Assistant }) => {
	logger.info('[START]', 'assistant', 'save');
	logger.debug({ userDomain, assistantDomain });

	await saveAssistantsTable({ userId: userDomain.id, assistantId: assistantDomain.id, threadId: assistantDomain.threadId });

	logger.info('[END]', 'assistant', 'save');
};
