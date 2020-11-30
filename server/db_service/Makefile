.DEFAULT_GOAL := default

run:
	go run cmd/main.go
build:
	go build -v -o . ./cmd/main.go

test:
	go test -v ./...

docker_build:
	docker build -f deployments/Dockerfile -t testimage .
docker_run:
	docker build -f deployments/Dockerfile -t testimage .
	docker run --rm -p 8081:8081 testimage

default: run