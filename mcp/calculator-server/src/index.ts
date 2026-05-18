import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
  name: "Calculator Server",
  version: "1.0.0",
});

server.tool("add", { a: z.number(), b: z.number() }, ({ a, b }) => ({
  content: [{ type: "text", text: String(a + b) }],
}));

server.registerTool(
  "subtract",
  {
    inputSchema: { a: z.number(), b: z.number() },
  },
  ({ a, b }) => ({ content: [{ type: "text", text: String(a - b) }] }),
);

server.resource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  async (uri, { name }) => ({
    contents: [
      {
        uri: uri.href,
        text: `Hello, ${name}!`,
      },
    ],
  }),
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);
