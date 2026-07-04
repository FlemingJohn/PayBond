type Config = {
  port: number
  rpcUrl: string
  verifierUrl: string
  verifierApiKey: string
  daLayerUrl: string
  payBondAddress: `0x${string}`
  fdcHubAddress: `0x${string}`
  feeConfigAddress: `0x${string}`
  privateKey: `0x${string}`
  firstVotingRoundTs: number
  votingEpochSeconds: number
  xrplExplorerUrl: string
}

function required(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`missing env ${name}`)
  return value
}

export const config: Config = {
  port: Number(process.env.PORT ?? 3000),
  rpcUrl: required("RPC_URL"),
  verifierUrl: required("VERIFIER_URL"),
  verifierApiKey: required("VERIFIER_API_KEY"),
  daLayerUrl: required("DA_LAYER_URL"),
  payBondAddress: required("PAYBOND_ADDRESS") as `0x${string}`,
  fdcHubAddress: required("FDC_HUB_ADDRESS") as `0x${string}`,
  feeConfigAddress: required("FEE_CONFIG_ADDRESS") as `0x${string}`,
  privateKey: required("PRIVATE_KEY") as `0x${string}`,
  firstVotingRoundTs: Number(required("FIRST_VOTING_ROUND_TS")),
  votingEpochSeconds: Number(process.env.VOTING_EPOCH_SECONDS ?? 90),
  xrplExplorerUrl: process.env.XRPL_EXPLORER_URL ?? "https://testnet.xrpl.org"
}
