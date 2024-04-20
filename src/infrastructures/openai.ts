import { Assistant } from '../domains/assistant';
import { User } from '../domains/user';
import { logger } from '../util/logger';
import { filterAssistantsById } from './apis/openai';
import { list } from './repositories/assistant';
import { findByLineId } from './repositories/user';

export const fetchAssistantsByUser = async (userDomain: User): Promise<Assistant[]> => {
	logger.info('[START]', 'openai', 'fetchAssistantsByUser');
	logger.debug({ userDomain });

	const userEntity = (await findByLineId(userDomain.lineId)).user;
	const assistantEntities = (await list(userEntity.id)).assistants;
	const assistantIds = assistantEntities.map((assistantEntity) => assistantEntity.assistant_id);
	const assistantResponses = await filterAssistantsById({ assistantIds });

	const assistantDomains = assistantResponses.map((assistant): Assistant => {
		return {
			name: assistant?.name || 'No name',
			instructions: assistant?.instructions || 'No instructions',
			tools: [], // TODO: 実装
			model: assistant?.model || 'No model',
		};
	});

	logger.debug({ assistantDomains });
	logger.info('[END]', 'openai', 'fetchAssistantsByUser');

	return assistantDomains;
};
