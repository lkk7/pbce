from os import getenv
from os.path import isfile


def _load_pyversions() -> dict[str, str]:
    is_test_env = getenv("TEST") == "1"
    pyversions_path: str | None = ""

    # PYVERSIONS_PATH environment variable is used to locate all Python versions
    if not is_test_env and ((pyversions_path := getenv("PYVERSIONS_PATH")) is None):
        raise Exception("No PYVERSIONS_PATH environment variable specified")
    # Read all available Python versions into a dict used by the server
    with open(".pyversions", "r") as file:
        version_keys = [ver.rstrip() for ver in file.readlines()]
        versions_paths = dict(
            zip(
                version_keys,
                (f"{pyversions_path}/{version}/bin/python" for version in version_keys),
            )
        )
    # Preemptively check if every Python version really exists - do not start otherwise
    if not is_test_env:
        for ver in versions_paths:
            path = f"{pyversions_path}/{ver}/bin/python"
            if not isfile(path):
                raise Exception(f"file not found but declared in .pyversions: {path}")

    return versions_paths


versions_paths = _load_pyversions()
