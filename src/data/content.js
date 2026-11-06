// =====================================================================
//  All site copy lives here. Edit this file to change what the site says.
//  NOTE: projects / email / socials below are DRAFT placeholders â€” replace
//  them with your real work and links. Empty links are hidden automatically.
// =====================================================================

export const profile = {
  name: 'Rohith Kantipudi',
  first: 'Rohith',
  last: 'Kantipudi',
  roles: 'AI Researcher Â· AI Engineer Â· Open Source Contributor',
  tagline: 'Foundation Models â€¢ AI Systems â€¢ Agentic AI â€¢ AI Infrastructure',
  focus: ['Foundation Models', 'AI Systems', 'Agentic AI', 'AI Infrastructure'],
  lead:
    'I research and build the core of AI â€” models, agents and the infrastructure underneath â€” and take them all the way into production, inside real customer environments, on any cloud.',
  badges: ['Foundation Models', 'Agentic AI', 'Quantum', 'Forward Deployed', 'Multi-cloud'],
  email: 'rohith.kantipudi@example.com', // TODO: real email
  socials: {
    github: '',   // TODO: https://github.com/<you>
    linkedin: '', // TODO: https://linkedin.com/in/<you>
    x: '',        // TODO: https://x.com/<you>
  },
}

// `stage` indexes STAGES in src/three/stages.js (drives the 3D shape + layout side).
export const chapters = [
  {
    id: 'models',
    stage: 1,
    num: '01',
    kicker: 'Foundation Models',
    title: 'Understanding models from the inside out.',
    lead:
      'Research on how large models are built, trained and made better â€” not just how to call them.',
    points: [
      { h: 'Architecture & scaling', t: 'Transformer variants, mixture-of-experts and state-space alternatives, studied through controlled ablations.' },
      { h: 'Post-training', t: 'Supervised fine-tuning, preference optimisation and reinforcement-learning methods for reasoning and alignment.' },
      { h: 'Evaluation', t: 'Task suites, contamination checks and error analysis that tell you what a model can really do.' },
      { h: 'Efficiency', t: 'Quantisation, distillation and speculative decoding to cut latency and cost without losing quality.' },
    ],
    tags: ['PyTorch', 'JAX', 'Hugging Face', 'DeepSpeed', 'FSDP', 'RLHF / DPO'],
  },
  {
    id: 'agents',
    stage: 2,
    num: '02',
    kicker: 'Agentic AI',
    title: 'Agents that plan, act and can be trusted.',
    lead:
      'Moving from chat to systems that use tools, hold state and finish multi-step work â€” with the controls to run them safely.',
    points: [
      { h: 'Tool use & planning', t: 'Typed tool contracts, task decomposition and recovery when a step fails.' },
      { h: 'Memory & retrieval', t: 'Short- and long-term memory, RAG and knowledge access that stay grounded in source data.' },
      { h: 'Multi-agent systems', t: 'Orchestration, hand-offs and shared context between specialised agents, including over MCP.' },
      { h: 'Reliability', t: 'Tracing, replayable runs, guardrails and evaluation gates before anything reaches users.' },
    ],
    tags: ['LangGraph', 'MCP', 'Tool use', 'RAG', 'Guardrails', 'Agent evals'],
  },
  {
    id: 'infra',
    stage: 3,
    num: '03',
    kicker: 'AI Systems & Infrastructure',
    title: 'The platform that makes models run â€” anywhere.',
    lead:
      'Training and serving at scale across AWS, Azure and GCP, designed to be portable instead of locked in.',
    points: [
      { h: 'Training platforms', t: 'Distributed training on GPU clusters: data pipelines, checkpointing and failure recovery.' },
      { h: 'Inference serving', t: 'High-throughput LLM serving with batching, KV-cache management, routing and autoscaling.' },
      { h: 'Multi-cloud', t: 'One architecture across AWS, Azure and GCP with Kubernetes and Terraform, plus on-prem and air-gapped targets.' },
      { h: 'Observability & cost', t: 'Latency, quality and GPU-cost telemetry so systems stay fast, correct and affordable.' },
    ],
    tags: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Terraform', 'Ray', 'vLLM', 'Triton'],
  },
  {
    id: 'quantum',
    stage: 4,
    num: '04',
    kicker: 'Quantum',
    title: 'Where AI meets quantum computing.',
    lead:
      'Exploring hybrid quantumâ€“classical methods and what they could mean for machine learning and optimisation.',
    points: [
      { h: 'Variational circuits', t: 'Parameterised quantum circuits trained with classical optimisers (VQE, QAOA-style workflows).' },
      { h: 'Quantum machine learning', t: 'Quantum layers inside PyTorch pipelines and honest comparisons against classical baselines.' },
      { h: 'Simulation & tooling', t: 'Circuit simulation, noise models and reproducible experiments on simulators and cloud hardware.' },
    ],
    tags: ['Qiskit', 'PennyLane', 'Cirq', 'Hybrid QML', 'VQE', 'QAOA'],
  },
]

