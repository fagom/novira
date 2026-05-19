import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

async function main() {
  const transport = new StdioClientTransport({
    command: "node",
    args: ["../calculator-server/build/index.js"],
  });

  const client = new Client({
    name: "Calculator Client",
    version: "1.0.0",
  });
  await client.connect(transport);

  const tools = await client.listTools();
  console.log("Available tools:", tools);

  const resources = await client.listResources();
  console.log("Available resources:", resources);

  const prompts = await client.listPrompts();
  console.log("Available prompts:", prompts);

  const promptResponse = await client.getPrompt({
    name: "test-prompt",
    arguments: { input: "What is the meaning of life?" },
  });
  console.log("Prompt response:", promptResponse.messages);
}

main();
