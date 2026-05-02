# 🕹️ Metropolis Retro

> **"A high-speed strategic escape into the neon-soaked grid."**

Welcome to **Metropolis Retro**, an ultra-fast web application built for
enthusiasts of chess, classic gaming, and vintage aesthetics. Hosted on
**Vercel** and powered by **Next.js** with the **Bun** runtime, this
platform merges timeless 64-square logic with a high-performance,
retro-futuristic engine.

---

[![Basic Tests Workflow Status](https://github.com/metropolis-retro/metropolis-retro.github.io/actions/workflows/basic-tests.yml/badge.svg?branch=main)](https://github.com/metropolis-retro/metropolis-retro.github.io/actions/workflows/basic-tests.yml)
[![ls-lint Workflow Status](https://github.com/metropolis-retro/metropolis-retro.github.io/actions/workflows/ls-lint.yml/badge.svg?branch=main)](https://github.com/metropolis-retro/metropolis-retro.github.io/actions/workflows/ls-lint.yml)

---

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

## Docker Quickstart

### Development (hot reload)

```bash
docker compose -f docker-compose.dev.yml up --build
```

Then open [the app](http://localhost:3000), and your changes will hot-reload.

### Production

```bash
docker compose -f docker-compose.prod.yml up --build
```

Then open [the app](http://localhost:3000) – production optimized.

---

## 🤝 Contributing

We welcome contributions from developers who want to help push **Metropolis Retro** to the next level.
Whether you're fixing a bug, adding a feature, or improving our retro aesthetic — all moves are welcome.

### 📋 Prerequisites

Before contributing, ensure you have the following installed:

| Tool | Version | Purpose |
| ---- | ------- | ------- |
| [Bun](https://bun.sh/) | ≥ 1.3.11 | JavaScript runtime, package manager & test runner |
| [uv](https://docs.astral.sh/uv/) | latest | Python package manager for dev tooling (prek) |
| [Python](https://www.python.org/) | ≥ 3.13 | Required by uv and pre-commit tooling |
| [Node.js](https://nodejs.org/) | ≥ 24 | Required by some prek hook dependencies |
| [Git](https://git-scm.com/) | latest | Version control |

### 🚀 Getting Started

1. **Fork** the repository on GitHub and clone your fork:

   ```bash
   git clone https://github.com/<your-username>/metropolis-retro.github.io.git
   cd metropolis-retro.github.io
   ```

2. **Install all dependencies** (Python tooling + Node/Bun packages):

   ```bash
   make install
   ```

   This runs `uv sync` (Python/prek tools) and `bun install` (JavaScript packages).

3. **Start the development server:**

   ```bash
   make dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

### 🔧 Development Workflow

| Command | Description |
| ------- | ----------- |
| `make dev` | Start the Next.js dev server |
| `make build` | Build the Next.js app for production |
| `make lint` | Run ESLint on TypeScript/JavaScript files |
| `make prek` | Run all prek hooks against all files |
| `make prek-manual` | Run prek hooks with the manual stage |
| `make build-games` | Build all game sub-projects |
| `make clean` | Remove build artifacts and dependencies |
| `make help` | List all available Make targets |

### ✅ Code Quality Checks

All contributions must pass our three-pillar pre-commit strategy before merging:

1. **Standard hooks** (`make prek`) — trailing whitespace, YAML/JSON validation,
   spell checking, secret detection, ESLint, markdownlint, and more.
2. **Manual hooks** (`make prek-manual`) — file permission checks, image optimization.
3. **Audit hooks** (`prek run -a -c .pre-commit-config-audit.yaml`) — security-focused dependency scanning.

Run the full standard suite locally before opening a pull request:

```bash
make prek
```

### 🌿 Branch & Pull Request Guidelines

1. Create a **feature branch** from `main`:

   ```bash
   git checkout -b feat/your-feature-name
   ```

2. Make your changes, commit with a clear message, then push:

   ```bash
   git push origin feat/your-feature-name
   ```

3. Open a **Pull Request** against the `main` branch on GitHub.
4. Ensure all CI checks pass (workflows run automatically on every PR).
5. Request a review from a maintainer — see [CODEOWNERS](.github/CODEOWNERS).

### 🎨 Code Style

- **TypeScript / JavaScript** — enforced by ESLint (`eslint.config.mjs`) and
  Biome (`biome.json`). Run `make lint` to check.
- **Markdown** — line length ≤ 125 characters, enforced by markdownlint
  (config: `.github/linters/.markdown-lint.yml`).
- **YAML** — validated by yamllint (config: `.github/linters/.yaml-lint.yml`).
- **General** — follow the `.editorconfig` settings (UTF-8, LF line endings,
  trailing newline, no trailing whitespace).

## 🗂️ Generated Files & Paths

The following files and directories are **auto-generated** at build, install,
or test time. Most are excluded from the repository (listed in `.gitignore`);
a few are intentionally tracked.

**Not committed (excluded via `.gitignore`):**

| Path | Generated by | When |
| ---- | ------------ | ---- |
| `.next/` | `next build` / `next dev` | Build & dev server |
| `node_modules/` | `bun install` | Dependency install |
| `games/pacman/node_modules/` | `bun install` (inside `games/pacman/`) | Game build |
| `games/pacman/dist/` | `bun run build` (inside `games/pacman/`) | Pac-Man game build |
| `games/snake/node_modules/` | `bun install` (inside `games/snake/`) | Game build |
| `games/snake/dist/` | `bun run build` (inside `games/snake/`) | Snake game build |
| `next-env.d.ts` | `next dev` / `next build` | TypeScript type generation |
| `*.tsbuildinfo` | `tsc` / Next.js incremental builds | TypeScript incremental build |
| `.venv/` | `uv sync` | Python virtual environment |

**Committed (tracked in version control):**

| Path | Generated by | When |
| ---- | ------------ | ---- |
| `tests/**/__snapshots__/` | `bun run test:update` | Update existing snapshots |
| `bun.lock` | `bun install` | Bun lockfile |

> **Note:** Run `make clean` to remove `.next/`, `node_modules/`, and `.venv/`
> in one step. Generate or refresh snapshot files under
> `tests/**/__snapshots__/` with `bun run test:update`; they should be
> committed once generated — they are the baseline for regression detection.
