# line-gpts

## Env

### Local

```bash
cp .dev.vars.example .dev.vars
```

### Production
```bash
wrangler secret put LINE_CHANNEL_ACCESS_TOKEN
wrangler secret put OPENAI_API_KEY
```

## Install

```bash
npm i
```

## Local

```bash
make local
```

## Deploy

```bash
make deploy
```

## Architecture

```mermaid
graph LR
	controller -->|event| handlers
	handlers -->|parameters| usecases
	usecases --> |domains| infrastructures
	infrastructures -->|parameters| apis
	apis --> API
	infrastructures -->|parameters| repositories
	repositories --> DB
	DB --> repositories
	repositories -->|entities| infrastructures
	API --> apis
	apis -->|responses| infrastructures
	infrastructures -->|domains| usecases
	usecases -->|message| handlers
	handlers -->|message| controller
```
