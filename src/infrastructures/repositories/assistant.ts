import { Assistant } from './entities/assistant';
import { logger } from '../../util/logger';
import { getDb } from './db';

export const list = async (userId: number, limit: number = 5): Promise<{ assistants: Assistant[] }> => {
	logger.info('[START]', 'user', 'list');
	logger.debug({ userId, limit });

	const db = getDb();
	const result = await db
		.prepare(
			`
			SELECT id, user_id, assistant_id, thread_id, created_at, updated_at
			FROM assistants
			WHERE user_id = ?
			ORDER BY id DESC
			LIMIT ?
		`
		)
		.bind(userId, limit)
		.all<Assistant>();

	const assistants = result.results;
	logger.debug({ assistants });

	logger.info('[END]', 'assistant', 'list');

	return { assistants };
};

export const save = async ({
	userId,
	assistantId,
	threadId,
	now = new Date(),
}: {
	userId: number,
	assistantId: string;
	threadId: string;
	now?: Date;
}) => {
	logger.info('[START]', 'assistant', 'createAndUpdate');
	logger.debug({ userId, assistantId, threadId, now });

	const db = getDb();
	await db
		.prepare(
			`
			INSERT INTO assistants (user_id, assistant_id, thread_id)
			VALUES (?, ?, ?)
			`
		)
		.bind(userId, assistantId, threadId)
		.run();

	logger.info('[END]', 'assistant', 'createAndUpdate');
};
