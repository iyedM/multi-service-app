# 🚀 Multi-Service App — DevOps Cloud Project

A production-ready multi-service application featuring a Next.js frontend, Node.js backend, and Nginx reverse proxy, all containerized with Docker and automated with GitHub Actions.

## 🏗 Architecture

```
       [ Client ]
           │
           ▼
    [ Nginx Proxy ] (Port 80)
    /             \
   ▼               ▼
[ Frontend ]    [ Backend ]
(Next.js:3000)  (Node:5000)
```

## 📂 Project Structure

- `frontend/`: Next.js 14 application (App Router, TS, Tailwind).
- `backend/`: Node.js Express REST API.
- `nginx/`: Reverse proxy configuration.
- `.github/workflows/`: CI/CD pipeline definition.

## 🛠 Local Setup

1. **Prerequisites**:
   - Docker & Docker Compose
   - Node.js 20+ (for local development)

2. **Clone and Initialize**:
   ```bash
   git clone <your-repo-url>
   cd multi-service-app
   cp .env.example .env
   ```

3. **Run with Docker Compose**:
   ```bash
   make dev
   ```
   The app will be available at `http://localhost`.

4. **Verify API**:
   - Health check: `http://localhost/api/health`
   - Items API: `http://localhost/api/items`

## 🧪 Testing

Run backend tests:
```bash
make test
```

## 🚀 Deployment (CI/CD)

The project includes a GitHub Actions pipeline that automates:
1. **Testing**: Runs Jest tests on backend.
2. **Building**: Builds Docker images for all services.
3. **Pushing**: Pushes images to Docker Hub.
4. **Deploying**: SSH into your VPS and restarts the services.

### GitHub Secrets Configuration

| Secret | Description |
|---|---|
| `DOCKER_USERNAME` | Your Docker Hub username |
| `DOCKER_PASSWORD` | your Docker Hub Access Token |
| `SSH_HOST` | VPS IP address |
| `SSH_USER` | SSH user (e.g., ubuntu) |
| `SSH_PRIVATE_KEY` | Your SSH private key |

### Server Setup (VPS)

1. **Install Docker**:
   ```bash
   curl -fsSL https://get.docker.com | sh
   sudo usermod -aG docker $USER
   ```
2. **Repo Setup**:
   ```bash
   git clone <your-repo-url> ~/multi-service-app
   cd ~/multi-service-app
   cp .env.example .env
   ```

## 🛠 Troubleshooting

- **CORS Issues**: Ensure the backend has `cors()` middleware enabled.
- **Nginx Config**: If the site doesn't load, check the container logs: `make logs`.
- **HMR**: WebSocket support is included in `nginx.conf` for Next.js hot-reloading.
