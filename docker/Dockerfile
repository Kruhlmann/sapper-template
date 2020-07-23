FROM alpine:latest

WORKDIR /usr/app
RUN apk add --no-cache nodejs yarn make git
COPY . .
RUN make node_modules
RUN make build
EXPOSE 3000
ENTRYPOINT ["node", "__sapper__/build"]
