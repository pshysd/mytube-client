declare global {
	interface Error {
		response: {
			status: number;
			data: {};
		};
	}
}
export {};
