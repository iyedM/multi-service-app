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
