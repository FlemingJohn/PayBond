import { useState } from "react"
import { Link } from "react-router-dom"
import { Logo } from "../Logo/Logo"
import { WalletButton } from "../WalletButton/WalletButton"
import styles from "./Header.module.css"

const links = [
  { to: "/dashboard", label: "Bonds" },
  { to: "/create", label: "Create" }
]

export function Header() {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brand} onClick={close}>
        <Logo />
        <span className={styles.word}>PayBond</span>
      </Link>

      <nav className={styles.nav}>
        {links.map((link) => (
          <Link key={link.to} to={link.to}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className={styles.right}>
        <WalletButton />
        <button
          className={styles.toggle}
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span className={styles.line} />
          <span className={styles.line} />
        </button>
      </div>

      {open ? (
        <nav className={styles.mobileNav}>
          {links.map((link) => (
            <Link key={link.to} to={link.to} onClick={close}>
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  )
}
