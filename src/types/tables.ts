export type Conversation = {
	id: number;
	my_message: string;
	bot_message: string;
};

export type User = {
	id: number;
	name: string;
	line_id: string;
	assistant?: string;
	created_at: string;
	updated_at: string;
};
