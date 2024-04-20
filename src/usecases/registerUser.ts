import { fetchProfile } from '../infrastructures/line';
import { save } from '../infrastructures/repositories/user';
import { logger } from '../util/logger';

export const execute = async ({ userId }: { userId: string }) => {
	logger.info('[START]', 'registerUser', 'execute');

	const profile = await fetchProfile({ userId });
	await save({ name: profile.name, lineId: userId });

	logger.info('[END]', 'registerUser', 'execute');
};
