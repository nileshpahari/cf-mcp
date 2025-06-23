import axios from "axios";
import { User, BlogEntry, RatingChange, Secret, UserSubmissionProps } from "../lib/types";
import { generateAuthURL } from "../lib/utils/generateAuth";
const baseURL = `https://codeforces.com/api`


export const getUsersInfo = async (handles: string[]) => {
  try {
    const res = await axios.get(`${baseURL}/user.info?handles=${handles.join(";")}&checkHistoricHandles=true`);
    const user: User[] = res.data.result;
    return user;
  } catch (error) {
    console.error(`Error fetching user info for the handles "${handles.join(", ")}":`, error);
    return null;
  }
};

export const getOnlineFriends = async ({apiKey, apiSecret}: Secret) => {
  try {
    const url = generateAuthURL({
      method: "user.friends",
      params: { onlyOnline: "true" },
      secret: { apiKey, apiSecret },
    });
    const res = await axios.get(url);
    const friends: User[] = res.data.result;
    return friends;
  } catch (error) {
    console.error(`Error fetching online friends":`, error);
    return null;
  }
};

export const getFriends = async ({apiKey, apiSecret}: Secret) => {
  try {
    const url = generateAuthURL({
      method: "user.friends",
      params: { onlyOnline: "false" },
      secret: { apiKey, apiSecret },
    });
    const res = await axios.get(url);
    const friends: User[] = res.data.result;
    return friends;
  } catch (error) {
    console.error(`Error fetching friends":`, error);
    return null;
  }
};

export const getBlogEntries = async (handle: string)=>{
  try {
    const res = await axios.get(`${baseURL}/user.blogEntries?handle=${handle}`);
    const blogs: BlogEntry[] = res.data.result;
    if(blogs.length>0){
      return blogs;
    } else {
      console.log(`No blogs for the handle ${handle}`);
      return null;
    }
  } catch (error) {
   console.error(`Error fetching blogs of the handle ${handle}`) 
   return null;
  }
}

export const getRatingChange = async (handle: string)=>{
  try {
   const res = await axios.get(`${baseURL}/user.rating?handle=${handle}`);
   const ratingChange: RatingChange[] = res.data.result;
   return ratingChange;
  } catch (error) {
   console.log(`Error while fetching the rating changes for the handle ${handle}`);
   return null;
  }
}

export const getSubmissions = async ({handle, from, count}: UserSubmissionProps) => {
  /*from: 1-based index of the first submission to return.
  count: Number of returned submissions.*/
  try {
   const res = await axios.get(`${baseURL}/user.status?handle=${handle}&from=${from}&count=${count}`);
   const submissions = res.data.result;
   return submissions
  } catch (error) {
    console.log(`Failed to fetch the submissions for the handle ${handle}`);
    return null;
  }
}
export const getSubmissionsWithSourceCodes = async ({handle, from, count, apiKey, apiSecret}: UserSubmissionProps & Secret) => {
  /*from: 1-based index of the first submission to return.
  count: Number of returned submissions.*/
  try {
   const url = generateAuthURL({
    method: "user.status",
    params: { handle, from, count, includeSources: "true" },
    secret: { apiKey, apiSecret },
   })
   const res = await axios.get(url);
   const submissions = res.data.result;
   return submissions
  } catch (error) {
    console.log(`Failed to fetch the submissions for the handle ${handle}`);
    return null;
  }
}

export const getRatedUserListWithActiveAndRetired = async ()=>{
  try {
   const res = axios.get(`${baseURL}/user.ratedList?activeOnly=true&includeRetired=false`) 
  } catch (error) {
    
  }
}