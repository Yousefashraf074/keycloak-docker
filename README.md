# 🧠 Keycloak-Docker Microservices Project

A microservices-based system demonstrating the integration of **IAM**, **ESB**, **Payment**, **Messaging**, and **Event-driven architecture (Publish–Subscribe)** using **Docker**, **Kafka**, **RabbitMQ**, and **Keycloak**.

---

## ⚙️ Project Overview

This project simulates an **e-commerce-like workflow** using two Node.js microservices:
1. **Order Service** – Publishes new order events.
2. **Payment Service** – Listens for order events, processes payments, and emits payment confirmations.

The infrastructure is containerized using **Docker Compose** and includes:
- **Keycloak** → for IAM (Identity and Access Management)
- **Kafka** → for Messaging and Event Streaming (Publish–Subscribe)
- **RabbitMQ** → as an ESB (Enterprise Service Bus)
- **Zookeeper** → manages Kafka brokers

---

## 🧩 Architecture

                     +-----------------------------------+
                     |  Keycloak (IAM)                   |
                     |  Authentication & Authorization   |
                     +-----------------------------------+

---

## 🧰 Technologies Used

| Component | Description |
|------------|--------------|
| **Node.js** | Microservices implementation |
| **KafkaJS** | Node.js client for Kafka |
| **Docker Compose** | Container orchestration |
| **Kafka + Zookeeper** | Event streaming backbone |
| **RabbitMQ** | Message broker (ESB role) |
| **Keycloak** | Identity & Access Management (IAM) |

---

## 🚀 How to Run

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Yousefashraf074/keycloak-docker.git
cd keycloak-docker

👨‍💻 Author
Yousef Ashraf
Engineering Student – DevOps & Cloud Enthusiast
GitHub: @Yousefashraf074
