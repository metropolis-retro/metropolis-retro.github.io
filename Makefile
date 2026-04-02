# Using uv for Python 3.13 and bun for Next.js 16
PYTHON_RUN := uv run
BUN_RUN    := bun
PREK       := $(PYTHON_RUN) prek

# --- Colors ---
BLUE := \033[34m
GREEN := \033[32m
NC   := \033[0m

# CRITICAL: PHONY ensures 'make lint' runs the script, not looks for a 'lint' folder
.PHONY: help install dev build lint prek prek-update prek-manual clean

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Install dependencies (uv + bun)
	uv sync
	$(BUN_RUN) install

dev: ## Start Next.js dev server
	$(BUN_RUN) dev

build: ## Build Next.js app
	$(BUN_RUN) build

lint: ## Run eslint (Checks TS/JS)
	$(BUN_RUN) lint

# --- Prek Targets ---

prek: ## Run all prek hooks
	$(PREK) run --all-files

prek-manual: ## Run prek with an alternative config file (e.g. prek.local.toml)
	@echo "$(BLUE)Running prek with custom config...$(NC)"
	$(PREK) --config .pre-commit-config.yaml run --all-files --hook-stage manual

prek-update: ## Autoupdate prek hooks and refresh uv lock
	@echo "$(BLUE)Updating prek and hooks...$(NC)"
	$(PREK) autoupdate

# --- Maintenance ---

clean: ## Clean build artifacts
	rm -rf .next out node_modules .venv
	@echo "$(GREEN)Cleanup complete.$(NC)"
