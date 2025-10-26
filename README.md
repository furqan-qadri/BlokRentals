# BlokRentals 🔐

**Secure peer-to-peer rentals powered by blockchain escrow deposit service**

![BlokRentals Homepage - Alt text: Screenshot showing the BlokRent landing page with various rental items displayed in a grid layout]

---

## Problem Statement

The rental market suffers from a critical **trust deficit** around **security deposits**:

- **Centralized control**: Traditional platforms give owners full authority over deposits, leaving renters vulnerable
- **No transparency**: Renters have no visibility into what happens to their money
- **Broken promises**: Many platforms either skip deposits entirely (risking owner assets) or hold them centrally with zero guarantees of fair release
- **Dispute nightmares**: When disagreements arise, there's no impartial arbiter—just he-said-she-said chaos

The result? Renters hesitate to pay deposits, and owners hesitate to rent without them. Everyone loses.

---

## Solution

**BlokRentals** revolutionizes day-to-day rentals by **locking deposits in blockchain escrow** where neither party can access the funds until both are satisfied.

Built on **Concordium smart contracts**, BlokRent ensures:

- ✅ **Zero unilateral control** – deposits are cryptographically secured on-chain
- ✅ **Transparent release conditions** – both parties must confirm, or auto-release triggers after return
- ✅ **Trustless arbitration** – smart contracts enforce the rules, not humans
- ✅ **Automatic refunds** – if the owner doesn't act after item return, funds auto-release to the renter

No middleman. No hidden fees. Just pure, auditable trust.

---

## Features

- 🔒 **Blockchain Escrow** – Deposits locked in Concordium smart contracts, inaccessible to both parties until conditions are met
- ⚡ **Instant Lock & Release** – Sign with your wallet, funds move in seconds
- ⏰ **Auto-Release Protection** – Deposits automatically refund if owner doesn't respond after item return
- 🔍 **On-Chain Transparency** – Every transaction verifiable on Concordium explorer

---

## Product walkthrough

### 1️⃣ Browse & Select

![BlokRent marketplace showing rental items like cameras, bikes, and tools with daily rates and security deposit amounts displayed below each item](docs/images/1-store.jpg)

Users browse available items with clear pricing: daily rate + refundable deposit.

---

### 2️⃣ Choose Rental Period

![Item detail page showing a camera with calendar date picker for selecting start and end dates, with calculated total cost breakdown](docs/images/2-deposit.jpg)

Select start and end dates. The system calculates total rental cost + deposit automatically.

---

### 3️⃣ Connect Wallet

**3a. New User (First Time)**

![Checkout page showing "Connect Wallet" button prominently displayed next to wallet status indicator](docs/images/4-wallet-not.jpg)

First-time users connect their Concordium Browser Wallet with a single click.

**3b. Returning User**

![Checkout page showing wallet already connected with address displayed and "Connected" status in green](docs/images/3-wallet-connected.jpg)

Returning users see their wallet pre-connected—just review and confirm.

---

### 4️⃣ Sign Transaction Prompt from Wallet

![Concordium wallet browser extension popup showing transaction details with amount and smart contract address, prompting user to sign](docs/images/5-sign-on-request.jpg)

Concordium wallet prompts for signature. Review the escrow contract details and confirm.

---

### 5️⃣ Deposit Locked securely on-chain.

![Success modal showing "Deposit Locked!" message with smart contract ID displayed and rental confirmation details](docs/images/deposit_locked.jpg)

Transaction confirmed! Your deposit is now secured in the smart contract.

---

### Note: On-Chain Verification

![Concordium testnet explorer showing smart contract with 100 CCD locked balance, proving funds are inaccessible to both parties](docs/images/5a-contract-filled.jpg)

View the contract on Concordium testnet—**100 CCD locked**. Neither owner nor renter can touch it.

#### Balance Before Deposit

![Wallet balance before making deposit](docs/images/deposit-rent-before-balance.jpg)

User's wallet balance before locking funds in escrow.

#### Balance After Deposit

![Wallet balance after deposit has been locked in smart contract](docs/images/depsotit-rent-after-balance.jpg)

Funds deducted and securely locked in the smart contract—**no one has access until conditions are met**.

---

### 7️⃣ Rental Complete

Item returned on time, in good condition. Both parties ready to finalize.

---

### 8️⃣ Owner Releases Deposit

![Admin dashboard showing active rentals with "Release Deposit" button next to completed rental entry](docs/images/admin-dashboard.jpg)

Owner logs into admin panel and clicks **Release Deposit**.

---

### 9️⃣ Confirm Release

![Concordium wallet popup asking owner to confirm deposit release transaction to renter's address](docs/images/deposit-will-be-returned.jpg)

Owner signs the release transaction in their wallet.

---

### 🔟 Refund Complete. No back and forth. Secure and automatic.

![Success confirmation showing "Deposit Released" with transaction hash and funds returning to renter's wallet address](docs/images/deposit-returned.jpg)

**Deposit refunded!** Renter receives their 100 CCD back. Transaction complete.

#### Balance After Refund - Funds Restored

![Wallet balance showing funds restored after deposit release](docs/images/depsotit-rent-after-balance.jpg)

Comparing with the [balance after initial deposit](#balance-after-deposit), you can see the locked funds have been **fully restored** to the renter's wallet. The escrow cycle is complete—**transparent, trustless, and automatic**.

---

## Tech Stack 🛠️

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Blockchain**: Concordium Testnet
- **Smart Contracts**: Rust (Concordium SDK)
- **Wallet Integration**: Concordium Browser Wallet API

---

## Getting Started 🚀

**⚠️ Note**: The smart contract powering the app is current live only on the testNet.

### Prerequisites

- Node.js 18+
- [Concordium Browser Wallet](https://chrome.google.com/webstore/detail/concordium-wallet/mnnkpffndmickbiakofclnpoiajlegmg) extension
- Testnet CCD (get from [Concordium faucet](https://testnet.ccdscan.io/faucet))

### Installation

```bash
# Clone the repository
git clone https://github.com/furqan-qadri/blockrent
cd blockrent

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## Future Roadmap 🗺️

- [ ] Connect PLT instead of CCD.
- [ ] Reputation system for renters and owners
- [ ] Integration with IoT smart locks
- [ ] Mobile app (iOS & Android)
- [ ] Deploy on mainNet

---

## Contributing 🤝

Contributions are welcome! Please open an issue or submit a pull request.

---

## License 📄

MIT License - see [LICENSE](LICENSE) file for details

---

## Contact 📧

Built with ❤️ for a trustless rental future at Encode London 2025 Hackathon

For questions or feedback, reach out me @+447899531122 or furqaanqadri@gmail.com

---
