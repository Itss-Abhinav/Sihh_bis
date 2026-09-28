import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["standards_count"] > 0

def test_classify_power_bank():
    payload = {
        "product_name": "Smart Lithium-ion Power Bank 20000mAh",
        "description": "Portable USB charger with rechargeable lithium battery pack"
    }
    response = client.post("/api/classify", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "IS 16046" in data["top_match"]["standard"]["is_code"]
    assert data["top_match"]["confidence_score"] > 70
    assert data["top_match"]["mandatory_qco"] is True
    assert data["top_match"]["applicable_scheme"] == "Scheme-II (CRS)"

def test_classify_water_heater():
    payload = {
        "product_name": "Electric Immersion Water Heater 1500W",
        "description": "Portable heating rod with copper heating element"
    }
    response = client.post("/api/classify", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "IS 302" in data["top_match"]["standard"]["is_code"]
    assert data["top_match"]["applicable_scheme"] == "Scheme-I (ISI Mark)"

def test_list_standards():
    response = client.get("/api/standards")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 5

def test_laboratories():
    response = client.get("/api/laboratories")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 3

def test_chat_assistant():
    payload = {"message": "What is the penalty for selling without ISI mark under BIS Act?"}
    response = client.post("/api/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "Section 29" in data["reply"]
