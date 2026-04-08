dev:
	docker compose up --build

down:
	docker compose down

logs:
	docker compose logs -f

test:
	cd backend && npm test

push:
	git add . && git commit -m "deploy" && git push

push-images:
	@TAG=v$$(date +%Y%m%d%H%M) && \
	docker build -t iyedmh/ms-backend:latest -t iyedmh/ms-backend:$$TAG ./backend && \
	docker build -t iyedmh/ms-frontend:latest -t iyedmh/ms-frontend:$$TAG ./frontend && \
	docker build -t iyedmh/ms-nginx:latest -t iyedmh/ms-nginx:$$TAG ./nginx && \
	docker push iyedmh/ms-backend:latest && \
	docker push iyedmh/ms-backend:$$TAG && \
	docker push iyedmh/ms-frontend:latest && \
	docker push iyedmh/ms-frontend:$$TAG && \
	docker push iyedmh/ms-nginx:latest && \
	docker push iyedmh/ms-nginx:$$TAG
