CYPRESS ?= ./node_modules/.bin/cypress
JEST ?= ./node_modules/.bin/jest

test: test-unit test-integration

test-integration: integration-report.xml

test-unit: test-report.xml

test-report.xml: $(UNIT_TESTS) clean
	@$(JEST) --verbose --config $(CONFIG_DIR)/jest.config.js

integration-report.xml: $(INTEGRATION_TESTS) node_modules __sapper__/build
	@$(SCRIPTS_DIR)/integration_test $(CYPRESS) $(CONFIG_DIR)/cypress.json

.PHONY: test test-integration test-unit
