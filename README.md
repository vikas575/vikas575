# Hi, I'm Vikas

I'm a backend developer working with **Spring Boot**. I'm interested in how services handle late events, enforce spending limits, and explain their decisions.

## Selected projects

### [Payment Truth](https://github.com/vikas575/razorpay_build_aithon)

What happens when a payment capture notification arrives before its authorization? This reconciliation prototype uses event timestamps to reconstruct the payment timeline and flags disagreements between payment and order records.

[Out-of-order event test](https://github.com/vikas575/razorpay_build_aithon/blob/main/backend/tests/test_state_machine.py) · [Benchmark report for 10,000 simulated payment flows](https://github.com/vikas575/razorpay_build_aithon/blob/main/backend/evaluation/reports/benchmark_10000.json)

### [Aegis](https://github.com/vikas575/aegis)

A Team AtheneX hackathon prototype that checks a financial AI agent’s permissions and spending limits before an action goes through. Its audit log records why a request was allowed, denied, or sent for approval.

[Read the policy evaluator](https://github.com/vikas575/aegis/blob/main/backend/policy_engine.py)

### [Customer Support OpenEnv](https://github.com/vikas575/scaler_hackathon)

An evaluation environment for support agents. It scores how well an agent classifies incoming tickets, drafts replies, and decides which cases to escalate.

[Explore the scoring rules](https://github.com/vikas575/scaler_hackathon/blob/main/src/task_graders.py)
