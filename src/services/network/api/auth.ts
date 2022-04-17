import { Octokit } from "@octokit/core";

export const getOctoAuth = (): Octokit => {
  const octokit = new Octokit({
    auth: process.env.REACT_APP_PAT_AUTH,
  });

  return octokit;
};