export const deployed = {
  id: 'deployed',
  stage: 5,
  num: '05',
  kicker: 'Forward Deployed',
  title: 'Embedded with the customer, accountable for the outcome.',
  lead:
    'Forward-deployed engineering means working inside the customerâ€™s environment and constraints and carrying a prototype through to something that runs in production.',
  steps: [
    { n: '01', h: 'Embed', t: 'Sit with users and operators. Map the real workflow, data and constraints before touching a model.' },
    { n: '02', h: 'Define', t: 'Agree success metrics and build an evaluation set from real cases first.' },
    { n: '03', h: 'Build', t: 'Ship a thin end-to-end slice quickly, then iterate against the evals.' },
    { n: '04', h: 'Harden', t: 'Security, observability, latency and cost budgets, fallbacks â€” deployed into the customerâ€™s own cloud or VPC.' },
    { n: '05', h: 'Hand off', t: 'Runbooks, dashboards and training so the team owns the system without me.' },
  ],
  targets: ['AWS', 'Azure', 'GCP', 'On-prem', 'Air-gapped'],
}

// Draft projects â€” replace with your real work. Add `code` / `demo` URLs to show links.
export const projects = [
  {
    title: 'Agent Runtime',
    kind: 'Agentic AI',
    summary: 'A small, observable runtime for tool-using agents: typed tool contracts, durable state, full tracing and replayable runs.',
    stack: ['Python', 'Pydantic', 'OpenTelemetry', 'MCP'],
    code: '',
    demo: '',
  },
  {
    title: 'Inference Gateway',
    kind: 'AI Infrastructure',
    summary: 'A multi-cloud gateway that routes LLM traffic across GPU pools on AWS, Azure and GCP with fallbacks, autoscaling and cost-aware routing.',
    stack: ['vLLM', 'Kubernetes', 'Terraform', 'Go'],
    code: '',
    demo: '',
  },
  {
    title: 'Small-LM Lab',
    kind: 'Foundation Models',
    summary: 'Reproducible pretraining and post-training recipes for small transformers â€” SFT, preference optimisation and ablations on one config.',
    stack: ['PyTorch', 'FSDP', 'Hugging Face', 'DPO'],
    code: '',
    demo: '',
  },
  {
    title: 'Eval Harness',
    kind: 'AI Systems',
    summary: 'Continuous evaluation for LLMs and agents: task suites, calibrated judges and regression gates that run in CI.',
    stack: ['Python', 'Evals', 'CI/CD', 'Postgres'],
    code: '',
    demo: '',
  },
  {
    title: 'Hybrid Quantum Lab',
    kind: 'Quantum',
    summary: 'Variational circuits wired into PyTorch, benchmarked against classical baselines on simulators and cloud hardware.',
    stack: ['PennyLane', 'Qiskit', 'PyTorch'],
    code: '',
    demo: '',
  },
  {
    title: 'Field Deploy Kit',
    kind: 'Forward Deployed',
    summary: 'Reference architectures, Terraform modules and runbooks for taking an AI prototype into a customerâ€™s VPC or air-gapped site.',
    stack: ['Terraform', 'Kubernetes', 'Helm', 'Runbooks'],
    code: '',
    demo: '',
  },
]

export const stack = [
  { h: 'Models & research', items: ['PyTorch', 'JAX', 'Hugging Face', 'DeepSpeed / FSDP', 'Distillation', 'RLHF / DPO', 'Evals'] },
  { h: 'Agents & applications', items: ['LangGraph', 'MCP', 'RAG', 'Tool use', 'Guardrails', 'Tracing'] },
  { h: 'Infrastructure & cloud', items: ['AWS', 'Azure', 'GCP', 'Kubernetes', 'Terraform', 'Ray', 'vLLM', 'Triton'] },
  { h: 'Quantum & languages', items: ['Qiskit', 'PennyLane', 'Cirq', 'Python', 'TypeScript', 'Go', 'SQL'] },
]

