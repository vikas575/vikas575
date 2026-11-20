# Hi, I'm Vikas

I build backend tools in Python. My projects explore how to reconstruct a payment
when events arrive out of order, decide what an AI agent can spend, and measure
how well an agent handles a support ticket.

## Selected projects

### [Payment Truth](https://github.com/vikas575/razorpay_build_aithon)

A payment reconciliation prototype built with FastAPI and React. It reconstructs
payment timelines from event timestamps and flags cases where payment and order
records disagree.

[Out-of-order event test](https://github.com/vikas575/razorpay_build_aithon/blob/main/backend/tests/test_state_machine.py) · [Benchmark report for 10,000 simulated payment flows](https://github.com/vikas575/razorpay_build_aithon/blob/main/backend/evaluation/reports/benchmark_10000.json)

### [Aegis](https://github.com/vikas575/aegis)

A Team AtheneX hackathon prototype for controlling what financial AI agents can
do. A FastAPI service checks each request against permissions and spending
limits, then records why it allowed, denied, or requested approval for the action.

[Read the policy evaluator](https://github.com/vikas575/aegis/blob/main/backend/policy_engine.py)

### [Customer Support OpenEnv](https://github.com/vikas575/scaler_hackathon)

A Python environment for evaluating AI agents on three support tasks: classifying
tickets, drafting replies, and deciding which cases need escalation. Each task
has its own scoring rules.

[Explore the scoring rules](https://github.com/vikas575/scaler_hackathon/blob/main/src/task_graders.py)
