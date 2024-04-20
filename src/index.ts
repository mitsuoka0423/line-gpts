import { Hono } from 'hono';
import { post } from './controllers/webhook';
import { get } from './controllers/users';

const app = new Hono();

app.get('/users', get);
app.get('*', (c) => c.text('Hello World!'));
app.post('/api/webhook', post);

export default app;
