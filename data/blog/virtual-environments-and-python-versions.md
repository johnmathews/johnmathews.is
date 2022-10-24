---
title: Virtual environments and python versions
slug: virtual-environments-and-python-versions
date: "2021-11-01 16:09:14"
category: Technical>Developer-Tools
tags: ["python", "pyenv", "virtualenv", "virtual-environment"]
---

Contents:
<TOCInline toc={props.toc} exclude="Overview" toHeading={2} />

# Recipe

## Create and activate a new virtualenv

- `pyenv versions` or `pyenv install -l` - list available versions
- **`pyenv virtualenv <python version> <environment name>`**
- **`pyenv local <environment name>`**
  - this creates a `.python-version` file in the current directory
  - the environment will be automatically activated and deactivated because `eval "$(pyenv virtualenv-init -)"` is in the `.zshrc` file.
- `python -V`
- `python -m test`

If you did not configure `eval "$(pyenv virtualenv-init -)"` to run in your shell then

- `pyenv activate <environment name>`
- `pyenv deactivate`

# Background

- `pyenv` manages multiple versions of Python itself.
- `virtualenv/venv` manages virtual environments for a specific Python version.
- `pyenv-virtualenv` is a pyenv plugin that plays nicely with `virtualenv`. It manages virtual environments across varying versions of Python.
- `python -V` - shows which python version is currently being used.
- `which python` - shows the path or location of the current python.

# Python versions

## Installing new python versions

- `pyenv install --list | grep " 3\.9\."` - list versions
- `pyevn install <name>` - install a new version
- pyenv python versions are installed at `~/.pyenv/versions/`
- You can uninstall a pyenv python version by
  - `rm -rf ..` the subdir in `~/.pyenv/versions/...`
  - `pyenv uninstall <name>`

## Set a particular python version

- `pyenv versions` - list available versions
- `pyenv global <name>` - set system default python version
- `pyenv global system` - back to how things were before pyenv
- `pyenv local <name>` - set default version for this current dir
- this creates a `.python-version` file in the current directory. If pyenv is
  active in your environment then the version specified in this file will be
  activated

## Other commands

- `pyenv uninstall <version>`
- `pyenv rehash` - run after installing a new version, or install a package
  that provides binaries

[source](https://github.com/pyenv/pyenv/blob/master/COMMANDS.md)

## Tests

- `python -m test` - run some tests to be confident everything is ok

## Source

[Real Python article](https://realpython.com/intro-to-pyenv/)

# Code editor integration using `activate_this.py`

So that code editors like vim can respond to the currently active virtual
environment and update `path`, `sys.path` and `sys.prefix` (for example when
running Django test suites) virtualenv uses `activate_this.py`
to make these changes.

For some reason it isn't available on my setup, so here is a copy I found
somewhere. It's different to the version hosted on the
[virtualenv
repo](https://github.com/pypa/virtualenv/blob/main/src/virtualenv/activation/python/activate_this.py)
and I haven't looked at why yet. Copy paste the version below into `~/.pyenv/versions/<version>/envs/<environment name>/bin/activate_this.py`

**activate_this.py**

```Python
# -*- coding: utf-8 -*-
# https://github.com/pypa/virtualenv/blob/main/src/virtualenv/activation/python/activate_this.py

"""Activate virtualenv for current interpreter:
Use exec(open(this_file).read(), {'__file__': this_file}).
This can be used when you must use an existing Python interpreter, not the virtualenv bin/python.
"""
import os
import site
import sys

try:
    abs_file = os.path.abspath(__file__)
except NameError:
    raise AssertionError("You must use exec(open(this_file).read(), {'__file__': this_file}))")

bin_dir = os.path.dirname(abs_file)
base = bin_dir[: -len("__BIN_NAME__") - 1]  # strip away the bin part from the __file__, plus the path separator

# prepend bin to PATH (this file is inside the bin directory)
os.environ["PATH"] = os.pathsep.join([bin_dir] + os.environ.get("PATH", "").split(os.pathsep))
os.environ["VIRTUAL_ENV"] = base  # virtual env is right above bin directory

# add the virtual environments libraries to the host python import mechanism
prev_length = len(sys.path)
for lib in "__LIB_FOLDERS__".split(os.pathsep):
    path = os.path.realpath(os.path.join(bin_dir, lib))
    site.addsitedir(path.decode("utf-8") if "__DECODE_PATH__" else path)
sys.path[:] = sys.path[prev_length:] + sys.path[0:prev_length]

sys.real_prefix = sys.prefix
sys.prefix = base
```
