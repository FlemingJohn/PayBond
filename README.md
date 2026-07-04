# PayBond

PayBond is a trustless cross-chain payment guarantee. A buyer locks FXRP as a bond on Flare against an XRP payment they owe on the XRP Ledger. Pay on time and the bond returns to the buyer. Miss the deadline and the supplier claims the bond automatically. No middleman and no trusted oracle.

The engine is the Flare Data Connector proof that a payment did not happen.

## Structure

```
PayBond/
├── blockchain/   Solidity contracts, Foundry
├── backend/      Attestation orchestration API, Node and TypeScript
└── frontend/     Web app, React and Vite
```

The three folders are independent. They communicate over the chain and the HTTP API only.

## Flow

Happy path
1. Buyer creates a bond, locks FXRP, sets supplier, amount, and deadline.
2. The app shows the exact XRP payment to send, including the reference memo.
3. Buyer pays on the XRP Ledger before the deadline.
4. Buyer submits a payment proof and reclaims the bond.

Default path
1. The deadline passes and the payment reaches finality.
2. Supplier requests a non-payment proof for the reference, amount, and window.
3. Supplier submits the proof and the bond releases to the supplier.

## Networks

Testnets only.

- Flare Testnet Coston2 for contracts and FXRP.
- XRP Ledger Testnet for payments.
- Flare Data Connector for Payment and ReferencedPaymentNonexistence proofs.

Fund Coston2 from the Coston2 faucet and XRPL from the XRP Ledger testnet faucet.

## Prerequisites

- Node 20 or later
- Foundry
- A wallet with Coston2 test funds

## Setup

Blockchain
```
cd blockchain
forge build
forge test
```

Backend
```
cd backend
npm install
npm run dev
```

Frontend
```
cd frontend
npm install
npm run dev
```

## Conventions

- No comments in the codebase.
- Simple names.
- One responsibility per file.
- No imports across the three folders.