export const contact = {
  title: 'Letâ€™s build the hard part.',
  lead:
    'Open to research collaborations, AI engineering and forward-deployed roles, and open-source work. If it needs real AI depth, get in touch.',
  oss: 'Open source contributor â€” models, agents and infrastructure tooling.',
}

// ---------- Hero / marquee / stats / lab (added for the v2 redesign) ----------
export const headline = ['Core AI,', 'engineered', 'end to end.']

// Vertical ticker down the side of the hero.
export const ticker = [
  'Foundation_Models', 'Agentic_AI', 'Post-training', 'RLHF_DPO', 'MCP', 'LangGraph', 'vLLM', 'Triton',
  'Ray', 'FSDP', 'Kubernetes', 'Terraform', 'AWS', 'Azure', 'GCP', 'Air-gapped', 'Evals', 'RAG',
  'Quantum_ML', 'Qiskit', 'PennyLane', 'Open_Source',
]

export const marquee = [
  'Foundation Models', 'Agentic AI', 'AI Infrastructure', 'Forward Deployed', 'Multi-cloud',
  'Open Source', 'Quantum ML', 'Inference at scale', 'Evaluation',
]

export const stats = [
  { v: 3, suffix: '', label: 'Clouds', sub: 'AWS Â· Azure Â· GCP' },
  { v: 4, suffix: '', label: 'Research tracks', sub: 'Models Â· Agents Â· Infra Â· Quantum' },
  { v: 5, suffix: '', label: 'Deploy targets', sub: 'Cloud Â· VPC Â· On-prem Â· Air-gapped' },
  { v: 100, suffix: '%', label: 'Open to build', sub: 'Research to production' },
]

export const about = {
  kicker: 'Profile',
  title: 'Researcherâ€™s depth. Field engineerâ€™s accountability.',
  body: [
    'I work on the layers of AI that most people only consume: how models are trained and post-trained, how agents plan and stay reliable, and the infrastructure that serves them at scale.',
    'Then I take that work to where it has to survive â€” inside a customerâ€™s environment, on whichever cloud or air-gapped site they run, with evaluation, security and cost budgets attached.',
  ],
}

// Looping "agent run" shown in the lab terminal.
export const trace = [
  { k: 'run', t: 'agent.run(task="reconcile Q3 supplier invoices")' },
  { k: 'plan', t: 'plan â†’ 4 steps Â· budget 12k tokens Â· guardrails: pii, spend<$2' },
  { k: 'tool', t: 'mcp://erp.query(status="open", quarter="Q3")  â†’ 218 rows' },
  { k: 'tool', t: 'retrieve(policy_kb, "3-way match tolerance")  â†’ 3 chunks  âœ“ grounded' },
  { k: 'eval', t: 'judge.match_accuracy = 0.97  (gate â‰¥ 0.95)  PASS' },
  { k: 'tool', t: 'mcp://erp.flag(ids=[â€¦14])  â†’ awaiting human approval' },
  { k: 'done', t: 'trace 7f3aâ€¦ saved Â· replayable Â· p95 latency 2.4s Â· cost $0.018' },
]

// Multi-cloud gateway map (positions in an 600x360 SVG viewbox).
export const clouds = [
  { id: 'aws', label: 'AWS', sub: 'GPU pool A', x: 90, y: 70, c: '#fbbf24' },
  { id: 'azure', label: 'Azure', sub: 'GPU pool B', x: 510, y: 70, c: '#38bdf8' },
  { id: 'gcp', label: 'GCP', sub: 'TPU / GPU pool C', x: 90, y: 290, c: '#34d399' },
  { id: 'onprem', label: 'On-prem', sub: 'Air-gapped site', x: 510, y: 290, c: '#c084fc' },
]

// Words placed on the rotating 3D sphere.
export const sphereWords = [
  'PyTorch', 'JAX', 'Transformers', 'DPO', 'RLHF', 'FSDP', 'DeepSpeed', 'LoRA', 'vLLM', 'Triton', 'CUDA',
  'Ray', 'Kubernetes', 'Terraform', 'Helm', 'AWS', 'Azure', 'GCP', 'MCP', 'LangGraph', 'RAG', 'Evals',
  'OpenTelemetry', 'Qiskit', 'PennyLane', 'Cirq', 'Python', 'TypeScript', 'Go', 'Rust', 'SQL', 'Docker',
  'Slurm', 'ONNX', 'TensorRT', 'Postgres',
]

// ---------- v3: multi-cloud, reference architecture, open source ----------

