TSC ?= ./node_modules/.bin/tsc
SAPPER ?= ./node_modules/.bin/sapper

dev: node_modules
	@$(SAPPER) dev --src $(CORE_DIR) --routes $(ROUTES_DIR)

.PHONY: dev
