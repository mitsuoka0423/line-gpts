import { D1Database } from '@cloudflare/workers-types';
import { logger } from '../util/logger';

let db: D1Database | null = null;

export const init = ({ database }: { database: D1Database }) => {
	db = database;
};

export const getDb = (): D1Database => {
	logger.info('[START]', 'db', 'getDb');
	logger.debug({ db });
	if (!db) {
		throw new Error('データベースが初期化されていません');
	}
	logger.info('[END]', 'db', 'getDb');

	return db;
};
