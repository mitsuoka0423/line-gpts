import { getProfile } from "../apis/line";
import { save } from "../repositories/user";
import { logger } from "../util/logger";

export const execute = async ({ userId }: { userId: string }) => {
	logger.info('[START]', 'registerUser', 'execute');

	const user = await getProfile({ userId });
	await save(user);

	logger.info('[END]', 'registerUser', 'execute');
};
