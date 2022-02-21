import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    reactionsListForTeamDiscussionCommentInOrg: build.query<
      ReactionsListForTeamDiscussionCommentInOrgApiResponse,
      ReactionsListForTeamDiscussionCommentInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/discussions/${queryArg.discussionNumber}/comments/${queryArg.commentNumber}/reactions`,
        params: {
          content: queryArg.content,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    reactionsCreateForTeamDiscussionCommentInOrg: build.mutation<
      ReactionsCreateForTeamDiscussionCommentInOrgApiResponse,
      ReactionsCreateForTeamDiscussionCommentInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/discussions/${queryArg.discussionNumber}/comments/${queryArg.commentNumber}/reactions`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reactionsDeleteForTeamDiscussionComment: build.mutation<
      ReactionsDeleteForTeamDiscussionCommentApiResponse,
      ReactionsDeleteForTeamDiscussionCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/discussions/${queryArg.discussionNumber}/comments/${queryArg.commentNumber}/reactions/${queryArg.reactionId}`,
        method: "DELETE",
      }),
    }),
    reactionsListForTeamDiscussionInOrg: build.query<
      ReactionsListForTeamDiscussionInOrgApiResponse,
      ReactionsListForTeamDiscussionInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/discussions/${queryArg.discussionNumber}/reactions`,
        params: {
          content: queryArg.content,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    reactionsCreateForTeamDiscussionInOrg: build.mutation<
      ReactionsCreateForTeamDiscussionInOrgApiResponse,
      ReactionsCreateForTeamDiscussionInOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/discussions/${queryArg.discussionNumber}/reactions`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reactionsDeleteForTeamDiscussion: build.mutation<
      ReactionsDeleteForTeamDiscussionApiResponse,
      ReactionsDeleteForTeamDiscussionApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/teams/${queryArg.teamSlug}/discussions/${queryArg.discussionNumber}/reactions/${queryArg.reactionId}`,
        method: "DELETE",
      }),
    }),
    reactionsListForCommitComment: build.query<
      ReactionsListForCommitCommentApiResponse,
      ReactionsListForCommitCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/comments/${queryArg.commentId}/reactions`,
        params: {
          content: queryArg.content,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    reactionsCreateForCommitComment: build.mutation<
      ReactionsCreateForCommitCommentApiResponse,
      ReactionsCreateForCommitCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/comments/${queryArg.commentId}/reactions`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reactionsDeleteForCommitComment: build.mutation<
      ReactionsDeleteForCommitCommentApiResponse,
      ReactionsDeleteForCommitCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/comments/${queryArg.commentId}/reactions/${queryArg.reactionId}`,
        method: "DELETE",
      }),
    }),
    reactionsListForIssueComment: build.query<
      ReactionsListForIssueCommentApiResponse,
      ReactionsListForIssueCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues/comments/${queryArg.commentId}/reactions`,
        params: {
          content: queryArg.content,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    reactionsCreateForIssueComment: build.mutation<
      ReactionsCreateForIssueCommentApiResponse,
      ReactionsCreateForIssueCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues/comments/${queryArg.commentId}/reactions`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reactionsDeleteForIssueComment: build.mutation<
      ReactionsDeleteForIssueCommentApiResponse,
      ReactionsDeleteForIssueCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues/comments/${queryArg.commentId}/reactions/${queryArg.reactionId}`,
        method: "DELETE",
      }),
    }),
    reactionsListForIssue: build.query<
      ReactionsListForIssueApiResponse,
      ReactionsListForIssueApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues/${queryArg.issueNumber}/reactions`,
        params: {
          content: queryArg.content,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    reactionsCreateForIssue: build.mutation<
      ReactionsCreateForIssueApiResponse,
      ReactionsCreateForIssueApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues/${queryArg.issueNumber}/reactions`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reactionsDeleteForIssue: build.mutation<
      ReactionsDeleteForIssueApiResponse,
      ReactionsDeleteForIssueApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues/${queryArg.issueNumber}/reactions/${queryArg.reactionId}`,
        method: "DELETE",
      }),
    }),
    reactionsListForPullRequestReviewComment: build.query<
      ReactionsListForPullRequestReviewCommentApiResponse,
      ReactionsListForPullRequestReviewCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/comments/${queryArg.commentId}/reactions`,
        params: {
          content: queryArg.content,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    reactionsCreateForPullRequestReviewComment: build.mutation<
      ReactionsCreateForPullRequestReviewCommentApiResponse,
      ReactionsCreateForPullRequestReviewCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/comments/${queryArg.commentId}/reactions`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reactionsDeleteForPullRequestComment: build.mutation<
      ReactionsDeleteForPullRequestCommentApiResponse,
      ReactionsDeleteForPullRequestCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/pulls/comments/${queryArg.commentId}/reactions/${queryArg.reactionId}`,
        method: "DELETE",
      }),
    }),
    reactionsCreateForRelease: build.mutation<
      ReactionsCreateForReleaseApiResponse,
      ReactionsCreateForReleaseApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/releases/${queryArg.releaseId}/reactions`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reactionsListForTeamDiscussionCommentLegacy: build.query<
      ReactionsListForTeamDiscussionCommentLegacyApiResponse,
      ReactionsListForTeamDiscussionCommentLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/discussions/${queryArg.discussionNumber}/comments/${queryArg.commentNumber}/reactions`,
        params: {
          content: queryArg.content,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    reactionsCreateForTeamDiscussionCommentLegacy: build.mutation<
      ReactionsCreateForTeamDiscussionCommentLegacyApiResponse,
      ReactionsCreateForTeamDiscussionCommentLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/discussions/${queryArg.discussionNumber}/comments/${queryArg.commentNumber}/reactions`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    reactionsListForTeamDiscussionLegacy: build.query<
      ReactionsListForTeamDiscussionLegacyApiResponse,
      ReactionsListForTeamDiscussionLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/discussions/${queryArg.discussionNumber}/reactions`,
        params: {
          content: queryArg.content,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    reactionsCreateForTeamDiscussionLegacy: build.mutation<
      ReactionsCreateForTeamDiscussionLegacyApiResponse,
      ReactionsCreateForTeamDiscussionLegacyApiArg
    >({
      query: (queryArg) => ({
        url: `/teams/${queryArg.teamId}/discussions/${queryArg.discussionNumber}/reactions`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type ReactionsListForTeamDiscussionCommentInOrgApiResponse =
  /** status 200 Response */ Reaction[];
export type ReactionsListForTeamDiscussionCommentInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  discussionNumber: number;
  commentNumber: number;
  /** Returns a single [reaction type](https://docs.github.com/rest/reference/reactions#reaction-types). Omit this parameter to list all reactions to a team discussion comment. */
  content?:
    | "+1"
    | "-1"
    | "laugh"
    | "confused"
    | "heart"
    | "hooray"
    | "rocket"
    | "eyes";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReactionsCreateForTeamDiscussionCommentInOrgApiResponse =
  /** status 200 Response */ Reaction | /** status 201 Response */ Reaction;
export type ReactionsCreateForTeamDiscussionCommentInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  discussionNumber: number;
  commentNumber: number;
  body: {
    content:
      | "+1"
      | "-1"
      | "laugh"
      | "confused"
      | "heart"
      | "hooray"
      | "rocket"
      | "eyes";
  };
};
export type ReactionsDeleteForTeamDiscussionCommentApiResponse = unknown;
export type ReactionsDeleteForTeamDiscussionCommentApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  discussionNumber: number;
  commentNumber: number;
  reactionId: number;
};
export type ReactionsListForTeamDiscussionInOrgApiResponse =
  /** status 200 Response */ Reaction[];
export type ReactionsListForTeamDiscussionInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  discussionNumber: number;
  /** Returns a single [reaction type](https://docs.github.com/rest/reference/reactions#reaction-types). Omit this parameter to list all reactions to a team discussion. */
  content?:
    | "+1"
    | "-1"
    | "laugh"
    | "confused"
    | "heart"
    | "hooray"
    | "rocket"
    | "eyes";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReactionsCreateForTeamDiscussionInOrgApiResponse =
  /** status 200 Response */ Reaction | /** status 201 Response */ Reaction;
export type ReactionsCreateForTeamDiscussionInOrgApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  discussionNumber: number;
  body: {
    content:
      | "+1"
      | "-1"
      | "laugh"
      | "confused"
      | "heart"
      | "hooray"
      | "rocket"
      | "eyes";
  };
};
export type ReactionsDeleteForTeamDiscussionApiResponse = unknown;
export type ReactionsDeleteForTeamDiscussionApiArg = {
  org: string;
  /** team_slug parameter */
  teamSlug: string;
  discussionNumber: number;
  reactionId: number;
};
export type ReactionsListForCommitCommentApiResponse =
  /** status 200 Response */ Reaction[];
export type ReactionsListForCommitCommentApiArg = {
  owner: string;
  repo: string;
  /** comment_id parameter */
  commentId: number;
  /** Returns a single [reaction type](https://docs.github.com/rest/reference/reactions#reaction-types). Omit this parameter to list all reactions to a commit comment. */
  content?:
    | "+1"
    | "-1"
    | "laugh"
    | "confused"
    | "heart"
    | "hooray"
    | "rocket"
    | "eyes";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReactionsCreateForCommitCommentApiResponse =
  /** status 200 Reaction exists */
    | Reaction
    | /** status 201 Reaction created */ Reaction;
export type ReactionsCreateForCommitCommentApiArg = {
  owner: string;
  repo: string;
  /** comment_id parameter */
  commentId: number;
  body: {
    content:
      | "+1"
      | "-1"
      | "laugh"
      | "confused"
      | "heart"
      | "hooray"
      | "rocket"
      | "eyes";
  };
};
export type ReactionsDeleteForCommitCommentApiResponse = unknown;
export type ReactionsDeleteForCommitCommentApiArg = {
  owner: string;
  repo: string;
  /** comment_id parameter */
  commentId: number;
  reactionId: number;
};
export type ReactionsListForIssueCommentApiResponse =
  /** status 200 Response */ Reaction[];
export type ReactionsListForIssueCommentApiArg = {
  owner: string;
  repo: string;
  /** comment_id parameter */
  commentId: number;
  /** Returns a single [reaction type](https://docs.github.com/rest/reference/reactions#reaction-types). Omit this parameter to list all reactions to an issue comment. */
  content?:
    | "+1"
    | "-1"
    | "laugh"
    | "confused"
    | "heart"
    | "hooray"
    | "rocket"
    | "eyes";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReactionsCreateForIssueCommentApiResponse =
  /** status 200 Reaction exists */
    | Reaction
    | /** status 201 Reaction created */ Reaction;
export type ReactionsCreateForIssueCommentApiArg = {
  owner: string;
  repo: string;
  /** comment_id parameter */
  commentId: number;
  body: {
    content:
      | "+1"
      | "-1"
      | "laugh"
      | "confused"
      | "heart"
      | "hooray"
      | "rocket"
      | "eyes";
  };
};
export type ReactionsDeleteForIssueCommentApiResponse = unknown;
export type ReactionsDeleteForIssueCommentApiArg = {
  owner: string;
  repo: string;
  /** comment_id parameter */
  commentId: number;
  reactionId: number;
};
export type ReactionsListForIssueApiResponse =
  /** status 200 Response */ Reaction[];
export type ReactionsListForIssueApiArg = {
  owner: string;
  repo: string;
  /** issue_number parameter */
  issueNumber: number;
  /** Returns a single [reaction type](https://docs.github.com/rest/reference/reactions#reaction-types). Omit this parameter to list all reactions to an issue. */
  content?:
    | "+1"
    | "-1"
    | "laugh"
    | "confused"
    | "heart"
    | "hooray"
    | "rocket"
    | "eyes";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReactionsCreateForIssueApiResponse = /** status 200 Response */
  | Reaction
  | /** status 201 Response */ Reaction;
export type ReactionsCreateForIssueApiArg = {
  owner: string;
  repo: string;
  /** issue_number parameter */
  issueNumber: number;
  body: {
    content:
      | "+1"
      | "-1"
      | "laugh"
      | "confused"
      | "heart"
      | "hooray"
      | "rocket"
      | "eyes";
  };
};
export type ReactionsDeleteForIssueApiResponse = unknown;
export type ReactionsDeleteForIssueApiArg = {
  owner: string;
  repo: string;
  /** issue_number parameter */
  issueNumber: number;
  reactionId: number;
};
export type ReactionsListForPullRequestReviewCommentApiResponse =
  /** status 200 Response */ Reaction[];
export type ReactionsListForPullRequestReviewCommentApiArg = {
  owner: string;
  repo: string;
  /** comment_id parameter */
  commentId: number;
  /** Returns a single [reaction type](https://docs.github.com/rest/reference/reactions#reaction-types). Omit this parameter to list all reactions to a pull request review comment. */
  content?:
    | "+1"
    | "-1"
    | "laugh"
    | "confused"
    | "heart"
    | "hooray"
    | "rocket"
    | "eyes";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReactionsCreateForPullRequestReviewCommentApiResponse =
  /** status 200 Reaction exists */
    | Reaction
    | /** status 201 Reaction created */ Reaction;
export type ReactionsCreateForPullRequestReviewCommentApiArg = {
  owner: string;
  repo: string;
  /** comment_id parameter */
  commentId: number;
  body: {
    content:
      | "+1"
      | "-1"
      | "laugh"
      | "confused"
      | "heart"
      | "hooray"
      | "rocket"
      | "eyes";
  };
};
export type ReactionsDeleteForPullRequestCommentApiResponse = unknown;
export type ReactionsDeleteForPullRequestCommentApiArg = {
  owner: string;
  repo: string;
  /** comment_id parameter */
  commentId: number;
  reactionId: number;
};
export type ReactionsCreateForReleaseApiResponse =
  /** status 200 Reaction exists */
    | Reaction
    | /** status 201 Reaction created */ Reaction;
export type ReactionsCreateForReleaseApiArg = {
  owner: string;
  repo: string;
  /** release_id parameter */
  releaseId: number;
  body: {
    content: "+1" | "laugh" | "heart" | "hooray" | "rocket" | "eyes";
  };
};
export type ReactionsListForTeamDiscussionCommentLegacyApiResponse =
  /** status 200 Response */ Reaction[];
export type ReactionsListForTeamDiscussionCommentLegacyApiArg = {
  teamId: number;
  discussionNumber: number;
  commentNumber: number;
  /** Returns a single [reaction type](https://docs.github.com/rest/reference/reactions#reaction-types). Omit this parameter to list all reactions to a team discussion comment. */
  content?:
    | "+1"
    | "-1"
    | "laugh"
    | "confused"
    | "heart"
    | "hooray"
    | "rocket"
    | "eyes";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReactionsCreateForTeamDiscussionCommentLegacyApiResponse =
  /** status 201 Response */ Reaction;
export type ReactionsCreateForTeamDiscussionCommentLegacyApiArg = {
  teamId: number;
  discussionNumber: number;
  commentNumber: number;
  body: {
    content:
      | "+1"
      | "-1"
      | "laugh"
      | "confused"
      | "heart"
      | "hooray"
      | "rocket"
      | "eyes";
  };
};
export type ReactionsListForTeamDiscussionLegacyApiResponse =
  /** status 200 Response */ Reaction[];
export type ReactionsListForTeamDiscussionLegacyApiArg = {
  teamId: number;
  discussionNumber: number;
  /** Returns a single [reaction type](https://docs.github.com/rest/reference/reactions#reaction-types). Omit this parameter to list all reactions to a team discussion. */
  content?:
    | "+1"
    | "-1"
    | "laugh"
    | "confused"
    | "heart"
    | "hooray"
    | "rocket"
    | "eyes";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type ReactionsCreateForTeamDiscussionLegacyApiResponse =
  /** status 201 Response */ Reaction;
export type ReactionsCreateForTeamDiscussionLegacyApiArg = {
  teamId: number;
  discussionNumber: number;
  body: {
    content:
      | "+1"
      | "-1"
      | "laugh"
      | "confused"
      | "heart"
      | "hooray"
      | "rocket"
      | "eyes";
  };
};
export type SimpleUser = {
  name?: string | null;
  email?: string | null;
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  starred_at?: string;
} | null;
export type Reaction = {
  id: number;
  node_id: string;
  user: SimpleUser;
  content:
    | "+1"
    | "-1"
    | "laugh"
    | "confused"
    | "heart"
    | "hooray"
    | "rocket"
    | "eyes";
  created_at: string;
};
export type BasicError = {
  message?: string;
  documentation_url?: string;
  url?: string;
  status?: string;
};
export type ValidationError = {
  message: string;
  documentation_url: string;
  errors?: {
    resource?: string;
    field?: string;
    message?: string;
    code: string;
    index?: number;
    value?: (string | null) | (number | null) | (string[] | null);
  }[];
};
export const {
  useReactionsListForTeamDiscussionCommentInOrgQuery,
  useReactionsCreateForTeamDiscussionCommentInOrgMutation,
  useReactionsDeleteForTeamDiscussionCommentMutation,
  useReactionsListForTeamDiscussionInOrgQuery,
  useReactionsCreateForTeamDiscussionInOrgMutation,
  useReactionsDeleteForTeamDiscussionMutation,
  useReactionsListForCommitCommentQuery,
  useReactionsCreateForCommitCommentMutation,
  useReactionsDeleteForCommitCommentMutation,
  useReactionsListForIssueCommentQuery,
  useReactionsCreateForIssueCommentMutation,
  useReactionsDeleteForIssueCommentMutation,
  useReactionsListForIssueQuery,
  useReactionsCreateForIssueMutation,
  useReactionsDeleteForIssueMutation,
  useReactionsListForPullRequestReviewCommentQuery,
  useReactionsCreateForPullRequestReviewCommentMutation,
  useReactionsDeleteForPullRequestCommentMutation,
  useReactionsCreateForReleaseMutation,
  useReactionsListForTeamDiscussionCommentLegacyQuery,
  useReactionsCreateForTeamDiscussionCommentLegacyMutation,
  useReactionsListForTeamDiscussionLegacyQuery,
  useReactionsCreateForTeamDiscussionLegacyMutation,
} = injectedRtkApi;
