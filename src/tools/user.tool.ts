import { z } from "zod";
import { getUsersInfo,
  getRatingChange,
  getBlogEntries,
  getSubmissions,
  getSubmissionsWithSourceCodes,
  getOnlineFriends,
  getFriends,
  getRatedUserListWithActiveAndRetired,
} from "../methods/user.method";
import { Secret, UserSubmissionProps } from "../lib/types";

export const getUserInfoTool = {
  name: "get_user_info",
  title: "Get User Info",
  description: "Fetch public profile information for one or more Codeforces users.",
  inputSchema: {
    handles: z.array(z.string()).min(1, "At least one handle is required"),
  },
  handler: async ({ handles }: { handles: string[] }):Promise<any> => {
    const users = await getUsersInfo(handles);
    return { content: [{ type: "text", text: JSON.stringify(users, null, 2) }] };
  },
};

export const getUserRatingChangesTool = {
  name: "get_user_rating_changes",
  title: "Get User Rating Changes",
  description: "Fetch the rating history for a given Codeforces user.",
  inputSchema: {
    handle: z.string(),
  },
  handler: async ({ handle }: { handle: string }):Promise<any> => {
    const rating = await getRatingChange(handle);
    return { content: [{ type: "text", text: JSON.stringify(rating, null, 2) }] };
  },
};

export const getUserBlogEntriesTool = {
  name: "get_user_blog_entries",
  title: "Get Blog Entries",
  description: "Fetch blog entries created by the specified Codeforces user.",
  inputSchema: {
    handle: z.string(),
  },
  handler: async ({ handle }: {handle: string}):Promise<any> => {
    const blogs = await getBlogEntries(handle);
    return { content: [{ type: "text", text: JSON.stringify(blogs, null, 2) }] };
  },
};

export const getUserSubmissionsTool = {
  name: "get_user_submissions",
  title: "Get User Submissions",
  description: "Fetch recent submissions of a specified Codeforces user (no source code).",
  inputSchema: {
    handle: z.string(),
    from: z.string(),
    count: z.string(),
  },
  handler: async ({ handle, from, count }: UserSubmissionProps):Promise<any> => {
    const submissions = await getSubmissions({ handle, from, count });
    return { content: [{ type: "text", text: JSON.stringify(submissions, null, 2) }] };
  },
};

export const getUserSubmissionsWithSourceTool = {
  name: "get_user_submissions_with_source",
  title: "Get Submissions With Source Code",
  description: "Fetch authenticated user's submissions along with source code.",
  inputSchema: {
    handle: z.string(),
    from: z.string(),
    count: z.string(),
    apiKey: z.string(),
    apiSecret: z.string(),
  },
  handler: async ({ handle, from, count, apiKey, apiSecret }: UserSubmissionProps & Secret):Promise<any> => {
    const subs = await getSubmissionsWithSourceCodes({ handle, from, count, apiKey, apiSecret });
    return { content: [{ type: "text", text: JSON.stringify(subs, null, 2) }] };
  },
};

export const getOnlineFriendsTool = {
  name: "get_online_friends",
  title: "Get Online Friends",
  description: "Fetch the authenticated user's online Codeforces friends.",
  inputSchema: {
    apiKey: z.string(),
    apiSecret: z.string(),
  },
  handler: async ({ apiKey, apiSecret }: Secret):Promise<any> => {
    const friends = await getOnlineFriends({ apiKey, apiSecret });
    return { content: [{ type: "text", text: JSON.stringify(friends, null, 2) }] };
  },
};

export const getAllFriendsTool = {
  name: "get_all_friends",
  title: "Get All Friends",
  description: "Fetch all Codeforces friends for the authenticated user.",
  inputSchema: {
    apiKey: z.string(),
    apiSecret: z.string(),
  },
  handler: async ({ apiKey, apiSecret }: Secret):Promise<any> => {
    const friends = await getFriends({ apiKey, apiSecret });
    return { content: [{ type: "text", text: JSON.stringify(friends, null, 2) }] };
  },
};

export const getRatedUserListTool = {
  name: "get_rated_user_list",
  title: "Get Rated User List",
  description: "Get Codeforces users who have participated in rated contests recently.",
  inputSchema: {},
  handler: async ():Promise<any> => {
    const users = await getRatedUserListWithActiveAndRetired();
    return { content: [{ type: "text", text: JSON.stringify(users, null, 2) }] };
  },
};
