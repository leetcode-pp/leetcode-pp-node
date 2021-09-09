const { Octokit } = require("@octokit/rest");
const octokit = new Octokit({ auth: process.env.issueToken });

octokit.rest.issues
  .listComments({
    owner: "leetcode-pp",
    repo: "91alg-5",
    issue_number: 1,
  })
  .then((res) => {
    console.log(res.data.map((q) => q.user.login));
  });
