# 🕹️ Metropolis Retro

> **"A high-speed strategic escape into the neon-soaked grid."**

Welcome to **Metropolis Retro**, an ultra-fast web application built for
enthusiasts of chess, classic gaming, and vintage aesthetics. Hosted on
**Vercel** and powered by **Next.js** with the **Bun** runtime, this
platform merges timeless 64-square logic with a high-performance,
retro-futuristic engine.

-----

## ⚡ High-Performance Tech Stack

We utilize a modern, speed-first toolkit to ensure a lag-free experience for
players and developers:

- **Runtime:** [Bun](https://bun.sh/) – For lightning-fast installs, testing, and script execution.
- **Framework:** [Next.js](https://nextjs.org/) – Powering our hybrid static and dynamic gaming interface.
- **Deployment:** [Vercel](https://vercel.com/) – Global Edge Network delivery.
- **Quality Control:** Multi-tier [prek](https://prek.j178.dev) hooks via the pre-commit framework.

## 🛡️ Engineering Rigor

To maintain "Grandmaster" code quality, we employ a rigorous three-pillar
**pre-commit** strategy:

1. **Standard Hooks:** Automated linting, formatting, and syntax validation.
2. **Manual Verification:** Curated checks for retro-theming accuracy.
3. **Audit-Based Security:** Periodic hardening and dependency scanning to ensure a secure, production-ready environment.

## 🪝 prek hooks

- `prek run -a`: run all the hooks against all files
- `prek run -a --hook-stage manual`: run all manual hooks against all files
- `prek run -a -c .pre-commit-config-audit.yaml`: run all the audit based hooks against all files

## Using

### Development (hot reload):

```bash
docker compose -f docker-compose.dev.yml up --build
```

Then open http://localhost:3000 and edits will hot reload.

### Production:

```bash
docker compose -f docker-compose.prod.yml up --build
```

Then open http://localhost:3000 – production optimized.
