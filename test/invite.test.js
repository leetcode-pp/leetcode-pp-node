const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({ auth: process.env.token });

octokit.rest.teams.addOrUpdateMembershipForUserInOrg({
  org: "leetcode-pp",
  team_slug: "91algo-4",
  username: "rfhklwt",
});
