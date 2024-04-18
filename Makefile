local:
	supabase start

deploy:
	supabase functions deploy line-bot --no-verify-jwt
