import { Message } from '@line/bot-sdk';
import { replyMessage, getProfile } from './apis/line';
import { User } from '../domains/user';
import { logger } from '../util/logger';

export const reply = async (props: { replyToken: string; messages: Message[] }) => {
	await replyMessage(props);
};

export const fetchProfile = async (props: { userId: string }): Promise<User> => {
	logger.info('[START]', 'line', 'fetchProfile');

	const profile = await getProfile(props);
	const user = {
		name: profile.displayName,
		lineId: profile.userId,
	};

	logger.debug({ user });
	logger.info('[END]', 'line', 'fetchProfile');

	return user;
};
