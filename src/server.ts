import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from "axios";
// Create an MCP server
const server = new McpServer({
  name: "codeforces",
  version: "1.0.0"
});

// // Add an addition tool
// server.tool("add",
//   {
//     title: "Addition Tool",
//     description: "Add two numbers",
//     inputSchema: { a: z.number(), b: z.number() }
//   },
//   async ({ a, b }) => ({
//     content: [{ type: "text", text: String(a + b) }]
//   })
// );

// interface User {

// handle: string
// email: string
// vkId: string
// openId: string
// firstName: string
// lastName: string
// country: string
// city: string
// organization: string
// contribution: number
// rank: string
// rating: number
// maxRank: string
// maxRating: number
// lastOnlineTimeSeconds: number
// registrationTimeSeconds: number
// friendOfCount: number
// avatar: string
// titlePhoto: string
// }

server.tool("get-user-info",
  {
    title: "Get User Info",
    description: "Gets details about a codeforces handle",
    inputSchema: { handle: z.string() }
  }, async ({ handle }) => {
   try {
  const res = await axios.get(`https://codeforces.com/api/user.info?handles=${handle}`);
  const user = res.data.result[0];
  return {
    content: [{ type: "text", text: JSON.stringify(user, null, 2) }]
  };
} catch (error) {
  return {
    content: [{ type: "text", text: `Error fetching user info for handle "${handle}".` }]
  };
}
  })

// Add a dynamic greeting resource
server.resource(
  "greeting",
  new ResourceTemplate("greeting://{name}", { list: undefined }),
  { 
    title: "Greeting Resource",      // Display name for UI
    description: "Dynamic greeting generator"
  },
  async (uri, { name }) => ({
    contents: [{
      uri: uri.href,
      text: `Hello, ${name}!`
    }]
  })
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
(async () => {
  await server.connect(transport);
})();