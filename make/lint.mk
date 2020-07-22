ESLINT ?= ./node_modules/.bin/eslint
PRETTIER ?= ./node_modules/.bin/prettier
PRE_COMMIT ?= $(shell which pre-commit)

lint: node_modules
	@$(PRETTIER) --check $(SRC_DIR)
	@$(ESLINT) -c .eslintrc.json $(SRC_DIR) --ext .ts --no-error-on-unmatched-pattern

fix: node_modules
	@$(PRETTIER) --write $(SRC_DIR)
	@$(ESLINT) -c .eslintrc.json $(SRC_DIR) --ext .ts --no-error-on-unmatched-pattern --fix
	@$(PRE_COMMIT) run
