export interface Assistant {
	id: string;
	name: string;
	instructions: string;
	tools: [];
	model: string;
	threadId: string; // TODO Thread ドメインと二重管理になってるので解消する
}
