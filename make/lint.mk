ESLINT ?= ./node_modules/.bin/eslint
SVELTE_CHECK ?= ./node_modules/.bin/svelte-check
PRETTIER ?= ./node_modules/.bin/prettier
PRE_COMMIT ?= $(shell which pre-commit)

lint: node_modules
	@$(PRETTIER) --check $(SRC_DIR)
	@$(ESLINT) -c .eslintrc.js $(SRC_DIR) --no-error-on-unmatched-pattern
	@$(SVELTE_CHECK)

fix: node_modules
	@$(PRETTIER) --write $(SRC_DIR)
	@$(ESLINT) -c .eslintrc.js $(SRC_DIR) --no-error-on-unmatched-pattern --fix || true
	@$(PRE_COMMIT) run
