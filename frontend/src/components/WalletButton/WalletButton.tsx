import { useWallet } from "../../hooks/useWallet"
import { shorten } from "../../lib/format"
import styles from "./WalletButton.module.css"

export function WalletButton() {
  const { address, connect } = useWallet()
  return (
    <button className={styles.wallet} type="button" onClick={connect}>
      {address ? shorten(address, 4) : "Connect wallet"}
    </button>
  )
}
