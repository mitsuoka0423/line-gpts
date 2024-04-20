import { User as UserDomain} from '../domains/user';
import { User as UserTable } from '../types/tables';
import { logger } from '../util/logger';
import { getDb } from './db';

export const list = async (limit: number = 5): Promise<{ users: UserTable[] }> => {
	logger.info('[START]', 'user', 'list');

	const db = getDb();
	const result = await db
		.prepare(
			`
			SELECT id, name, line_id, created_at, updated_at
			FROM users
			ORDER BY id DESC
			LIMIT ?
		`
		)
		.bind(limit)
		.all<UserTable>();

	const users = result.results;

	logger.debug({ result });
	logger.info('[END]', 'user', 'list');

	return { users };
};

export const save = async (user: UserDomain) => {
	logger.info('[START]', 'user', 'createAndUpdate');
	logger.debug({ user });

	const now = new Date();
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
		.bind(user.name, user.lineId, now.toISOString(), now.toISOString(), user.name, now.toISOString())
		.run();

	logger.info('[END]', 'user', 'createAndUpdate');
};
