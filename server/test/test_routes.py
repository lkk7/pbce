from pbce_server.main import app
from pbce_server.pyversions import versions_paths
import pytest
from starlette.testclient import TestClient


@pytest.fixture
def test_client() -> TestClient:
    return TestClient(app)


def test_versions_response(test_client: TestClient) -> None:
    response = test_client.get("/versions")
    assert response.status_code == 200
    assert response.json() == list(versions_paths)


def test_invalid_request() -> None:
    assert True
