SRC_DIR ?= src
ROUTES_DIR ?= src/routes
CORE_DIR ?= src/core
VERSION ?= $(shell git describe --always --tag)
PKG_MANAGER ?= yarn
PKG_LOCKFILE ?= yarn.lock
TARGET ?= local

TS_SOURCES ?= $(shell find "$(SRC_DIR)" -type f -name '*.ts')
JS_SOURCES ?= $(shell find "$(SRC_DIR)" -type f -name '*.js')
SVELTE_SOURCES ?= $(shell find "$(SRC_DIR)" -type f -name '*.svelte')
SCSS_SOURCES ?= $(shell find "$(SRC_DIR)" -type f -name '*.scss')
SOURCES ?= $(shell find "$(SRC_DIR)" -type f -name '*.ts' -o -name '*.js' -o -name '*.svelte' -o -name '*.scss')
INTEGRATION_TESTS ?= $(shell find 'tests/integration' -type f -name '*.ts' -o -name '*.js')
UNIT_TESTS ?= $(shell find 'tests/components' -type f -name '*.test.js' -o -name '*.test.ts')

CONFIG_DIR ?= config
SCRIPTS_DIR ?= scripts

include make/notes.mk
include make/test.mk
include make/build.mk
include make/doc.mk
include make/lint.mk
include make/dev.mk

hooks: node_modules
	@which pre-commit 1>/dev/null || pip install pre-commit
	@pre-commit install

run: __sapper__/build node_modules
	@node __sapper__/build

clean:
	@rm -rf \
		test-report.xml \
		yarn-error.log \
		coverage/ \
		doc/ \
		__sapper__ \
		src/*.js \
		src/routes/helpers/*.js \
		src/lib/*.js

node_modules: package.json
	@$(PKG_MANAGER) install

version.json: force
	@printf '{\n    "version": "$(VERSION)"\n}\n' > version.json

upgrade: node_modules
	@$(PKG_MANAGER) upgrade

force:

.PHONY: clean upgrade hooks force
