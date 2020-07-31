SAPPER ?= ./node_modules/.bin/sapper

build: __sapper__/build

export: __sapper__/export

__sapper__/build: version.json node_modules clean
	@$(SAPPER) build --legacy --src $(CORE_DIR) --routes $(ROUTES_DIR)

__sapper__/export: version.json node_modules clean
	@$(SAPPER) export --src $(CORE_DIR) --routes $(ROUTES_DIR)

docker:
	@docker-compose build

.PHONY: __sapper__/build docker
