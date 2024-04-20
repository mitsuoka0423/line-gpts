export interface Assistant {
	id: string;
	name: string;
	instructions: string;
	tools: [];
	model: string;
}
