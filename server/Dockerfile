FROM golang:1.14-buster AS builder
EXPOSE 8081
WORKDIR /

RUN ls -la
# COPY src/go.mod src/go.sum ./

COPY ./src ./
# RUN ls 
# RUN cd ./src
RUN ls -la 
RUN go mod download -x
# RUN cd ../
RUN go build -v -o /bin/server ./main.go

FROM debian:buster-slim
RUN set -x && apt-get update && \
  DEBIAN_FRONTEND=noninteractive apt-get install -y ca-certificates && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=builder /bin/server ./

CMD ["./server"]