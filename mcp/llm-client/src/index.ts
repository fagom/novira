import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Transport } from "@modelcontextprotocol/sdk/shared/transport.js";
import { z } from "zod";
import OpenAI from "openai";
import { config } from "dotenv";

config();

class MCPClient {
  private openai: OpenAI;
  private client: Client;
  constructor() {
    this.openai = new OpenAI({
      baseURL: process.env.OPENAI_BASE_URL,
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.client = new Client({
      name: "LLM Client",
      version: "1.0.0",
    });
  }

  async connectToServer(transport: Transport) {
    await this.client.connect(transport);
    this.run();
  }

  async run() {
    const toolsResult = await this.client.listTools();
    const tools = toolsResult.tools.map((tool) => {
      return this.openAiToolAdapter({
        name: tool.name,
        description: tool.description,
        input_schema: tool.inputSchema,
      });
    });

    // 1. Create messages that's input for the LLM
    const prompt = "What is 1/2?";

    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: "user",
        content: prompt,
      },
    ];

    console.log("Querying LLM: ", messages[0].content);

    // 2. Calling the LLM
    let response = this.openai.chat.completions.create({
      model: "gemini-2.5-flash-lite",
      max_tokens: 1000,
      messages,
      tools: tools,
    });

    let results: any[] = [];

    // 3. Go through the LLM response,for each choice, check if it has tool calls
    (await response).choices.map(async (choice: { message: any }) => {
      const message = choice.message;
      console.log("LLM response: ", message);
      if (message.tool_calls) {
        console.log("Making tool call");
        await this.callTools(message.tool_calls, results);
      }
    });
  }

  openAiToolAdapter(tool: {
    name: string;
    description?: string;
    input_schema: any;
  }) {
    const schema = z.object(tool.input_schema);
    return {
      type: "function" as const, // Explicitly set type to "function"
      function: {
        name: tool.name,
        description: tool.description,
        parameters: {
          type: "object",
          properties: tool.input_schema.properties,
          required: tool.input_schema.required,
        },
      },
    };
  }

  async callTools(
    tool_calls: OpenAI.Chat.Completions.ChatCompletionMessageToolCall[],
    tool_results: any,
  ) {
    for (const tool_call of tool_calls) {
      if (tool_call.type !== "function") continue;

      const toolName = tool_call.function.name;
      const args = tool_call.function.arguments;

      console.log(`Calling tool ${toolName} with args ${JSON.stringify(args)}`);

      // 2. Call the server's tool
      const toolResult = await this.client.callTool({
        name: toolName,
        arguments: JSON.parse(args),
      });

      console.log("Tool result: ", toolResult);

      // 3. Do something with the result
      // TODO
    }
  }
}

let mcpClient = new MCPClient();
const transport = new StdioClientTransport({
  command: "node",
  args: ["../calculator-server/build/index.js"],
});
mcpClient.connectToServer(transport);
