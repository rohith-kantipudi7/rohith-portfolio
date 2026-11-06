import Core from './Core'
import Network from './Network'
import Agents from './Agents'
import Cluster from './Cluster'
import Quantum from './Quantum'
import Globe from './Globe'
import Gates from './Gates'
import Upstream from './Upstream'
import Knot from './Knot'

/** Every 3D piece by key. Sections and project cards refer to these keys. */
export const PIECES = { core: Core, network: Network, agents: Agents, cluster: Cluster, quantum: Quantum, globe: Globe, gates: Gates, upstream: Upstream, knot: Knot }

/** Pieces the main stage can show (project cards render the others in their own views). */
export const STAGE_PIECES = ['core', 'network', 'agents', 'cluster', 'quantum', 'globe', 'upstream', 'knot']
