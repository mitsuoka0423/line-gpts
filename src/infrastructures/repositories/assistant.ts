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
			SELECT id, user_id, assistant_id, created_at, updated_at
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

export const save = async ({ name, lineId, now = new Date() }: { name: string; lineId: string; now: Date }) => {
	logger.info('[START]', 'user', 'createAndUpdate');
	logger.debug({ name, lineId, now });

	const db = getDb();
	await db
		.prepare(
			`
		INSERT INTO users (name, line_id, created_at, updated_at)
		VALUES (?, ?, ?, ?)
		ON CONFLICT (line_id)
		DO UPDATE SET name = ?, updated_at = ?
	`
		)
		.bind(name, lineId, now.toISOString(), now.toISOString(), name, now.toISOString())
		.run();

	logger.info('[END]', 'user', 'createAndUpdate');
};
