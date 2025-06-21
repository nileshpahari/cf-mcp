import crypto from "crypto";
import { AuthURLParams } from "../types";

const baseURL = "https://codeforces.com/api";

export const generateAuthURL = ({
  method,
  params,
  secret,
}: AuthURLParams): string => {

  const time = Math.floor(Date.now() / 1000).toString();
  const rand = Math.random().toString(36).substring(2, 8);

  const fullParams: Record<string, string> = {
    ...params,
    apiKey: secret.apiKey,
    time,
  };

  const sortedParams = Object.entries(fullParams).sort((a, b) =>
    a[0] === b[0] ? a[1].localeCompare(b[1]) : a[0].localeCompare(b[0])
  );

  const queryString = sortedParams.map(([k, v]) => `${k}=${v}`).join("&");

  const toHash = `${rand}/${method}?${queryString}#${secret.apiSecret}`;
  const hash = crypto.createHash("sha512").update(toHash).digest("hex");
  const apiSig = rand + hash;

  return `${baseURL}/${method}?${queryString}&apiSig=${apiSig}`;
};
