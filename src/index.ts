import { Hono } from 'hono';
import { post } from './controllers/webhook';
import { get } from './controllers/users';
import { init } from './middlewares/init';
import { User } from './types/tables';

type Bindings = {
	DB: D1Database;
	LINE_CHANNEL_ACCESS_TOKEN: string;
	OPENAI_API_KEY: string;
};

const app = new Hono<{ Bindings: Bindings }>();

app.use(init);

app.get('/users', get);
app.get('*', (c) => c.text('Hello World!'));
app.post('/api/webhook', post);

export default app;
