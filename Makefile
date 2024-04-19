local:
	npm run start

deploy:
	npm run deploy

migrate:
	wrangler d1 execute line-gpts-db --local --file=./migration/conversations.sql

migrate-production:
	wrangler d1 execute line-gpts-db --remote --file=./migration/conversations.sql
