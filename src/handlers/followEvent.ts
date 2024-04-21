import { FollowEvent } from '@line/bot-sdk';
import { logger } from '../util/logger';
import { execute } from '../usecases/registerUser';

export const handle = async (followEvent: FollowEvent) => {
	logger.info('[START]', 'followEventHandler', 'handle');
	logger.debug({ followEvent });

	const lineId = followEvent.source.userId;
	if (!lineId) {
		logger.error('lineId の取得に失敗しました。');
		logger.error({ followEvent });
		throw new Error('lineId の取得に失敗しました。');
	}

	await execute({ lineId });

	logger.info('[END]', 'followEventHandler', 'handle');
};
