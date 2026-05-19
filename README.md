# Personal AI Assistant with OpenClaw

A personal AI assistant powered by [OpenClaw](https://github.com/openagentsinc/openclaw) and built with [AgentKit](https://github.com/anthropics/agentkit). This repository contains custom agents and MCP (Model Context Protocol) servers that extend the assistant's capabilities.

⚠️ **Work in Progress** — This project is actively under development. Components, APIs, and documentation may change significantly. Check back for updates.

## Overview

This project aims to create a fully-featured personal AI assistant by collecting and integrating specialized agents and MCP servers. Each component extends the assistant's capabilities to interact with external services, perform calculations, and execute complex workflows.

## Quick Start

### Prerequisites

- Node.js 18.14.1 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd <repo-name>

# Install dependencies
npm install
```

### Configuration

1. Copy environment template (when available):

```bash
cp .env.example .env
```

2. Add your configuration values to `.env`

## Project Structure

```
.
├── mcp/                          # MCP (Model Context Protocol) servers and clients
│   ├── calculator-server/        # Calculator MCP server
│   │   ├── src/
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── calculator-client/        # Calculator MCP client (tests server)
│       ├── src/
│       ├── package.json
│       └── tsconfig.json
├── agents/                       # Custom agents (coming soon)
├── agentkit.json                # AgentKit configuration
├── agentkit-lock.json           # AgentKit lock file
├── .gitignore
└── README.md
```

## Current Components

### MCP Servers

#### Calculator Server

A complete MCP (Model Context Protocol) server built with TypeScript that provides math operations, dynamic prompts, and resources.

**Location:** `./mcp/calculator-server`

**Status:** ✅ Implemented

**Features:**

- **Tools:** 
  - `add(a, b)` - Add two numbers
  - `subtract(a, b)` - Subtract two numbers
- **Prompts:**
  - `test-prompt` - Dynamic prompt that takes user input and generates meaningful output
- **Resources:**
  - `greeting://{name}` - Returns personalized greeting messages
- Type-safe operations with Zod validation

### MCP Clients

#### Calculator Client

A test client that demonstrates how to connect to and consume MCP servers.

**Location:** `./mcp/calculator-client`

**Status:** ✅ Implemented

**Features:**

- Connects to calculator-server via stdio transport
- Lists all available tools, resources, and prompts
- Invokes prompts and demonstrates client-server communication
- Example of MCP client implementation using the official SDK

---

## Planned Components

- [ ] Task management MCP server
- [ ] Weather/climate integration
- [ ] Note-taking and memory MCP server
- [ ] Calendar integration
- [ ] Custom agents for specific workflows
- [ ] Retrieval-augmented generation (RAG) agent

## Development

### Building MCP Servers

Each MCP server is a self-contained TypeScript project:

```bash
cd mcp/calculator-server

# Install dependencies
npm install

# Build
npm run build

# Run
npm start
```

### Building MCP Clients

MCP clients connect to servers and consume their capabilities:

```bash
cd mcp/calculator-client

# Install dependencies
npm install

# Build
npm run build

# Run (starts calculator-server automatically)
npm start
```

### Building Agents

Agents will be implemented using AgentKit and OpenClaw patterns.

## Usage

> Documentation for running the full assistant will be added as development progresses.

```bash
# Running the assistant (coming soon)
npm run start:assistant
```

## Contributing

This is a personal project. If you have suggestions or improvements, feel free to open an issue or discussion.

## Roadmap

- [x] Initial project setup with AgentKit
- [x] Calculator MCP server with tools, prompts, and resources
- [x] Calculator MCP client implementation
- [ ] Phase 2: Additional MCP servers (task management, weather, notes)
- [ ] Phase 3: Custom agents
- [ ] Phase 4: Full assistant deployment
- [ ] Phase 5: Production optimization

## Architecture Notes

- Built on OpenClaw for agent orchestration
- AgentKit for foundational components
- MCP protocol for extensible integrations
- TypeScript for type safety across all components

## References

- [OpenClaw Documentation](https://github.com/openagentsinc/openclaw)
- [AgentKit](https://github.com/fagom/agentkit)
- [Model Context Protocol](https://modelcontextprotocol.io/)
