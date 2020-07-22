TYPEDOC ?= ./node_modules/.bin/typedoc

doc: clean
	@$(TYPEDOC) --out doc/ --mode modules $(SRC_DIR)
