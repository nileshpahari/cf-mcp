import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as tools from "./tools/index";

const server = new McpServer({ 
  name: "codeforces",
  version: "1.0.0"
});

// async function handler({ handles }: { handles: string[] }):Promise<any>  {
//     const users = await getUsersInfo(handles);
//     return { content: [{ type: "text", text: JSON.stringify(users, null, 2) }] };
// }
// server.registerTool(tools.getUserInfoTool.name, {
//   description: tools.getUserInfoTool.description,
//   title: tools.getUserInfoTool.title,
//   inputSchema: tools.getUserInfoTool.inputSchema
// }, handler
// )

for (const tool of Object.values(tools)) {
  server.registerTool(
    tool.name,
    {
      title: tool.title,
      description: tool.description,
      inputSchema: tool.inputSchema,
    },
    tool.handler
  );
}

const transport = new StdioServerTransport();
(async () => {
  await server.connect(transport);
})();