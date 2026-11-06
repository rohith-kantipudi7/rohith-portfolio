// =====================================================================
//  All site copy lives here. Name / email / CV live in ./profile.js.
//  `scene` keys pick a 3D piece from src/three/pieces (see Scene.jsx).
//  Wrap words in **double stars** to highlight them in the manifesto.
// =====================================================================

export const roleLine = 'AI Researcher · AI Engineer · Forward Deployed · Open Source'

export const hero = {
  status: 'Open to roles & collaborations',
  title: 'AI Researcher & Engineer',
  lead: 'Foundation models, agentic systems and AI infrastructure, taken into production on any cloud.',
  focus: ['Foundation Models', 'Agentic AI', 'AI Infrastructure', 'Quantum ML', 'Multi-cloud'],
}

export const band = ['Foundation Models', 'Agentic AI', 'AI Infrastructure', 'Forward Deployed', 'Multi-cloud', 'Quantum ML', 'Open Source']

export const manifesto = {
  kicker: '01 · Profile',
  text: 'I build the layer **underneath** AI: **models**, **agents** and the **infrastructure** that runs them, shipped **inside the customer’s cloud**.',
  pillars: [
    { n: '01', h: 'Foundation models', t: 'Training, post-training, efficiency.' },
    { n: '02', h: 'Agentic AI', t: 'Durable, traceable, gated.' },
    { n: '03', h: 'AI infrastructure', t: 'Train and serve on any cloud.' },
    { n: '04', h: 'Quantum', t: 'Hybrid ML, honestly benchmarked.' },
  ],
}

// ---------- Pinned chapters (the 3D stage switches scene per chapter) ----------
export const chapters = [
  {
    id: 'models', scene: 'network', num: '01', kicker: 'Foundation Models',
    title: 'Models, from the inside out.',
    lead: 'How large models are built, trained and made better, studied with controlled experiments.',
    points: ['Dense & mixture-of-experts transformers, state-space hybrids, long context', 'SFT, DPO and GRPO post-training for reasoning, tool use and alignment', 'Quantisation, distillation and speculative decoding that keep quality'],
    tags: ['PyTorch', 'JAX', 'FSDP', 'Megatron', 'Hugging Face', 'RLHF / DPO / GRPO'],
  },
  {
    id: 'agents', scene: 'agents', num: '02', kicker: 'Agentic AI',
    title: 'Agents that plan, act and can be trusted.',
    lead: 'Systems that use tools, hold state and finish multi-step work, with the controls to run them safely.',
    points: ['Typed tool contracts, MCP-native, durable execution and recovery', 'Memory and retrieval that stay grounded, with citations that survive an audit', 'Full tracing, replayable runs, human approval and evaluation gates'],
    tags: ['MCP', 'LangGraph', 'Tool use', 'RAG', 'Guardrails', 'OpenTelemetry'],
  },
  {
    id: 'infra', scene: 'cluster', num: '03', kicker: 'AI Infrastructure',
    title: 'The platform that makes models run, anywhere.',
    lead: 'Training and serving at scale across AWS, Azure and GCP, portable instead of locked in.',
    points: ['Elastic, fault-tolerant multi-node training with sharded checkpoints', 'Continuous batching, paged KV-cache and tensor parallelism on vLLM and TensorRT-LLM', 'Latency, quality and GPU cost in one trace'],
    tags: ['Kubernetes', 'Ray', 'Slurm', 'vLLM', 'TensorRT-LLM', 'Triton', 'Terraform', 'CUDA'],
  },
  {
    id: 'quantum', scene: 'quantum', num: '04', kicker: 'Quantum',
    title: 'Where AI meets quantum computing.',
    lead: 'Hybrid quantum–classical methods for machine learning and optimisation, measured against strong classical baselines.',
    points: ['Variational circuits: VQE, QAOA and quantum kernels', 'Quantum layers inside PyTorch pipelines, compared with classical models of the same size', 'Error mitigation and reproducible runs on simulators and cloud QPUs'],
    tags: ['Qiskit', 'PennyLane', 'Cirq', 'Amazon Braket', 'Azure Quantum'],
  },
  {
    id: 'field', scene: 'globe', num: '05', kicker: 'Forward Deployed',
    title: 'Embedded with the customer. Accountable for the outcome.',
    lead: 'Working inside the customer’s environment and carrying a prototype through to production on their cloud, not mine.',
    points: ['Embed → define the metric → ship a thin slice → harden → hand off', 'Deployed into the customer’s VPC, on-prem rack or air-gapped site', 'Runbooks, dashboards and training so the team owns it without me'],
    tags: ['AWS', 'Azure', 'GCP', 'On-prem', 'Air-gapped', 'Zero-trust'],
  },
]

