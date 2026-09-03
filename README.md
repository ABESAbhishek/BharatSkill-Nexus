# BHARATSKILL NEXUS

> **Tagline:** *"Learn. Contribute. Earn. Grow."*  
> **Track:** **🔥 Agentic Solutions: Powered by x402**  
> **Blockchain:** **Algorand TestNet** (via GoPlausible Facilitator & LoRA TestNet Explorer)

---

## 🌟 Executive Summary

**BharatSkill Nexus** is an **Agentic Skill-to-Opportunity Ecosystem** that connects student skills, peer learning networks, autonomous AI opportunity discovery, and decentralized value exchange powered by **x402 on Algorand**.

Students can:
1. **Map & Diagnose Skills:** Autonomous AI agents evaluate candidate portfolios, compute opportunity readiness, and generate actionable 4-phase growth roadmaps.
2. **Peer Skill Exchange:** Share knowledge and earn **SkillCredits** (Layer 01 &bull; Community Economy) through peer reviews and mentorship.
3. **Discover High-Match Opportunities:** Intelligently match with internships, hackathons, bounties, and fellowships.
4. **Access On-Demand Agent Intelligence via x402:** Pay-per-inference micropayments settling in sub-seconds with Algorand finality via the **GoPlausible Facilitator** &mdash; zero recurring subscription lock-in.

---

## ⚡ x402 + Algorand Architecture & Track Compliance

BharatSkill Nexus operates on the **`x402-avm`** standard for internet-native micropayments:

```
[Candidate / AI Agent] 
       │
       ▼ (1) Requests Deep Intelligence Report
[BharatSkill Resource Server]
       │
       ▼ (2) Returns HTTP 402 Payment Required + GoPlausible Headers
[x402 Authorization Client]
       │
       ▼ (3) Submits Micro-ALGO Transfer (0.10 ALGO)
[GoPlausible Facilitator & Algorand TestNet]
       │
       ▼ (4) Block Finalized in ~2.8s & Verified on LoRA Explorer
[AI Agent Inference Unlocked ✓]
```

### 🔗 Blockchain & Protocol Reference
- **x402 Packages:** `@x402-avm/core`, `@x402-avm/avm`, `algosdk`
- **Settlement Facilitator:** GoPlausible Facilitator (`https://facilitator.goplausible.xyz`)
- **Algorand Node:** `https://testnet-api.algonode.cloud`
- **LoRA TestNet Explorer:** [https://lora.algokit.io/testnet](https://lora.algokit.io/testnet)

---

## 💎 Dual Economic Architecture

| Layer | Economic Mechanism | Purpose & Utility |
|---|---|---|
| **Layer 01 &bull; SkillCredits** | Non-monetary internal reputation | Earned through peer reviews, code reviews, onboarding milestones, and community contributions. |
| **Layer 02 &bull; x402 Payments** | Algorand TestNet Micropayments | Sub-second pay-per-use micropayments (₹2 &ndash; ₹5 / 0.04 &ndash; 0.10 ALGO) to unlock high-compute agent reports. |

---

## 📱 Key Modules & Features

### 1. 🏠 Modern Monochrome Landing Page (`/`)
- High-contrast, sleek **Black & White** theme with supporting neon accents.
- Interactive hero graph demonstrating live Algorand consensus, SkillCredits, and opportunity readiness.

### 2. 🚀 Multi-Step Onboarding Engine (`/onboarding`)
- Collects student credentials, core technical stack, career ambitions, and preferred learning styles.
- Automatically calculates Profile Completeness Score and mints starter SkillCredits.

### 3. 👤 Skill Identity Profile (`/profile`)
- Visual skill graph breakdown into Strengths, Growing Competencies, and Opportunity Blockers.
- Quick session management with cross-tab logout synchronization.

### 4. 🧠 Agentic Skill Intelligence Engine (`/analysis`)
- Autonomous multi-step analysis pipeline simulating reasoning, gap detection, and market calibration.
- 4-Phase personalized growth roadmaps and direct x402 strategic report upgrades.

### 5. 🎯 AI Opportunity Hub (`/opportunities`)
- Real-time matching algorithm scoring 14+ student opportunities (Hackathons, Internships, Bounties, Fellowships).
- Transparent *"Why This Match?"* score breakdown and application prep checklist mode (+25 SkillCredits reward bonus).

### 6. 📊 Unified Command Dashboard (`/dashboard`)
- Personal Career Operating System answering: *Who am I professionally? How am I progressing? What should I do next?*
- Time-aware greeting, Next Best Action engine, and growth streaks.

### 7. ⚡ x402 Agent Services Catalog (`/payments`)
- 4 specialized pay-per-inference AI capabilities:
  - 🧠 **Deep Career Intelligence Report** (0.10 ALGO / ₹5)
  - 🎯 **Opportunity Application Optimization** (0.06 ALGO / ₹3)
  - 🗺 **Advanced Growth Roadmap & Starter Blueprints** (0.10 ALGO / ₹5)
  - ⚡ **Instant Agent Re-Evaluation** (0.04 ALGO / ₹2)
- **5-Step Animated Payment Modal** showing HTTP 402 &rarr; GoPlausible Header &rarr; Algorand Settlement &rarr; LoRA State Proof &rarr; Unlocked Report.
- **Agent Commerce Ledger** tracking transaction hashes with direct clickable links to **LoRA Algorand TestNet Explorer**.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, React Router v6
- **Backend:** Node.js, Express.js (ESM), TypeScript, tsx
- **Blockchain & Protocol:** Algorand TestNet, `algosdk`, `@x402-avm/core`, `@x402-avm/avm`, GoPlausible Facilitator
- **Monorepo Management:** npm workspaces with concurrent development runners

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18+ recommended)
- npm (v9+)
- Git

### 2. Installation
Clone the repository and install all dependencies:
```bash
git clone https://github.com/ABESAbhishek/BharatSkill-Nexus.git
cd BharatSkill-Nexus
npm install
```

### 3. Start Development Environment
Run both backend (`http://localhost:5000`) and frontend (`http://localhost:5173`) concurrently:
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```

---

## 🧪 Verification & Health Check

- Backend Health API: `GET http://localhost:5000/api/health`
- Agent Services Catalog: `GET http://localhost:5000/api/payments/services`
- Frontend Portal: `http://localhost:5173`
- Agent Services (x402): `http://localhost:5173/payments`

---

## 👥 Authors & Acknowledgments

- **BharatSkill Nexus Team** &mdash; *Empowering India's students through agentic skill intelligence and decentralized micropayments.*
- Powered by **x402-AVM**, **GoPlausible**, and the **Algorand Foundation**.
