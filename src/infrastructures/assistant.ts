import { createAssistant, createThread as createThreadViaApi, filterAssistantsById } from './apis/openai';
import { Assistant } from '../domains/assistant';
import { User } from '../domains/user';
import { list, save as saveAssistantsTable } from './repositories/assistant';
import { findByLineId } from './repositories/user';
import { logger } from '../util/logger';

export const fetchByUser = async (userDomain: User): Promise<Assistant[]> => {
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

export const createThread = async () => {
	logger.info('[START]', 'assistant', 'createThread');


	logger.info('[END]', 'assistant', 'createThread');
};

export const save = async ({ userDomain, assistantDomain }: { userDomain: User; assistantDomain: Assistant }) => {
	logger.info('[START]', 'assistant', 'save');
	logger.debug({ userDomain, assistantDomain });

	await saveAssistantsTable({ userId: userDomain.id, assistantId: assistantDomain.id, threadId: assistantDomain.threadId });

	logger.info('[END]', 'assistant', 'save');
};