// ---------- Multi-cloud matrix ----------
export const cloud = {
  kicker: '03 · Multi-cloud',
  title: 'One architecture. Any cloud.',
  lead: 'The same agent and inference stack maps onto AWS, Azure, GCP or an air-gapped cluster. Only the adapters change.',
  principles: [
    { h: 'One artifact', t: 'OCI images and Helm charts that run unchanged on EKS, AKS, GKE or bare metal.' },
    { h: 'One control plane', t: 'Terraform modules per cloud behind one interface; state and policy stay in the customer’s account.' },
    { h: 'One model interface', t: 'An OpenAI-compatible gateway over vLLM, Bedrock, Azure OpenAI or Vertex. Swapping a backend is config.' },
    { h: 'One telemetry format', t: 'OpenTelemetry traces, metrics and eval scores, so dashboards move with the workload.' },
  ],
}

export const cloudCols = [
  { id: 'aws', label: 'AWS', short: 'AWS', c: '#ffb347' },
  { id: 'azure', label: 'Azure', short: 'Azure', c: '#38bdf8' },
  { id: 'gcp', label: 'GCP', short: 'GCP', c: '#ccff33' },
  { id: 'onprem', label: 'On-prem / air-gapped', short: 'On-prem', c: '#c084fc' },
]

export const cloudRows = [
  { k: 'Accelerators', v: ['EC2 P5 · Trainium · Inferentia', 'ND H100 v5 · NC A100 v4', 'A3 / A2 GPUs · Cloud TPU', 'NVIDIA DGX / HGX · Slurm'] },
  { k: 'Managed ML', v: ['SageMaker', 'Azure Machine Learning', 'Vertex AI', 'Kubeflow · MLflow'] },
  { k: 'Hosted models', v: ['Amazon Bedrock', 'Azure OpenAI · AI Foundry', 'Vertex AI Model Garden', 'vLLM · TGI · Triton'] },
  { k: 'Kubernetes', v: ['EKS', 'AKS', 'GKE', 'RKE2 · OpenShift'] },
  { k: 'Serverless', v: ['ECS Fargate · Lambda', 'Container Apps · Functions', 'Cloud Run · Cloud Functions', 'Knative'] },
  { k: 'Retrieval', v: ['OpenSearch · Aurora pgvector', 'Azure AI Search', 'Vertex AI Vector Search', 'pgvector · Qdrant'] },
  { k: 'Identity & secrets', v: ['IAM · Secrets Manager', 'Entra ID · Key Vault', 'Cloud IAM · Secret Manager', 'Keycloak · Vault'] },
  { k: 'Observability', v: ['CloudWatch · X-Ray', 'Azure Monitor · App Insights', 'Cloud Monitoring · Trace', 'OpenTelemetry · Prometheus · Grafana'] },
  { k: 'Quantum', v: ['Amazon Braket', 'Azure Quantum', 'Cirq · qsim', 'Qiskit Aer · simulators'] },
]

// ---------- Flagship systems (horizontal gallery; each card has a live 3D preview) ----------
export const systemsIntro = {
  kicker: '04 · Flagship systems',
  title: 'Six systems. One stack.',
  lead: 'Core pieces of the AI stack, built from the ground up and designed to compose into one sovereign platform: train, evaluate, serve and ship on any cloud.',
}

