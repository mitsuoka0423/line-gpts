local:
	wrangler dev

remote:
	wrangler deploy

migrate:
	wrangler d1 execute line-gpts-db --local --file="./migration/assistants.sql"
	wrangler d1 execute line-gpts-db --local --file="./migration/users.sql"

migrate-remote:
	wrangler d1 execute line-gpts-db --remote --file="./migration/assistants.sql"
	wrangler d1 execute line-gpts-db --remote --file="./migration/users.sql"

query:
	wrangler d1 execute line-gpts-db --local --command "SELECT * FROM users"
	wrangler d1 execute line-gpts-db --local --command "SELECT * FROM assistants"

query-remote:
	wrangler d1 execute line-gpts-db --remote --command "SELECT * FROM users"
	wrangler d1 execute line-gpts-db --remote --command "SELECT * FROM assistants"
