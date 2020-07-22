TSC ?= ./node_modules/.bin/tsc
SAPPER ?= ./node_modules/.bin/sapper

dev:
	@tmux \
		new-session '$(TSC) -w' \; \
		split-window -h '$(SAPPER) dev --src $(CORE_DIR) --routes $(ROUTES_DIR)' \;

.PHONY: dev
