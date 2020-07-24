NOTES_PATTERN ?= 'TODO|FIXME|HACK|OPTIMIZE|NOTE'
DISABLES_PATTERN ?= 'eslint-disable'

notes: notes-src notes-unit-tests notes-integration-tests

notes-src:
	@grep --color -Ern $(NOTES_PATTERN) $(SOURCES) || true

notes-unit-tests:
	@grep --color -Ern $(NOTES_PATTERN) $(UNIT_TESTS) || true

notes-integration-tests:
	@grep --color -Ern $(NOTES_PATTERN) $(INTEGRATION_TESTS) || true

disables: disables-src disables-unit-tests disables-integration-tests

disables-src:
	@grep --color -Ern ${DISABLES_PATTERN} $(SOURCES) || true

disables-unit-tests:
	@grep --color -Ern ${DISABLES_PATTERN} $(UNIT_TESTS) || true

disables-integration-tests:
	@grep --color -Ern ${DISABLES_PATTERN} $(INTEGRATION_TESTS) || true

.PHONY: notes notes-src notes-unit-tests notes-integration-tests disables