// Add `code` / `demo` / `paper` URLs to show links. Empty links are hidden.
export const systems = [
  {
    code: 'FORGE', scene: 'network', color: '#8b5cf6', kind: 'Foundation Models',
    title: 'A sovereign foundation-model factory.',
    summary: 'Pretraining → post-training → evaluation in one declarative config, reproducible on AWS, Azure, GCP or bare metal. Dense and MoE recipes, long-context schedules, SFT → DPO → GRPO with evals in the loop.',
    highlights: ['Data engine: dedup, quality filters, tokenizer and token-budget planning', 'Elastic, fault-tolerant training that survives node loss', 'Portable checkpoints: never tied to the cloud they were trained on'],
    stack: ['PyTorch', 'FSDP', 'Megatron', 'Ray', 'Slurm'], code: '', demo: '', paper: '',
  },
  {
    code: 'CONDUCTOR', scene: 'agents', color: '#ccff33', kind: 'Agentic AI',
    title: 'A durable runtime for tool-using agents.',
    summary: 'Every agent step persisted, traced and replayable. Typed tool contracts, MCP-native, multi-agent hand-offs, human approval and evaluation gates before any version is promoted.',
    highlights: ['A run that crashes mid-task resumes from its last step', 'Replay any trace with a new model or prompt and diff the outcome', 'Tokens, spend, PII and tool permissions enforced by the runtime'],
    stack: ['Python', 'MCP', 'LangGraph', 'Temporal', 'OpenTelemetry'], code: '', demo: '', paper: '',
  },
  {
    code: 'MERIDIAN', scene: 'cluster', color: '#22d3ee', kind: 'AI Infrastructure',
    title: 'A multi-cloud inference mesh.',
    summary: 'One OpenAI-compatible endpoint over GPU pools on AWS, Azure, GCP and on-prem, routing each request by latency, cost, KV-cache locality and capacity. Fallbacks between vLLM, TensorRT-LLM, Bedrock, Azure OpenAI and Vertex are config.',
    highlights: ['Cost-aware routing across spot and preemptible pools with graceful drain', 'Prefix-aware scheduling sends a conversation back to the replica holding its KV-cache', 'Per-tenant quotas and GPU-cost attribution per request'],
    stack: ['Go', 'vLLM', 'TensorRT-LLM', 'Kubernetes', 'Envoy'], code: '', demo: '', paper: '',
  },
  {
    code: 'VERDICT', scene: 'gates', color: '#ffb347', kind: 'AI Systems',
    title: 'Continuous evaluation for models and agents.',
    summary: 'Task suites, calibrated LLM judges and regression gates that run in CI, for single-turn models and multi-step agent trajectories. Latency and cost budgets are tests too.',
    highlights: ['Judges calibrated against human labels, with drift tracked over time', 'Contamination checks and held-out rotations', 'A promotion gate: ship only when quality, latency and cost all pass'],
    stack: ['Python', 'Evals', 'GitHub Actions', 'DuckDB', 'Grafana'], code: '', demo: '', paper: '',
  },
  {
    code: 'ENTANGLE', scene: 'quantum', color: '#f0abfc', kind: 'Quantum',
    title: 'A hybrid quantum–classical ML lab.',
    summary: 'Variational circuits as drop-in PyTorch layers, QAOA for scheduling and routing, and a harness that compares every quantum result with a classical baseline of the same size on simulators and cloud QPUs.',
    highlights: ['One API over Qiskit, PennyLane and Cirq, from simulators to IBM, Braket and Azure Quantum', 'Error mitigation and noise-aware transpilation inside the training loop', 'Every experiment logs the classical baseline it had to beat'],
    stack: ['PennyLane', 'Qiskit', 'Cirq', 'PyTorch', 'Braket'], code: '', demo: '', paper: '',
  },
  {
    code: 'FIELDKIT', scene: 'globe', color: '#38bdf8', kind: 'Forward Deployed',
    title: 'Prototype to production in a customer’s VPC.',
    summary: 'Everything to land the stack inside a customer environment in weeks: Terraform per cloud, an air-gapped bundle of images, charts and weights, zero-trust defaults, dashboards and runbooks the customer’s team can own.',
    highlights: ['Air-gapped install from one signed bundle with SBOMs and provenance', 'SSO, per-tool permissions, network policies and secrets in the customer’s vault', 'Hand-off is the deliverable: the customer runs it alone'],
    stack: ['Terraform', 'Kubernetes', 'Helm', 'Argo CD', 'Vault'], code: '', demo: '', paper: '',
  },
]

// ---------- Open source ----------
export const openSource = {
  kicker: '05 · Open source',
  title: 'Building in the open, upstream first.',
  lead: 'I contribute to the tools I depend on, and prefer fixing a problem upstream over working around it downstream.',
  areas: [
    { h: 'Training & model tooling', t: 'Reproducible recipes, evaluation fixes and efficiency work around PyTorch training stacks.', tags: ['PyTorch', 'Hugging Face', 'DeepSpeed'] },
    { h: 'Agents & protocols', t: 'Agent frameworks, MCP servers and clients, tracing and evaluation utilities.', tags: ['MCP', 'LangGraph', 'OpenTelemetry'] },
    { h: 'Inference & infra', t: 'Serving engines, Kubernetes operators and Terraform modules for running models anywhere.', tags: ['vLLM', 'Kubernetes', 'Terraform'] },
    { h: 'Quantum & reproductions', t: 'Hybrid QML examples, benchmark reproductions and docs that make the next contributor faster.', tags: ['PennyLane', 'Qiskit', 'Benchmarks'] },
  ],
  flow: ['Reproduce', 'Minimise', 'Fix', 'Test + eval', 'Upstream PR', 'Maintain'],
}

// ---------- Contact ----------
export const contact = {
  kicker: '06 · Contact',
  title: 'Let’s build the hard part.',
  lead: 'Research collaborations, AI engineering and forward-deployed roles, open-source work. If it needs real AI depth, get in touch.',
}
