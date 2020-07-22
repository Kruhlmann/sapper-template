TSC ?= ./node_modules/.bin/tsc
SAPPER ?= ./node_modules/.bin/sapper

build: __sapper__/build

__sapper__/build: version.json node_modules clean
	@$(TSC)
	@$(SAPPER) build --src $(CORE_DIR) --routes $(ROUTES_DIR)

docker:
	@docker-compose build

.PHONY: __sapper__/build docker
