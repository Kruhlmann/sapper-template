NOTES_PATTERN ?= 'TODO|FIXME|HACK|OPTIMIZE|NOTE'

notes: notes-src notes-unit-tests notes-integration-tests

notes-src:
	@grep --color -Ern $(NOTES_PATTERN) $(SOURCES) || true

notes-unit-tests:
	@grep --color -Ern $(NOTES_PATTERN) $(UNIT_TESTS) || true

notes-integration-tests:
	@grep --color -Ern $(NOTES_PATTERN) $(INTEGRATION_TESTS) || true

.PHONY: notes notes-src notes-unit-tests notes-integration-tests
