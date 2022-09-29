#!/bin/bash
TEST=1 poetry run coverage run -m pytest test
poetry run coverage lcov
