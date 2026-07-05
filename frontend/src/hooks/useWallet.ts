import { useCallback, useEffect, useState } from "react"

type EthereumProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
}

function getProvider(): EthereumProvider | undefined {
  return (window as unknown as { ethereum?: EthereumProvider }).ethereum
}

export function useWallet() {
  const [address, setAddress] = useState<string | null>(null)

  const connect = useCallback(async () => {
    const provider = getProvider()
    if (!provider) return
    const accounts = (await provider.request({ method: "eth_requestAccounts" })) as string[]
    setAddress(accounts[0] ?? null)
  }, [])

  useEffect(() => {
    const provider = getProvider()
    if (!provider) return
    provider.request({ method: "eth_accounts" }).then((result) => {
      const accounts = result as string[]
      if (accounts.length > 0) setAddress(accounts[0])
    })
  }, [])

  return { address, connect }
}
