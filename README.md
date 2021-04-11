# Cinema Website

## Building

### GNU/Linux & Mac OSX

make run

You should see the website on [http://localhost:3000](http://localhost:3000).

### Windows

Since this project depends on [GNU Make](https://www.gnu.org/software/make/)
setting it up in Windows is slightly trickier. One possible way is to use the
linux emulating terminal, git bash, which comes with your installation of git by
default. You may also be able to use another bash emulator like
[Cygwin](https://www.cygwin.com/). If you're using
[WSL](https://docs.microsoft.com/en-us/windows/wsl/) then using that is likely
your best option.

[Adding GNU Make to Git Bash on Windows](https://gist.github.com/evanwill/0207876c3243bbb6863e65ec5dc3f058#make)
#### Make variables

Here is an incomplete list of the variables set in make. I've included the ones
you're most likely to override. Overriding is as simple as:

```sh
MY_VARIABLE=value make my_make_target
```

-   `PKG_MANAGER` Defaults to `yarn`. Used for installing/upgrading packages.
-   `PKG_LOCKFILE` Defaults to `yarn.lock`. Package lockfile. Is
    `package-lock.json` for `npm`.

#### Make targets

Here is an incomplete list of the make targets available. I've included the ones
you're most likely to use, but they can all be found in either
[Makefile](Makefile) or [make](make).

##### General [Makefile](Makefile)

-   `make hooks` Sets up pre-commit hooks. Learn more
    [here](https://pre-commit.com/). Requires python with pip.
-   `make node_modules` Installs dependencies from package
-   `make clean` Removes development and testing artifacts.
-   `make upgrade` Upgrades dependencies.
-   `make version.json` Creates a `version.json` file in the root directory,
    which can be read by sapper without including the entirety of
    [package.json](package.json).

##### Notes [make/notes.mk](make/notes.mk)

-   `make notes` Will display the list of todos, fixes, notes etc found in the
    source code, unit tests and integration tests.
-   `make disables` Will show the list of `eslint-disable` rules found in the
    source code, unit tests and integration tests.

##### Tests [make/test.mk](make/test.mk)

-   `make test` Runs `make test-unit` and `make-test-integration` running unit tests and
    integration tests. This also creates a coverage file for both test suites.

##### Build [make/build.mk](make/build.mk)

-   `make build` Builds the sapper project.
-   `make export` Exports the sapper project.
-   `make docker` Builds the docker image defined in
    [docker-compose.yml](docker-compose.yml).

##### Documentation [make/doc.mk](make/doc.mk)

-   `make doc` Generates typescript documentation for any typescript files.

##### Linting [make/lint.mk](make/lint.mk)

-   `make lint` Lints the code using eslint, svelte-check and prettier. Will
    return exit code 1 if any errors are found, which means it can be used in
    the CI pipeline to check code.
-   `make fix` Will attempt to fix any errors and inconsistencies in the source
    files.

##### Development [make/dev.mk](make/dev.mk)

-   `make dev` Runs sapper in development mode.

## :white_check_mark: Tests

### Unit tests

Unit tests are defined in [tests](tests) and are written in typescript for
[jest](https://jestjs.io/).

Jest has been configured through [config/jest.config.js](config/jest.config.js)
to allow for svelte component testing. An example of such a test can be found in
[tests/components/Counter.test.ts](tests/components/Counter.test.ts).

Regular jest tests can also be defined inside the tests folder.

You can learn more about svelte component testing
[here](https://github.com/testing-library/svelte-testing-library).

### Integration tests

Integration tests are defined in [cypress/integration](cypress/integration) and
are written for cypress in typescript. Cypress is configured to use
[config/cypress.json](config/cypress.json) as its configuration file.

You can learn more about cypress [here](https://www.cypress.io/).
