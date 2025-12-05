[![JavaScript](https://img.shields.io/badge/javascript-ES6-yellow?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![React](https://img.shields.io/badge/react-19.2.0-blue?style=flat-square)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/next-16.0.3-black?style=flat-square)](https://nextjs.org/)
[![License](https://img.shields.io/badge/license-GPL%203.0-blue.svg)](LICENSE)


# Whoops-UI

Whoops-UI is a self-hosted React app that lets you visualize your Whoop metrics in the browser, create your own charts and dashboards.

You can choose to pull data directly from Whoop or from your self-hosted [Whoops](https://github.com/kryoseu/whoops).

All your data stays private.

## Features:
- Visualize your Whoop metrics with interactive charts.
- Create your own dashboards or use the pre-defined ones.
- Choose data source: Whoop API or Whoops.

> [!TIP]
> Some data types, like Cycles, are limited in the Whoop API (only the latest 10 results). Using [Whoops](https://github.com/kryoseu/whoops) lets you retain a much larger history, since it exports and stores your data daily in a private database.


## Requirements
- Docker (or a Kubernetes cluster)
  
Only one of the below is required:
- A Whoop API **Client ID** and **Client Secret** from the [Whoop Developer Dashboard](https://developer-dashboard.whoop.com/).
- The URL of your Whoops. 


# Getting Started
See [templates](https://github.com/kryoseu/whoops-ui/tree/main/templates) for Docker and Kubernetes examples. 

## With Docker
Using Docker compose:
```yaml
services:
  whoops:
    image: ghcr.io/kryoseu/whoops-ui:latest
    container_name: whoops-ui
    ports:
      - "3000:3000"
    environment:
      WHOOPS_URL: "https://localhost:5000"                            # required if using Whoops as data source
      WHOOP_CLIENT_ID: ""                                             # required if using Whoop as data source
      WHOOP_CLIENT_SECRET: ""                                         # required if using Whoop as data source
      WHOOP_REDIRECT_URI: "http://localhost:3000/api/whoop/callback"  # required if using Whoop as data source
    volumes:
      - /path/to/config:/app/config   # use a valid path to store your dashboards
    restart: unless-stopped
```
or Docker run:

```bash
docker run --name whoops-ui \
  -e WHOOPS_URL="https://localhost:5000" \
  -e WHOOP_CLIENT_ID="" \
  -e WHOOP_CLIENT_SECRET="" \
  -e WHOOP_REDIRECT_URI="http://localhost:3000/api/whoop/callback" \
  -p 3000:3000 \
  -v /path/to/config:/app/config \
  --restart unless-stopped \
  ghcr.io/kryoseu/whoops-ui:latest
```

> [!IMPORTANT]
> The redirect URL configured for your Whoops-UI app must match the URL where Whoops-UI will run (e.g., `http://localhost:3000/api/whoop/callback`).

## From Source

Clone the repository:
```
git clone git@github.com:kryoseu/whoops-ui.git
```

Install dependencies and build for production:
```
pnpm install
pnpm build
```

Run server:
```
pnpm start
```

# Usage

1. Navigate to [http://localhost:3000/](http://localhost:3000/).
2. Select source of your data, Whoop or Whoops.
3. See your metrics, create your charts and dashboards!









