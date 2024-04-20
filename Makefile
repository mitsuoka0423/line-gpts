local:
	wrangler dev --persist-to=./persist/line-gpts

remote:
	make deploy

remote-init:
	make migrate-remote
	make deploy

deploy:
	npm run deploy

migrate:
	wrangler d1 execute line-gpts-db --local --file=./migration/conversations.sql
	wrangler d1 execute line-gpts-db --local --file=./migration/users.sql

migrate-remote:
	wrangler d1 execute line-gpts-db --remote --file=./migration/conversations.sql
	wrangler d1 execute line-gpts-db --remote --file=./migration/users.sql
