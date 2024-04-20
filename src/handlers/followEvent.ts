import { FollowEvent } from '@line/bot-sdk';
import { logger } from '../util/logger';
import { execute } from '../usecases/registerUser';

export const handle = async (followEvent: FollowEvent) => {
	logger.info('[START]', 'followEventHandler', 'handle');
	logger.debug({ followEvent });

	const userId = followEvent.source.userId;
	if (!userId) {
		logger.error('userId の取得に失敗しました。');
		logger.error({ followEvent });
		throw new Error('userId の取得に失敗しました。');
	}

	await execute({ userId });

	logger.info('[END]', 'followEventHandler', 'handle');
};
