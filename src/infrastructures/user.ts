import { User } from '../domains/user';
import { logger } from '../util/logger';
import { findByLineId } from './repositories/user';

export const fetchByLineId = async (lineId: string): Promise<User> => {
	logger.info('[START]', 'user', 'fetchByLineId');
	logger.debug({ lineId });
	const userEntitiy = (await findByLineId(lineId)).user;

	logger.info('[START]', 'user', 'fetchByLineId');

	const user = {
		name: userEntitiy.name,
		lineId: userEntitiy.line_id,
	};

	logger.debug({ user });

	return user;
};
