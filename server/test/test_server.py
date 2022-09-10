import unittest

from pbce_server.pyversions import available_versions
from pbce_server.server import app
from starlette.testclient import TestClient


class TestServerResponses(unittest.TestCase):
    def test_versions_response(self) -> None:
        client = TestClient(app)
        response = client.get("/versions")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), available_versions)


unittest.main()
