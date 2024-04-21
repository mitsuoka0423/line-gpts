import { ClientConfig, Message, messagingApi } from '@line/bot-sdk';
import { logger } from '../../util/logger';

let messagingApiClient: messagingApi.MessagingApiClient | null = null;

export const init = ({ channelAccessToken }: { channelAccessToken: string }) => {
	logger.info('[START]', 'line', 'init');

	const clientConfig: ClientConfig = {
		channelAccessToken,
	};
	messagingApiClient = new messagingApi.MessagingApiClient(clientConfig);

	logger.info('[END]', 'line', 'init');
};

export const replyMessage = async ({ replyToken, messages }: { replyToken: string; messages: Message[] }) => {
	logger.info('[START]', 'line', 'replyMessage');
	logger.debug({ replyToken, messages });

	if (!messagingApiClient) {
		throw new Error('MessagingApiClient が初期化されていません。');
	}

	await messagingApiClient.replyMessage({
		replyToken,
		messages,
	});

	logger.info('[END]', 'line', 'replyMessage');
};

export const getProfile = async ({ userId }: { userId: string }): Promise<messagingApi.UserProfileResponse> => {
	logger.info('[START]', 'line', 'getProfile');
	logger.debug({ userId });

	if (!messagingApiClient) {
		throw new Error('MessagingApiClient が初期化されていません。');
	}

	const profile = await messagingApiClient.getProfile(userId);
	logger.debug({ profile });

	logger.info('[END]', 'line', 'getProfile');

	return profile;
};

export const showLoader = async (lineId: string, loadingSeconds: number) => {
	await messagingApiClient?.showLoadingAnimation({
		chatId: lineId,
		loadingSeconds,
	});
};
