import { createPublicClient, createWalletClient, http, parseAbi, defineChain } from "viem"
import { privateKeyToAccount } from "viem/accounts"
import { config } from "../../config/env"

const coston2 = defineChain({
  id: 114,
  name: "coston2",
  nativeCurrency: { name: "Coston2 Flare", symbol: "C2FLR", decimals: 18 },
  rpcUrls: { default: { http: [config.rpcUrl] } }
})

const account = privateKeyToAccount(config.privateKey)
const publicClient = createPublicClient({ chain: coston2, transport: http(config.rpcUrl) })
const walletClient = createWalletClient({ account, chain: coston2, transport: http(config.rpcUrl) })

const fdcHubAbi = parseAbi(["function requestAttestation(bytes data) payable"])
const feeAbi = parseAbi(["function getRequestFee(bytes data) view returns (uint256)"])
const payBondAbi = parseAbi([
  "struct Bond { address payer; address payee; bytes32 payeeHash; uint256 amount; uint256 deadline; bytes32 reference; uint8 status; }",
  "function getBond(uint256 bondId) view returns (Bond)"
])

export async function submitAttestationRequest(request: `0x${string}`): Promise<number> {
  const fee = await publicClient.readContract({
    address: config.feeConfigAddress,
    abi: feeAbi,
    functionName: "getRequestFee",
    args: [request]
  })
  const hash = await walletClient.writeContract({
    address: config.fdcHubAddress,
    abi: fdcHubAbi,
    functionName: "requestAttestation",
    args: [request],
    value: fee
  })
  const receipt = await publicClient.waitForTransactionReceipt({ hash })
  const block = await publicClient.getBlock({ blockNumber: receipt.blockNumber })
  return roundId(Number(block.timestamp))
}

export function readBond(bondId: bigint) {
  return publicClient.readContract({
    address: config.payBondAddress,
    abi: payBondAbi,
    functionName: "getBond",
    args: [bondId]
  })
}

function roundId(timestamp: number): number {
  return Math.floor((timestamp - config.firstVotingRoundTs) / config.votingEpochSeconds)
}
