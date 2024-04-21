import { User } from '../domains/user';
import { create } from '../infrastructures/assistant';
import { save as saveAssistants } from '../infrastructures/assistant';
import { fetchProfile } from '../infrastructures/line';
import { findByLineId, save as saveUserTable } from '../infrastructures/repositories/user';
import { logger } from '../util/logger';

export const execute = async ({ lineId }: { lineId: string }) => {
	logger.info('[START]', 'registerUser', 'execute');
	logger.debug({ lineId });

	// TODO: Domain で書き換え
	const profile = await fetchProfile({ userId: lineId });
	await saveUserTable({ name: profile.name, lineId: lineId });
	const userEntity = (await findByLineId(lineId)).user;

	const user: User = {
		id: userEntity.id,
		name: profile.name,
		lineId: profile.lineId,
	};

	const assistant = await create(user);

	await saveAssistants({ userDomain: user, assistantDomain: assistant });

	logger.info('[END]', 'registerUser', 'execute');
};