// Column order matters: it drives the interactive matrix in <MultiCloud />.
export const cloudCols = [
  { id: 'aws', label: 'AWS', c: '#fbbf24' },
  { id: 'azure', label: 'Azure', c: '#38bdf8' },
  { id: 'gcp', label: 'GCP', c: '#34d399' },
  { id: 'onprem', label: 'On-prem / air-gapped', c: '#c084fc' },
]

// Equivalent building blocks per platform (public service names).
export const cloudRows = [
  { k: 'Accelerators', v: ['EC2 P5 · Trainium · Inferentia', 'ND H100 v5 · NC A100 v4', 'A3 / A2 GPUs · Cloud TPU', 'NVIDIA DGX / HGX · Slurm'] },
  { k: 'Managed ML', v: ['SageMaker', 'Azure Machine Learning', 'Vertex AI', 'Kubeflow · MLflow'] },
  { k: 'Hosted models', v: ['Amazon Bedrock', 'Azure OpenAI · AI Foundry', 'Vertex AI Model Garden', 'vLLM · TGI · Triton'] },
  { k: 'Kubernetes', v: ['EKS', 'AKS', 'GKE', 'RKE2 · OpenShift'] },
  { k: 'Serverless containers', v: ['ECS Fargate · App Runner', 'Container Apps', 'Cloud Run', 'Knative'] },
  { k: 'Retrieval', v: ['OpenSearch · Aurora pgvector', 'Azure AI Search', 'Vertex AI Vector Search', 'pgvector · Qdrant'] },
  { k: 'Identity & secrets', v: ['IAM · Secrets Manager', 'Entra ID · Key Vault', 'Cloud IAM · Secret Manager', 'Keycloak · Vault'] },
  { k: 'Observability', v: ['CloudWatch · X-Ray', 'Azure Monitor · App Insights', 'Cloud Monitoring · Trace', 'OpenTelemetry · Prometheus · Grafana'] },
]

export const portability = [
  { h: 'One artifact', t: 'OCI images and Helm charts that run unchanged on EKS, AKS, GKE or a bare-metal cluster.' },
  { h: 'One control plane', t: 'Terraform modules per cloud behind the same interface, with state and policy-as-code kept in the customer’s account.' },
  { h: 'One telemetry format', t: 'OpenTelemetry traces, metrics and eval scores, so a dashboard moves with the workload.' },
  { h: 'One model interface', t: 'An OpenAI-compatible gateway in front of vLLM, Bedrock, Azure OpenAI or Vertex, so swapping a backend is config, not code.' },
]

// Layers of the reference architecture diagram (top ? bottom).
export const archLayers = [
  { id: 'edge', k: 'Edge', t: 'Users · Apps · Tools', n: 'SSO · rate limits · WAF' },
  { id: 'agent', k: 'Agent runtime', t: 'Planner · Tools · Memory', n: 'MCP · typed contracts · replay' },
  { id: 'gateway', k: 'Model gateway', t: 'Routing · Fallback · Cache', n: 'cost-aware · multi-provider' },
  { id: 'serve', k: 'Inference', t: 'vLLM · Triton · TensorRT', n: 'batching · KV-cache · autoscale' },
  { id: 'compute', k: 'Compute', t: 'GPU / TPU pools', n: 'AWS · Azure · GCP · on-prem' },
]
export const archRails = ['Evals & gates', 'Guardrails', 'Tracing & cost']

export const openSource = {
  kicker: 'Open source',
  title: 'Building in the open, upstream first.',
  lead:
    'I contribute to the tools I depend on, and prefer fixing a problem upstream over working around it downstream.',
  areas: [
    { h: 'Training & model tooling', t: 'Reproducible recipes, evaluation fixes and efficiency work around PyTorch-based training stacks.', tags: ['PyTorch', 'Hugging Face', 'DeepSpeed'] },
    { h: 'Agents & protocols', t: 'Agent frameworks, MCP servers and clients, tracing and eval utilities.', tags: ['MCP', 'LangGraph', 'OpenTelemetry'] },
    { h: 'Inference & infra', t: 'Serving engines, Kubernetes operators and Terraform modules for running models anywhere.', tags: ['vLLM', 'Kubernetes', 'Terraform'] },
    { h: 'Docs & reproductions', t: 'Minimal repros, benchmarks and documentation that make the next contributor faster.', tags: ['Benchmarks', 'Docs', 'Examples'] },
  ],
  flow: ['Reproduce', 'Minimise', 'Fix', 'Test + eval', 'Upstream PR', 'Maintain'],
}
