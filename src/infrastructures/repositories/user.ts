import { User as UserDomain } from '../../domains/user';
import { User as UserEntity } from './entities/user';
import { logger } from '../../util/logger';
import { getDb } from './db';

export const findByLineId = async (lineId: string): Promise<{ user: UserEntity }> => {
	logger.info('[START]', 'user', 'findByLineId');
	logger.debug({ lineId });

	const db = getDb();
	const user = await db
		.prepare(
			`
			SELECT id, name, line_id, created_at, updated_at
			FROM users
			WHERE line_id = ?
			ORDER BY id DESC
			LIMIT 1
		`
		)
		.bind(lineId)
		.first<UserEntity>();

	if (!user) {
		logger.error('ユーザーが見つかりません');
		logger.error({ lineId });
		throw new Error('ユーザーが見つかりません');
	}

	logger.debug({ user });
	logger.info('[END]', 'user', 'findByLineId');

	return { user };
};

export const list = async (limit: number = 5): Promise<{ users: UserDomain[] }> => {
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
		.all<UserEntity>();

	const userEntities = result.results;
	logger.debug({ userEntities });

	const userDomains = userEntities.map((userEntity): UserDomain => {
		return {
			id: userEntity.id,
			name: userEntity.name,
			lineId: userEntity.line_id,
		};
	});

	logger.info('[END]', 'user', 'list');

	return { users: userDomains };
};

export const save = async ({ name, lineId, now = new Date() }: { name: string; lineId: string; now?: Date }) => {
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
