import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://revedo-expert.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---- root ----
def test_root_welcome(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    data = r.json()
    assert "message" in data
    assert "Rêv'dô" in data["message"] or "Rev" in data["message"]


# ---- POST quote-request valid ----
def test_create_quote_request_valid(client):
    payload = {
        "name": "TEST_Jean Dupont",
        "city": "Saint-Pierre",
        "problem_type": "Eau verte / trouble",
        "phone": "+262 692 00 00 00",
        "message": "Test automatique",
    }
    r = client.post(f"{API}/quote-request", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
    assert data["name"] == payload["name"]
    assert data["city"] == payload["city"]
    assert data["problem_type"] == payload["problem_type"]
    assert data["phone"] == payload["phone"]
    assert "_id" not in data


def test_create_quote_request_minimal(client):
    payload = {
        "name": "TEST_Min",
        "city": "Saint-Denis",
        "problem_type": "Panne de pompe",
    }
    r = client.post(f"{API}/quote-request", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["phone"] is None
    assert data["message"] is None


# ---- POST quote-request invalid ----
def test_create_quote_request_missing_fields(client):
    r = client.post(f"{API}/quote-request", json={"name": "TEST_Only"})
    assert r.status_code == 422


def test_create_quote_request_empty_strings(client):
    r = client.post(f"{API}/quote-request", json={"name": "", "city": "", "problem_type": ""})
    assert r.status_code == 422


# ---- GET list ----
def test_list_quote_requests(client):
    # Ensure at least one exists
    client.post(f"{API}/quote-request", json={
        "name": "TEST_List",
        "city": "Saint-Paul",
        "problem_type": "Entretien régulier",
    })
    r = client.get(f"{API}/quote-request")
    assert r.status_code == 200
    items = r.json()
    assert isinstance(items, list)
    assert len(items) >= 1
    for it in items:
        assert "_id" not in it
        assert "id" in it
        assert "name" in it
