import { Link } from "react-router-dom"
import { WalletButton } from "../WalletButton/WalletButton"
import styles from "./Header.module.css"

export function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand}>
        PayBond
      </Link>
      <nav className={styles.nav}>
        <Link to="/dashboard">Bonds</Link>
        <Link to="/create">Create</Link>
      </nav>
      <WalletButton />
    </header>
  )
}
