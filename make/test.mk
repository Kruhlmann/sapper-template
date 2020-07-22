CYPRESS ?= ./node_modules/.bin/cypress
JEST ?= ./node_modules/.bin/jest

test: test-unit test-integration

test-integration: integration-report.xml

test-unit: test-report.xml

coverage test-report.xml: $(UNIT_TESTS) clean
	@$(JEST) -c jest.config.js

integration-report.xml: $(INTEGRATION_TESTS) node_modules __sapper__/build
	@scripts/integration_test $(CYPRESS)

.PHONY: test test-integration test-unit
