# Rohith Kantipudi

**AI Researcher · AI Engineer · Forward Deployed · Open Source**

Foundation Models • AI Systems • Agentic AI • AI Infrastructure • Quantum ML • Multi-cloud

🌐 Live: https://rohith-kantipudi7.github.io/rohith-portfolio/
✉️ rohith.kantipudi4@gmail.com

---

## About

I build the layer underneath AI: models, agents and the infrastructure that runs them, shipped inside the
customer’s cloud.

Most AI work is assembled on top of someone else’s model. I work on how models are trained and post-trained,
how agents stay reliable, and the infrastructure that serves them at scale. Then I take it where it has to
survive: inside the customer’s environment, on AWS, Azure, GCP or an air-gapped rack, with evals, security and
cost budgets attached.

## What I work on

| | Area | Focus |
|---|---|---|
| 01 | **Foundation models** | Dense & MoE transformers, state-space hybrids, long context. SFT, DPO and GRPO post-training. Quantisation, distillation and speculative decoding. |
| 02 | **Agentic AI** | Typed tool contracts, MCP-native integrations, durable execution. Grounded memory and retrieval. Tracing, replayable runs, human-approval and evaluation gates. |
| 03 | **AI infrastructure** | Elastic, fault-tolerant multi-node training. Continuous batching, paged KV-cache and tensor parallelism on vLLM and TensorRT-LLM. Latency, quality and GPU cost in one trace. |
| 04 | **Quantum** | Variational circuits (VQE, QAOA, quantum kernels), quantum layers inside PyTorch, error mitigation on simulators and cloud QPUs. |
| 05 | **Forward deployed** | Embed → define the metric → ship a thin slice → harden → hand off. Deployed into the customer’s VPC, on-prem rack or air-gapped site. |

## Flagship systems

| System | What it is |
|---|---|
| **FORGE** | A sovereign foundation-model factory: pretraining → post-training → evaluation in one config, reproducible on AWS, Azure, GCP or bare metal. |
| **CONDUCTOR** | A durable runtime for tool-using agents: every step persisted, traced and replayable, with approval and evaluation gates. |
| **MERIDIAN** | A multi-cloud inference mesh: one OpenAI-compatible endpoint over GPU pools on AWS, Azure, GCP and on-prem, routed by latency, cost and KV-cache locality. |
| **VERDICT** | Continuous evaluation for models and agents: calibrated judges, contamination checks and regression gates in CI. |
| **ENTANGLE** | A hybrid quantum–classical ML lab: variational circuits as PyTorch layers, benchmarked against classical baselines on simulators and cloud QPUs. |
| **FIELDKIT** | Prototype to production in a customer’s VPC: Terraform per cloud, an air-gapped bundle, zero-trust defaults, runbooks and dashboards. |

## One architecture. Any cloud.

The same agent and inference stack maps onto AWS, Azure, GCP or an air-gapped cluster. Only the adapters
change: one artifact (OCI + Helm), one control plane (Terraform per cloud), one model interface
(OpenAI-compatible gateway over vLLM, Bedrock, Azure OpenAI or Vertex), one telemetry format (OpenTelemetry).

## Stack

`PyTorch` `JAX` `FSDP` `Megatron` `Hugging Face` `RLHF / DPO / GRPO` `MCP` `LangGraph` `Temporal` `OpenTelemetry`
`vLLM` `TensorRT-LLM` `Triton` `Ray` `Slurm` `Kubernetes` `Terraform` `Helm` `AWS` `Azure` `GCP`
`Qiskit` `PennyLane` `Cirq` `Amazon Braket` `Azure Quantum` `Python` `Go` `Rust` `TypeScript` `CUDA`

## Open source

Building in the open, upstream first: training and model tooling, agent frameworks and MCP servers, serving
engines and Kubernetes operators, hybrid QML examples and benchmark reproductions.

## Contact

Open to research collaborations, AI engineering and forward-deployed roles, and open-source work.
**rohith.kantipudi4@gmail.com**

---

<sub>This site: React · Vite · React Three Fiber. `npm install && npm run dev` to run locally.</sub>
