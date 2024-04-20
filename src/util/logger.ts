const debug = (...args: any[]) => {
	console.log('[DEBUG]', ...args);
};

const info = (...args: any[]) => {
	console.log('[INFO]', ...args);
};

const error = (...args: any[]) => {
	console.error('[ERROR]', ...args);
};

export const loggerFunction = (func: () => {}) => {
  
};

export const logger = { debug, info, error };
