![Vikas Kumar · Spring Boot backend developer](https://raw.githubusercontent.com/vikas575/vikas575/main/assets/profile-cover.webp)

I build backend services with **Java, Spring Boot and MySQL**. I study Computer Science and Engineering at Symbiosis Institute of Technology, Pune (class of 2028), and I’m looking for a software development internship. [Connect on LinkedIn](https://www.linkedin.com/in/vikas-kumar-5759b01aa/)

## Secure Audit & Logging System

What happens if an admin tries to remove the last admin account? In our four-person team’s audit system, the database itself guards against it. I designed the MySQL schema and wrote the triggers and stored procedures behind the Java/JDBC service.

![My contribution to the database layer: 6 tables, 4 triggers, and 5 stored procedures.](https://raw.githubusercontent.com/vikas575/vikas575/main/assets/audit-system.webp)

I also led testing for sign-in, sessions and permissions. That included verifying access for the admin, analyst and user roles.

## [Payment Truth](https://github.com/vikas575/razorpay_build_aithon)

A payment capture can reach a merchant before the authorization that made it possible. Payment Truth rebuilds the timeline using event timestamps, then flags mismatches between payment and order records.

| What the merchant receives | What happened |
| --- | --- |
| Captured → Authorized | Authorized → Captured |

[Read the regression test](https://github.com/vikas575/razorpay_build_aithon/blob/main/backend/tests/test_state_machine.py) · [Inspect the benchmark for 10,000 simulated payments](https://github.com/vikas575/razorpay_build_aithon/blob/main/backend/evaluation/reports/benchmark_10000.json)

## Other work

| Project | Inside the project |
| --- | --- |
| **Vedology** | I prepared source texts and generated multilingual embeddings for FAISS search. Our chatbot returns verses with transliterations and citations. I presented it at SIT Pune’s Industry Conclave. |
| **[Aegis](https://github.com/vikas575/aegis)** | A financial AI agent requests an action. The service checks its permissions and spending limits, then logs the decision. [Policy evaluator](https://github.com/vikas575/aegis/blob/main/backend/policy_engine.py) |
| **[Customer Support OpenEnv](https://github.com/vikas575/scaler_hackathon)** | An evaluation environment that scores AI agents on ticket classification, reply quality and escalation decisions. [Scoring rules](https://github.com/vikas575/scaler_hackathon/blob/main/src/task_graders.py) |
