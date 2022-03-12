import { Octokit } from "@octokit/core";

export const getOctoAuth = (): Octokit => {
  const octokit = new Octokit({
    auth: `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`,
  });

  return octokit;
};
