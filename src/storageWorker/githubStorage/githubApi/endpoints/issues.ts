import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    issuesList: build.query<IssuesListApiResponse, IssuesListApiArg>({
      query: (queryArg) => ({
        url: `/issues`,
        params: {
          filter: queryArg.filter,
          state: queryArg.state,
          labels: queryArg.labels,
          sort: queryArg.sort,
          direction: queryArg.direction,
          since: queryArg.since,
          collab: queryArg.collab,
          orgs: queryArg.orgs,
          owned: queryArg.owned,
          pulls: queryArg.pulls,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    issuesListForOrg: build.query<
      IssuesListForOrgApiResponse,
      IssuesListForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/issues`,
        params: {
          filter: queryArg.filter,
          state: queryArg.state,
          labels: queryArg.labels,
          sort: queryArg.sort,
          direction: queryArg.direction,
          since: queryArg.since,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    issuesListAssignees: build.query<
      IssuesListAssigneesApiResponse,
      IssuesListAssigneesApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/assignees`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    issuesCheckUserCanBeAssigned: build.query<
      IssuesCheckUserCanBeAssignedApiResponse,
      IssuesCheckUserCanBeAssignedApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/assignees/${queryArg.assignee}`,
      }),
    }),
    issuesListForRepo: build.query<
      IssuesListForRepoApiResponse,
      IssuesListForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues`,
        params: {
          milestone: queryArg.milestone,
          state: queryArg.state,
          assignee: queryArg.assignee,
          creator: queryArg.creator,
          mentioned: queryArg.mentioned,
          labels: queryArg.labels,
          sort: queryArg.sort,
          direction: queryArg.direction,
          since: queryArg.since,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    issuesCreate: build.mutation<IssuesCreateApiResponse, IssuesCreateApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    issuesListCommentsForRepo: build.query<
      IssuesListCommentsForRepoApiResponse,
      IssuesListCommentsForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues/comments`,
        params: {
          sort: queryArg.sort,
          direction: queryArg.direction,
          since: queryArg.since,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    issuesGetComment: build.query<
      IssuesGetCommentApiResponse,
      IssuesGetCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues/comments/${queryArg.commentId}`,
      }),
    }),
    issuesUpdateComment: build.mutation<
      IssuesUpdateCommentApiResponse,
      IssuesUpdateCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues/comments/${queryArg.commentId}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    issuesDeleteComment: build.mutation<
      IssuesDeleteCommentApiResponse,
      IssuesDeleteCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues/comments/${queryArg.commentId}`,
        method: "DELETE",
      }),
    }),
    issuesListEventsForRepo: build.query<
      IssuesListEventsForRepoApiResponse,
      IssuesListEventsForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues/events`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    issuesGetEvent: build.query<
      IssuesGetEventApiResponse,
      IssuesGetEventApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues/events/${queryArg.eventId}`,
      }),
    }),
    issuesGet: build.query<IssuesGetApiResponse, IssuesGetApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues/${queryArg.issueNumber}`,
      }),
    }),
    issuesUpdate: build.mutation<IssuesUpdateApiResponse, IssuesUpdateApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues/${queryArg.issueNumber}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    issuesAddAssignees: build.mutation<
      IssuesAddAssigneesApiResponse,
      IssuesAddAssigneesApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues/${queryArg.issueNumber}/assignees`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    issuesRemoveAssignees: build.mutation<
      IssuesRemoveAssigneesApiResponse,
      IssuesRemoveAssigneesApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues/${queryArg.issueNumber}/assignees`,
        method: "DELETE",
        body: queryArg.body,
      }),
    }),
    issuesListComments: build.query<
      IssuesListCommentsApiResponse,
      IssuesListCommentsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues/${queryArg.issueNumber}/comments`,
        params: {
          since: queryArg.since,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    issuesCreateComment: build.mutation<
      IssuesCreateCommentApiResponse,
      IssuesCreateCommentApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues/${queryArg.issueNumber}/comments`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    issuesListEvents: build.query<
      IssuesListEventsApiResponse,
      IssuesListEventsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues/${queryArg.issueNumber}/events`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    issuesListLabelsOnIssue: build.query<
      IssuesListLabelsOnIssueApiResponse,
      IssuesListLabelsOnIssueApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues/${queryArg.issueNumber}/labels`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    issuesAddLabels: build.mutation<
      IssuesAddLabelsApiResponse,
      IssuesAddLabelsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues/${queryArg.issueNumber}/labels`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    issuesSetLabels: build.mutation<
      IssuesSetLabelsApiResponse,
      IssuesSetLabelsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues/${queryArg.issueNumber}/labels`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    issuesRemoveAllLabels: build.mutation<
      IssuesRemoveAllLabelsApiResponse,
      IssuesRemoveAllLabelsApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues/${queryArg.issueNumber}/labels`,
        method: "DELETE",
      }),
    }),
    issuesRemoveLabel: build.mutation<
      IssuesRemoveLabelApiResponse,
      IssuesRemoveLabelApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues/${queryArg.issueNumber}/labels/${queryArg.name}`,
        method: "DELETE",
      }),
    }),
    issuesLock: build.mutation<IssuesLockApiResponse, IssuesLockApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues/${queryArg.issueNumber}/lock`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    issuesUnlock: build.mutation<IssuesUnlockApiResponse, IssuesUnlockApiArg>({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues/${queryArg.issueNumber}/lock`,
        method: "DELETE",
      }),
    }),
    issuesListEventsForTimeline: build.query<
      IssuesListEventsForTimelineApiResponse,
      IssuesListEventsForTimelineApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/issues/${queryArg.issueNumber}/timeline`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    issuesListLabelsForRepo: build.query<
      IssuesListLabelsForRepoApiResponse,
      IssuesListLabelsForRepoApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/labels`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    issuesCreateLabel: build.mutation<
      IssuesCreateLabelApiResponse,
      IssuesCreateLabelApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/labels`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    issuesGetLabel: build.query<
      IssuesGetLabelApiResponse,
      IssuesGetLabelApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/labels/${queryArg.name}`,
      }),
    }),
    issuesUpdateLabel: build.mutation<
      IssuesUpdateLabelApiResponse,
      IssuesUpdateLabelApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/labels/${queryArg.name}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    issuesDeleteLabel: build.mutation<
      IssuesDeleteLabelApiResponse,
      IssuesDeleteLabelApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/labels/${queryArg.name}`,
        method: "DELETE",
      }),
    }),
    issuesListMilestones: build.query<
      IssuesListMilestonesApiResponse,
      IssuesListMilestonesApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/milestones`,
        params: {
          state: queryArg.state,
          sort: queryArg.sort,
          direction: queryArg.direction,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
    issuesCreateMilestone: build.mutation<
      IssuesCreateMilestoneApiResponse,
      IssuesCreateMilestoneApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/milestones`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    issuesGetMilestone: build.query<
      IssuesGetMilestoneApiResponse,
      IssuesGetMilestoneApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/milestones/${queryArg.milestoneNumber}`,
      }),
    }),
    issuesUpdateMilestone: build.mutation<
      IssuesUpdateMilestoneApiResponse,
      IssuesUpdateMilestoneApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/milestones/${queryArg.milestoneNumber}`,
        method: "PATCH",
        body: queryArg.body,
      }),
    }),
    issuesDeleteMilestone: build.mutation<
      IssuesDeleteMilestoneApiResponse,
      IssuesDeleteMilestoneApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/milestones/${queryArg.milestoneNumber}`,
        method: "DELETE",
      }),
    }),
    issuesListLabelsForMilestone: build.query<
      IssuesListLabelsForMilestoneApiResponse,
      IssuesListLabelsForMilestoneApiArg
    >({
      query: (queryArg) => ({
        url: `/repos/${queryArg.owner}/${queryArg.repo}/milestones/${queryArg.milestoneNumber}/labels`,
        params: { per_page: queryArg.perPage, page: queryArg.page },
      }),
    }),
    issuesListForAuthenticatedUser: build.query<
      IssuesListForAuthenticatedUserApiResponse,
      IssuesListForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/issues`,
        params: {
          filter: queryArg.filter,
          state: queryArg.state,
          labels: queryArg.labels,
          sort: queryArg.sort,
          direction: queryArg.direction,
          since: queryArg.since,
          per_page: queryArg.perPage,
          page: queryArg.page,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type IssuesListApiResponse = /** status 200 Response */ Issue[];
export type IssuesListApiArg = {
  /** Indicates which sorts of issues to return. Can be one of:
    \* `assigned`: Issues assigned to you
    \* `created`: Issues created by you
    \* `mentioned`: Issues mentioning you
    \* `subscribed`: Issues you're subscribed to updates for
    \* `all` or `repos`: All issues the authenticated user can see, regardless of participation or creation */
  filter?:
    | "assigned"
    | "created"
    | "mentioned"
    | "subscribed"
    | "repos"
    | "all";
  /** Indicates the state of the issues to return. Can be either `open`, `closed`, or `all`. */
  state?: "open" | "closed" | "all";
  /** A list of comma separated label names. Example: `bug,ui,@high` */
  labels?: string;
  /** What to sort results by. Can be either `created`, `updated`, `comments`. */
  sort?: "created" | "updated" | "comments";
  /** One of `asc` (ascending) or `desc` (descending). */
  direction?: "asc" | "desc";
  /** Only show notifications updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  since?: string;
  collab?: boolean;
  orgs?: boolean;
  owned?: boolean;
  pulls?: boolean;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type IssuesListForOrgApiResponse = /** status 200 Response */ Issue[];
export type IssuesListForOrgApiArg = {
  org: string;
  /** Indicates which sorts of issues to return. Can be one of:
    \* `assigned`: Issues assigned to you
    \* `created`: Issues created by you
    \* `mentioned`: Issues mentioning you
    \* `subscribed`: Issues you're subscribed to updates for
    \* `all` or `repos`: All issues the authenticated user can see, regardless of participation or creation */
  filter?:
    | "assigned"
    | "created"
    | "mentioned"
    | "subscribed"
    | "repos"
    | "all";
  /** Indicates the state of the issues to return. Can be either `open`, `closed`, or `all`. */
  state?: "open" | "closed" | "all";
  /** A list of comma separated label names. Example: `bug,ui,@high` */
  labels?: string;
  /** What to sort results by. Can be either `created`, `updated`, `comments`. */
  sort?: "created" | "updated" | "comments";
  /** One of `asc` (ascending) or `desc` (descending). */
  direction?: "asc" | "desc";
  /** Only show notifications updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  since?: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type IssuesListAssigneesApiResponse =
  /** status 200 Response */ SimpleUser2[];
export type IssuesListAssigneesApiArg = {
  owner: string;
  repo: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type IssuesCheckUserCanBeAssignedApiResponse =
  /** status 204 If the `assignee` can be assigned to issues in the repository, a `204` header with no content is returned. */ undefined;
export type IssuesCheckUserCanBeAssignedApiArg = {
  owner: string;
  repo: string;
  assignee: string;
};
export type IssuesListForRepoApiResponse = /** status 200 Response */ Issue[];
export type IssuesListForRepoApiArg = {
  owner: string;
  repo: string;
  /** If an `integer` is passed, it should refer to a milestone by its `number` field. If the string `*` is passed, issues with any milestone are accepted. If the string `none` is passed, issues without milestones are returned. */
  milestone?: string;
  /** Indicates the state of the issues to return. Can be either `open`, `closed`, or `all`. */
  state?: "open" | "closed" | "all";
  /** Can be the name of a user. Pass in `none` for issues with no assigned user, and `*` for issues assigned to any user. */
  assignee?: string;
  /** The user that created the issue. */
  creator?: string;
  /** A user that's mentioned in the issue. */
  mentioned?: string;
  /** A list of comma separated label names. Example: `bug,ui,@high` */
  labels?: string;
  /** What to sort results by. Can be either `created`, `updated`, `comments`. */
  sort?: "created" | "updated" | "comments";
  /** One of `asc` (ascending) or `desc` (descending). */
  direction?: "asc" | "desc";
  /** Only show notifications updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  since?: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type IssuesCreateApiResponse = /** status 201 Response */ Issue;
export type IssuesCreateApiArg = {
  owner: string;
  repo: string;
  body: {
    title: string | number;
    body?: string;
    assignee?: string | null;
    milestone?: (string | number) | null;
    labels?: (
      | string
      | {
          id?: number;
          name?: string;
          description?: string | null;
          color?: string | null;
        }
    )[];
    assignees?: string[];
  };
};
export type IssuesListCommentsForRepoApiResponse =
  /** status 200 Response */ IssueComment[];
export type IssuesListCommentsForRepoApiArg = {
  owner: string;
  repo: string;
  /** One of `created` (when the repository was starred) or `updated` (when it was last pushed to). */
  sort?: "created" | "updated";
  /** Either `asc` or `desc`. Ignored without the `sort` parameter. */
  direction?: "asc" | "desc";
  /** Only show notifications updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  since?: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type IssuesGetCommentApiResponse =
  /** status 200 Response */ IssueComment;
export type IssuesGetCommentApiArg = {
  owner: string;
  repo: string;
  /** comment_id parameter */
  commentId: number;
};
export type IssuesUpdateCommentApiResponse =
  /** status 200 Response */ IssueComment;
export type IssuesUpdateCommentApiArg = {
  owner: string;
  repo: string;
  /** comment_id parameter */
  commentId: number;
  body: {
    body: string;
  };
};
export type IssuesDeleteCommentApiResponse = unknown;
export type IssuesDeleteCommentApiArg = {
  owner: string;
  repo: string;
  /** comment_id parameter */
  commentId: number;
};
export type IssuesListEventsForRepoApiResponse =
  /** status 200 Response */ IssueEvent[];
export type IssuesListEventsForRepoApiArg = {
  owner: string;
  repo: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type IssuesGetEventApiResponse = /** status 200 Response */ IssueEvent;
export type IssuesGetEventApiArg = {
  owner: string;
  repo: string;
  eventId: number;
};
export type IssuesGetApiResponse = /** status 200 Response */ Issue;
export type IssuesGetApiArg = {
  owner: string;
  repo: string;
  /** issue_number parameter */
  issueNumber: number;
};
export type IssuesUpdateApiResponse = /** status 200 Response */ Issue;
export type IssuesUpdateApiArg = {
  owner: string;
  repo: string;
  /** issue_number parameter */
  issueNumber: number;
  body: {
    title?: (string | number) | null;
    body?: string | null;
    assignee?: string | null;
    state?: "open" | "closed";
    milestone?: (string | number) | null;
    labels?: (
      | string
      | {
          id?: number;
          name?: string;
          description?: string | null;
          color?: string | null;
        }
    )[];
    assignees?: string[];
  };
};
export type IssuesAddAssigneesApiResponse = /** status 201 Response */ Issue;
export type IssuesAddAssigneesApiArg = {
  owner: string;
  repo: string;
  /** issue_number parameter */
  issueNumber: number;
  body: {
    assignees?: string[];
  };
};
export type IssuesRemoveAssigneesApiResponse = /** status 200 Response */ Issue;
export type IssuesRemoveAssigneesApiArg = {
  owner: string;
  repo: string;
  /** issue_number parameter */
  issueNumber: number;
  body: {
    assignees?: string[];
  };
};
export type IssuesListCommentsApiResponse =
  /** status 200 Response */ IssueComment[];
export type IssuesListCommentsApiArg = {
  owner: string;
  repo: string;
  /** issue_number parameter */
  issueNumber: number;
  /** Only show notifications updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  since?: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type IssuesCreateCommentApiResponse =
  /** status 201 Response */ IssueComment;
export type IssuesCreateCommentApiArg = {
  owner: string;
  repo: string;
  /** issue_number parameter */
  issueNumber: number;
  body: {
    body: string;
  };
};
export type IssuesListEventsApiResponse =
  /** status 200 Response */ IssueEventForIssue[];
export type IssuesListEventsApiArg = {
  owner: string;
  repo: string;
  /** issue_number parameter */
  issueNumber: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type IssuesListLabelsOnIssueApiResponse =
  /** status 200 Response */ Label[];
export type IssuesListLabelsOnIssueApiArg = {
  owner: string;
  repo: string;
  /** issue_number parameter */
  issueNumber: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type IssuesAddLabelsApiResponse = /** status 200 Response */ Label[];
export type IssuesAddLabelsApiArg = {
  owner: string;
  repo: string;
  /** issue_number parameter */
  issueNumber: number;
  body:
    | {
        labels?: string[];
      }
    | string[]
    | {
        labels?: {
          name: string;
        }[];
      }
    | {
        name: string;
      }[]
    | string;
};
export type IssuesSetLabelsApiResponse = /** status 200 Response */ Label[];
export type IssuesSetLabelsApiArg = {
  owner: string;
  repo: string;
  /** issue_number parameter */
  issueNumber: number;
  body:
    | {
        labels?: string[];
      }
    | string[]
    | {
        labels?: {
          name: string;
        }[];
      }
    | {
        name: string;
      }[]
    | string;
};
export type IssuesRemoveAllLabelsApiResponse =
  /** status 204 Response */ undefined;
export type IssuesRemoveAllLabelsApiArg = {
  owner: string;
  repo: string;
  /** issue_number parameter */
  issueNumber: number;
};
export type IssuesRemoveLabelApiResponse = /** status 200 Response */ Label[];
export type IssuesRemoveLabelApiArg = {
  owner: string;
  repo: string;
  /** issue_number parameter */
  issueNumber: number;
  name: string;
};
export type IssuesLockApiResponse = /** status 204 Response */ undefined;
export type IssuesLockApiArg = {
  owner: string;
  repo: string;
  /** issue_number parameter */
  issueNumber: number;
  body: {
    lock_reason?: "off-topic" | "too heated" | "resolved" | "spam";
  } | null;
};
export type IssuesUnlockApiResponse = /** status 204 Response */ undefined;
export type IssuesUnlockApiArg = {
  owner: string;
  repo: string;
  /** issue_number parameter */
  issueNumber: number;
};
export type IssuesListEventsForTimelineApiResponse =
  /** status 200 Response */ TimelineEvent[];
export type IssuesListEventsForTimelineApiArg = {
  owner: string;
  repo: string;
  /** issue_number parameter */
  issueNumber: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type IssuesListLabelsForRepoApiResponse =
  /** status 200 Response */ Label[];
export type IssuesListLabelsForRepoApiArg = {
  owner: string;
  repo: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type IssuesCreateLabelApiResponse = /** status 201 Response */ Label;
export type IssuesCreateLabelApiArg = {
  owner: string;
  repo: string;
  body: {
    name: string;
    color?: string;
    description?: string;
  };
};
export type IssuesGetLabelApiResponse = /** status 200 Response */ Label;
export type IssuesGetLabelApiArg = {
  owner: string;
  repo: string;
  name: string;
};
export type IssuesUpdateLabelApiResponse = /** status 200 Response */ Label;
export type IssuesUpdateLabelApiArg = {
  owner: string;
  repo: string;
  name: string;
  body: {
    new_name?: string;
    color?: string;
    description?: string;
  };
};
export type IssuesDeleteLabelApiResponse = unknown;
export type IssuesDeleteLabelApiArg = {
  owner: string;
  repo: string;
  name: string;
};
export type IssuesListMilestonesApiResponse =
  /** status 200 Response */ Milestone2[];
export type IssuesListMilestonesApiArg = {
  owner: string;
  repo: string;
  /** The state of the milestone. Either `open`, `closed`, or `all`. */
  state?: "open" | "closed" | "all";
  /** What to sort results by. Either `due_on` or `completeness`. */
  sort?: "due_on" | "completeness";
  /** The direction of the sort. Either `asc` or `desc`. */
  direction?: "asc" | "desc";
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type IssuesCreateMilestoneApiResponse =
  /** status 201 Response */ Milestone2;
export type IssuesCreateMilestoneApiArg = {
  owner: string;
  repo: string;
  body: {
    title: string;
    state?: "open" | "closed";
    description?: string;
    due_on?: string;
  };
};
export type IssuesGetMilestoneApiResponse =
  /** status 200 Response */ Milestone2;
export type IssuesGetMilestoneApiArg = {
  owner: string;
  repo: string;
  /** milestone_number parameter */
  milestoneNumber: number;
};
export type IssuesUpdateMilestoneApiResponse =
  /** status 200 Response */ Milestone2;
export type IssuesUpdateMilestoneApiArg = {
  owner: string;
  repo: string;
  /** milestone_number parameter */
  milestoneNumber: number;
  body: {
    title?: string;
    state?: "open" | "closed";
    description?: string;
    due_on?: string;
  };
};
export type IssuesDeleteMilestoneApiResponse =
  /** status 204 Response */ undefined;
export type IssuesDeleteMilestoneApiArg = {
  owner: string;
  repo: string;
  /** milestone_number parameter */
  milestoneNumber: number;
};
export type IssuesListLabelsForMilestoneApiResponse =
  /** status 200 Response */ Label[];
export type IssuesListLabelsForMilestoneApiArg = {
  owner: string;
  repo: string;
  /** milestone_number parameter */
  milestoneNumber: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
};
export type IssuesListForAuthenticatedUserApiResponse =
  /** status 200 Response */ Issue[];
export type IssuesListForAuthenticatedUserApiArg = {
  /** Indicates which sorts of issues to return. Can be one of:
    \* `assigned`: Issues assigned to you
    \* `created`: Issues created by you
    \* `mentioned`: Issues mentioning you
    \* `subscribed`: Issues you're subscribed to updates for
    \* `all` or `repos`: All issues the authenticated user can see, regardless of participation or creation */
  filter?:
    | "assigned"
    | "created"
    | "mentioned"
    | "subscribed"
    | "repos"
    | "all";
  /** Indicates the state of the issues to return. Can be either `open`, `closed`, or `all`. */
  state?: "open" | "closed" | "all";
  /** A list of comma separated label names. Example: `bug,ui,@high` */
  labels?: string;
  /** What to sort results by. Can be either `created`, `updated`, `comments`. */
  sort?: "created" | "updated" | "comments";
  /** One of `asc` (ascending) or `desc` (descending). */
  direction?: "asc" | "desc";
  /** Only show notifications updated after the given time. This is a timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: `YYYY-MM-DDTHH:MM:SSZ`. */
  since?: string;
  /** Results per page (max 100) */
  perPage?: number;
  /** Page number of the results to fetch. */
  page?: number;
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
export type SimpleUser2 = {
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
};
export type Milestone = {
  url: string;
  html_url: string;
  labels_url: string;
  id: number;
  node_id: string;
  number: number;
  state: "open" | "closed";
  title: string;
  description: string | null;
  creator: SimpleUser;
  open_issues: number;
  closed_issues: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  due_on: string | null;
} | null;
export type LicenseSimple = {
  key: string;
  name: string;
  url: string | null;
  spdx_id: string | null;
  node_id: string;
  html_url?: string;
} | null;
export type Repository = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  license: LicenseSimple;
  organization?: SimpleUser;
  forks: number;
  permissions?: {
    admin: boolean;
    pull: boolean;
    triage?: boolean;
    push: boolean;
    maintain?: boolean;
  };
  owner: SimpleUser2;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  archive_url: string;
  assignees_url: string;
  blobs_url: string;
  branches_url: string;
  collaborators_url: string;
  comments_url: string;
  commits_url: string;
  compare_url: string;
  contents_url: string;
  contributors_url: string;
  deployments_url: string;
  downloads_url: string;
  events_url: string;
  forks_url: string;
  git_commits_url: string;
  git_refs_url: string;
  git_tags_url: string;
  git_url: string;
  issue_comment_url: string;
  issue_events_url: string;
  issues_url: string;
  keys_url: string;
  labels_url: string;
  languages_url: string;
  merges_url: string;
  milestones_url: string;
  notifications_url: string;
  pulls_url: string;
  releases_url: string;
  ssh_url: string;
  stargazers_url: string;
  statuses_url: string;
  subscribers_url: string;
  subscription_url: string;
  tags_url: string;
  teams_url: string;
  trees_url: string;
  clone_url: string;
  mirror_url: string | null;
  hooks_url: string;
  svn_url: string;
  homepage: string | null;
  language: string | null;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
  size: number;
  default_branch: string;
  open_issues_count: number;
  is_template?: boolean;
  topics?: string[];
  has_issues: boolean;
  has_projects: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_downloads: boolean;
  archived: boolean;
  disabled: boolean;
  visibility?: string;
  pushed_at: string | null;
  created_at: string | null;
  updated_at: string | null;
  allow_rebase_merge?: boolean;
  template_repository?: {
    id?: number;
    node_id?: string;
    name?: string;
    full_name?: string;
    owner?: {
      login?: string;
      id?: number;
      node_id?: string;
      avatar_url?: string;
      gravatar_id?: string;
      url?: string;
      html_url?: string;
      followers_url?: string;
      following_url?: string;
      gists_url?: string;
      starred_url?: string;
      subscriptions_url?: string;
      organizations_url?: string;
      repos_url?: string;
      events_url?: string;
      received_events_url?: string;
      type?: string;
      site_admin?: boolean;
    };
    private?: boolean;
    html_url?: string;
    description?: string;
    fork?: boolean;
    url?: string;
    archive_url?: string;
    assignees_url?: string;
    blobs_url?: string;
    branches_url?: string;
    collaborators_url?: string;
    comments_url?: string;
    commits_url?: string;
    compare_url?: string;
    contents_url?: string;
    contributors_url?: string;
    deployments_url?: string;
    downloads_url?: string;
    events_url?: string;
    forks_url?: string;
    git_commits_url?: string;
    git_refs_url?: string;
    git_tags_url?: string;
    git_url?: string;
    issue_comment_url?: string;
    issue_events_url?: string;
    issues_url?: string;
    keys_url?: string;
    labels_url?: string;
    languages_url?: string;
    merges_url?: string;
    milestones_url?: string;
    notifications_url?: string;
    pulls_url?: string;
    releases_url?: string;
    ssh_url?: string;
    stargazers_url?: string;
    statuses_url?: string;
    subscribers_url?: string;
    subscription_url?: string;
    tags_url?: string;
    teams_url?: string;
    trees_url?: string;
    clone_url?: string;
    mirror_url?: string;
    hooks_url?: string;
    svn_url?: string;
    homepage?: string;
    language?: string;
    forks_count?: number;
    stargazers_count?: number;
    watchers_count?: number;
    size?: number;
    default_branch?: string;
    open_issues_count?: number;
    is_template?: boolean;
    topics?: string[];
    has_issues?: boolean;
    has_projects?: boolean;
    has_wiki?: boolean;
    has_pages?: boolean;
    has_downloads?: boolean;
    archived?: boolean;
    disabled?: boolean;
    visibility?: string;
    pushed_at?: string;
    created_at?: string;
    updated_at?: string;
    permissions?: {
      admin?: boolean;
      maintain?: boolean;
      push?: boolean;
      triage?: boolean;
      pull?: boolean;
    };
    allow_rebase_merge?: boolean;
    temp_clone_token?: string;
    allow_squash_merge?: boolean;
    allow_auto_merge?: boolean;
    delete_branch_on_merge?: boolean;
    allow_update_branch?: boolean;
    allow_merge_commit?: boolean;
    subscribers_count?: number;
    network_count?: number;
  } | null;
  temp_clone_token?: string;
  allow_squash_merge?: boolean;
  allow_auto_merge?: boolean;
  delete_branch_on_merge?: boolean;
  allow_merge_commit?: boolean;
  allow_forking?: boolean;
  subscribers_count?: number;
  network_count?: number;
  open_issues: number;
  watchers: number;
  master_branch?: string;
  starred_at?: string;
};
export type GitHubApp = {
  id: number;
  slug?: string;
  node_id: string;
  owner: SimpleUser;
  name: string;
  description: string | null;
  external_url: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  permissions: {
    issues?: string;
    checks?: string;
    metadata?: string;
    contents?: string;
    deployments?: string;
  } & {
    [key: string]: string;
  };
  events: string[];
  installations_count?: number;
  client_id?: string;
  client_secret?: string;
  webhook_secret?: string | null;
  pem?: string;
} | null;
export type AuthorAssociation =
  | "COLLABORATOR"
  | "CONTRIBUTOR"
  | "FIRST_TIMER"
  | "FIRST_TIME_CONTRIBUTOR"
  | "MANNEQUIN"
  | "MEMBER"
  | "NONE"
  | "OWNER";
export type ReactionRollup = {
  url: string;
  total_count: number;
  "+1": number;
  "-1": number;
  laugh: number;
  confused: number;
  heart: number;
  hooray: number;
  eyes: number;
  rocket: number;
};
export type Issue = {
  id: number;
  node_id: string;
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  number: number;
  state: string;
  title: string;
  body?: string | null;
  user: SimpleUser;
  labels: (
    | string
    | {
        id?: number;
        node_id?: string;
        url?: string;
        name?: string;
        description?: string | null;
        color?: string | null;
        default?: boolean;
      }
  )[];
  assignee: SimpleUser;
  assignees?: SimpleUser2[] | null;
  milestone: Milestone;
  locked: boolean;
  active_lock_reason?: string | null;
  comments: number;
  pull_request?: {
    merged_at?: string | null;
    diff_url: string | null;
    html_url: string | null;
    patch_url: string | null;
    url: string | null;
  };
  closed_at: string | null;
  created_at: string;
  updated_at: string;
  draft?: boolean;
  closed_by?: SimpleUser;
  body_html?: string;
  body_text?: string;
  timeline_url?: string;
  repository?: Repository;
  performed_via_github_app?: GitHubApp;
  author_association: AuthorAssociation;
  reactions?: ReactionRollup;
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
export type IssueComment = {
  id: number;
  node_id: string;
  url: string;
  body?: string;
  body_text?: string;
  body_html?: string;
  html_url: string;
  user: SimpleUser;
  created_at: string;
  updated_at: string;
  issue_url: string;
  author_association: AuthorAssociation;
  performed_via_github_app?: GitHubApp;
  reactions?: ReactionRollup;
};
export type Issue2 = {
  id: number;
  node_id: string;
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  number: number;
  state: string;
  title: string;
  body?: string | null;
  user: SimpleUser;
  labels: (
    | string
    | {
        id?: number;
        node_id?: string;
        url?: string;
        name?: string;
        description?: string | null;
        color?: string | null;
        default?: boolean;
      }
  )[];
  assignee: SimpleUser;
  assignees?: SimpleUser2[] | null;
  milestone: Milestone;
  locked: boolean;
  active_lock_reason?: string | null;
  comments: number;
  pull_request?: {
    merged_at?: string | null;
    diff_url: string | null;
    html_url: string | null;
    patch_url: string | null;
    url: string | null;
  };
  closed_at: string | null;
  created_at: string;
  updated_at: string;
  draft?: boolean;
  closed_by?: SimpleUser;
  body_html?: string;
  body_text?: string;
  timeline_url?: string;
  repository?: Repository;
  performed_via_github_app?: GitHubApp;
  author_association: AuthorAssociation;
  reactions?: ReactionRollup;
} | null;
export type IssueEventLabel = {
  name: string | null;
  color: string | null;
};
export type TeamSimple = {
  id: number;
  node_id: string;
  url: string;
  members_url: string;
  name: string;
  description: string | null;
  permission: string;
  privacy?: string;
  html_url: string;
  repositories_url: string;
  slug: string;
  ldap_dn?: string;
} | null;
export type Team = {
  id: number;
  node_id: string;
  name: string;
  slug: string;
  description: string | null;
  privacy?: string;
  permission: string;
  permissions?: {
    pull: boolean;
    triage: boolean;
    push: boolean;
    maintain: boolean;
    admin: boolean;
  };
  url: string;
  html_url: string;
  members_url: string;
  repositories_url: string;
  parent: TeamSimple;
};
export type IssueEventDismissedReview = {
  state: string;
  review_id: number;
  dismissal_message: string | null;
  dismissal_commit_id?: string | null;
};
export type IssueEventMilestone = {
  title: string;
};
export type IssueEventProjectCard = {
  url: string;
  id: number;
  project_url: string;
  project_id: number;
  column_name: string;
  previous_column_name?: string;
};
export type IssueEventRename = {
  from: string;
  to: string;
};
export type IssueEvent = {
  id: number;
  node_id: string;
  url: string;
  actor: SimpleUser;
  event: string;
  commit_id: string | null;
  commit_url: string | null;
  created_at: string;
  issue?: Issue2;
  label?: IssueEventLabel;
  assignee?: SimpleUser;
  assigner?: SimpleUser;
  review_requester?: SimpleUser;
  requested_reviewer?: SimpleUser;
  requested_team?: Team;
  dismissed_review?: IssueEventDismissedReview;
  milestone?: IssueEventMilestone;
  project_card?: IssueEventProjectCard;
  rename?: IssueEventRename;
  author_association?: AuthorAssociation;
  lock_reason?: string | null;
  performed_via_github_app?: GitHubApp;
};
export type LabeledIssueEvent = {
  id: number;
  node_id: string;
  url: string;
  actor: SimpleUser2;
  event: string;
  commit_id: string | null;
  commit_url: string | null;
  created_at: string;
  performed_via_github_app: GitHubApp;
  label: {
    name: string;
    color: string;
  };
};
export type UnlabeledIssueEvent = {
  id: number;
  node_id: string;
  url: string;
  actor: SimpleUser2;
  event: string;
  commit_id: string | null;
  commit_url: string | null;
  created_at: string;
  performed_via_github_app: GitHubApp;
  label: {
    name: string;
    color: string;
  };
};
export type GitHubApp2 = {
  id: number;
  slug?: string;
  node_id: string;
  owner: SimpleUser;
  name: string;
  description: string | null;
  external_url: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  permissions: {
    issues?: string;
    checks?: string;
    metadata?: string;
    contents?: string;
    deployments?: string;
  } & {
    [key: string]: string;
  };
  events: string[];
  installations_count?: number;
  client_id?: string;
  client_secret?: string;
  webhook_secret?: string | null;
  pem?: string;
};
export type AssignedIssueEvent = {
  id: number;
  node_id: string;
  url: string;
  actor: SimpleUser2;
  event: string;
  commit_id: string | null;
  commit_url: string | null;
  created_at: string;
  performed_via_github_app: GitHubApp2;
  assignee: SimpleUser2;
  assigner: SimpleUser2;
};
export type UnassignedIssueEvent = {
  id: number;
  node_id: string;
  url: string;
  actor: SimpleUser2;
  event: string;
  commit_id: string | null;
  commit_url: string | null;
  created_at: string;
  performed_via_github_app: GitHubApp;
  assignee: SimpleUser2;
  assigner: SimpleUser2;
};
export type MilestonedIssueEvent = {
  id: number;
  node_id: string;
  url: string;
  actor: SimpleUser2;
  event: string;
  commit_id: string | null;
  commit_url: string | null;
  created_at: string;
  performed_via_github_app: GitHubApp;
  milestone: {
    title: string;
  };
};
export type DemilestonedIssueEvent = {
  id: number;
  node_id: string;
  url: string;
  actor: SimpleUser2;
  event: string;
  commit_id: string | null;
  commit_url: string | null;
  created_at: string;
  performed_via_github_app: GitHubApp;
  milestone: {
    title: string;
  };
};
export type RenamedIssueEvent = {
  id: number;
  node_id: string;
  url: string;
  actor: SimpleUser2;
  event: string;
  commit_id: string | null;
  commit_url: string | null;
  created_at: string;
  performed_via_github_app: GitHubApp;
  rename: {
    from: string;
    to: string;
  };
};
export type ReviewRequestedIssueEvent = {
  id: number;
  node_id: string;
  url: string;
  actor: SimpleUser2;
  event: string;
  commit_id: string | null;
  commit_url: string | null;
  created_at: string;
  performed_via_github_app: GitHubApp;
  review_requester: SimpleUser2;
  requested_team?: Team;
  requested_reviewer?: SimpleUser2;
};
export type ReviewRequestRemovedIssueEvent = {
  id: number;
  node_id: string;
  url: string;
  actor: SimpleUser2;
  event: string;
  commit_id: string | null;
  commit_url: string | null;
  created_at: string;
  performed_via_github_app: GitHubApp;
  review_requester: SimpleUser2;
  requested_team?: Team;
  requested_reviewer?: SimpleUser2;
};
export type ReviewDismissedIssueEvent = {
  id: number;
  node_id: string;
  url: string;
  actor: SimpleUser2;
  event: string;
  commit_id: string | null;
  commit_url: string | null;
  created_at: string;
  performed_via_github_app: GitHubApp;
  dismissed_review: {
    state: string;
    review_id: number;
    dismissal_message: string | null;
    dismissal_commit_id?: string;
  };
};
export type LockedIssueEvent = {
  id: number;
  node_id: string;
  url: string;
  actor: SimpleUser2;
  event: string;
  commit_id: string | null;
  commit_url: string | null;
  created_at: string;
  performed_via_github_app: GitHubApp;
  lock_reason: string | null;
};
export type AddedToProjectIssueEvent = {
  id: number;
  node_id: string;
  url: string;
  actor: SimpleUser2;
  event: string;
  commit_id: string | null;
  commit_url: string | null;
  created_at: string;
  performed_via_github_app: GitHubApp;
  project_card?: {
    id: number;
    url: string;
    project_id: number;
    project_url: string;
    column_name: string;
    previous_column_name?: string;
  };
};
export type MovedColumnInProjectIssueEvent = {
  id: number;
  node_id: string;
  url: string;
  actor: SimpleUser2;
  event: string;
  commit_id: string | null;
  commit_url: string | null;
  created_at: string;
  performed_via_github_app: GitHubApp;
  project_card?: {
    id: number;
    url: string;
    project_id: number;
    project_url: string;
    column_name: string;
    previous_column_name?: string;
  };
};
export type RemovedFromProjectIssueEvent = {
  id: number;
  node_id: string;
  url: string;
  actor: SimpleUser2;
  event: string;
  commit_id: string | null;
  commit_url: string | null;
  created_at: string;
  performed_via_github_app: GitHubApp;
  project_card?: {
    id: number;
    url: string;
    project_id: number;
    project_url: string;
    column_name: string;
    previous_column_name?: string;
  };
};
export type ConvertedNoteToIssueIssueEvent = {
  id: number;
  node_id: string;
  url: string;
  actor: SimpleUser2;
  event: string;
  commit_id: string | null;
  commit_url: string | null;
  created_at: string;
  performed_via_github_app: GitHubApp2;
  project_card?: {
    id: number;
    url: string;
    project_id: number;
    project_url: string;
    column_name: string;
    previous_column_name?: string;
  };
};
export type IssueEventForIssue =
  | LabeledIssueEvent
  | UnlabeledIssueEvent
  | AssignedIssueEvent
  | UnassignedIssueEvent
  | MilestonedIssueEvent
  | DemilestonedIssueEvent
  | RenamedIssueEvent
  | ReviewRequestedIssueEvent
  | ReviewRequestRemovedIssueEvent
  | ReviewDismissedIssueEvent
  | LockedIssueEvent
  | AddedToProjectIssueEvent
  | MovedColumnInProjectIssueEvent
  | RemovedFromProjectIssueEvent
  | ConvertedNoteToIssueIssueEvent;
export type Label = {
  id: number;
  node_id: string;
  url: string;
  name: string;
  description: string | null;
  color: string;
  default: boolean;
};
export type TimelineCommentEvent = {
  event: string;
  actor: SimpleUser2;
  id: number;
  node_id: string;
  url: string;
  body?: string;
  body_text?: string;
  body_html?: string;
  html_url: string;
  user: SimpleUser2;
  created_at: string;
  updated_at: string;
  issue_url: string;
  author_association: AuthorAssociation;
  performed_via_github_app?: GitHubApp;
  reactions?: ReactionRollup;
};
export type TimelineCrossReferencedEvent = {
  event: string;
  actor?: SimpleUser2;
  created_at: string;
  updated_at: string;
  source: {
    type?: string;
    issue?: Issue;
  };
};
export type TimelineCommittedEvent = {
  event?: string;
  sha: string;
  node_id: string;
  url: string;
  author: {
    date: string;
    email: string;
    name: string;
  };
  committer: {
    date: string;
    email: string;
    name: string;
  };
  message: string;
  tree: {
    sha: string;
    url: string;
  };
  parents: {
    sha: string;
    url: string;
    html_url: string;
  }[];
  verification: {
    verified: boolean;
    reason: string;
    signature: string | null;
    payload: string | null;
  };
  html_url: string;
};
export type TimelineReviewedEvent = {
  event: string;
  id: number;
  node_id: string;
  user: SimpleUser2;
  body: string | null;
  state: string;
  html_url: string;
  pull_request_url: string;
  _links: {
    html: {
      href: string;
    };
    pull_request: {
      href: string;
    };
  };
  submitted_at?: string;
  commit_id: string;
  body_html?: string;
  body_text?: string;
  author_association: AuthorAssociation;
};
export type PullRequestReviewComment = {
  url: string;
  pull_request_review_id: number | null;
  id: number;
  node_id: string;
  diff_hunk: string;
  path: string;
  position: number;
  original_position: number;
  commit_id: string;
  original_commit_id: string;
  in_reply_to_id?: number;
  user: SimpleUser2;
  body: string;
  created_at: string;
  updated_at: string;
  html_url: string;
  pull_request_url: string;
  author_association: AuthorAssociation;
  _links: {
    self: {
      href: string;
    };
    html: {
      href: string;
    };
    pull_request: {
      href: string;
    };
  };
  start_line?: number | null;
  original_start_line?: number | null;
  start_side?: ("LEFT" | "RIGHT") | null;
  line?: number;
  original_line?: number;
  side?: "LEFT" | "RIGHT";
  reactions?: ReactionRollup;
  body_html?: string;
  body_text?: string;
};
export type TimelineLineCommentedEvent = {
  event?: string;
  node_id?: string;
  comments?: PullRequestReviewComment[];
};
export type CommitComment = {
  html_url: string;
  url: string;
  id: number;
  node_id: string;
  body: string;
  path: string | null;
  position: number | null;
  line: number | null;
  commit_id: string;
  user: SimpleUser;
  created_at: string;
  updated_at: string;
  author_association: AuthorAssociation;
  reactions?: ReactionRollup;
};
export type TimelineCommitCommentedEvent = {
  event?: string;
  node_id?: string;
  commit_id?: string;
  comments?: CommitComment[];
};
export type TimelineAssignedIssueEvent = {
  id: number;
  node_id: string;
  url: string;
  actor: SimpleUser2;
  event: string;
  commit_id: string | null;
  commit_url: string | null;
  created_at: string;
  performed_via_github_app: GitHubApp;
  assignee: SimpleUser2;
};
export type TimelineUnassignedIssueEvent = {
  id: number;
  node_id: string;
  url: string;
  actor: SimpleUser2;
  event: string;
  commit_id: string | null;
  commit_url: string | null;
  created_at: string;
  performed_via_github_app: GitHubApp;
  assignee: SimpleUser2;
};
export type TimelineEvent =
  | LabeledIssueEvent
  | UnlabeledIssueEvent
  | MilestonedIssueEvent
  | DemilestonedIssueEvent
  | RenamedIssueEvent
  | ReviewRequestedIssueEvent
  | ReviewRequestRemovedIssueEvent
  | ReviewDismissedIssueEvent
  | LockedIssueEvent
  | AddedToProjectIssueEvent
  | MovedColumnInProjectIssueEvent
  | RemovedFromProjectIssueEvent
  | ConvertedNoteToIssueIssueEvent
  | TimelineCommentEvent
  | TimelineCrossReferencedEvent
  | TimelineCommittedEvent
  | TimelineReviewedEvent
  | TimelineLineCommentedEvent
  | TimelineCommitCommentedEvent
  | TimelineAssignedIssueEvent
  | TimelineUnassignedIssueEvent;
export type Milestone2 = {
  url: string;
  html_url: string;
  labels_url: string;
  id: number;
  node_id: string;
  number: number;
  state: "open" | "closed";
  title: string;
  description: string | null;
  creator: SimpleUser;
  open_issues: number;
  closed_issues: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  due_on: string | null;
};
export const {
  useIssuesListQuery,
  useIssuesListForOrgQuery,
  useIssuesListAssigneesQuery,
  useIssuesCheckUserCanBeAssignedQuery,
  useIssuesListForRepoQuery,
  useIssuesCreateMutation,
  useIssuesListCommentsForRepoQuery,
  useIssuesGetCommentQuery,
  useIssuesUpdateCommentMutation,
  useIssuesDeleteCommentMutation,
  useIssuesListEventsForRepoQuery,
  useIssuesGetEventQuery,
  useIssuesGetQuery,
  useIssuesUpdateMutation,
  useIssuesAddAssigneesMutation,
  useIssuesRemoveAssigneesMutation,
  useIssuesListCommentsQuery,
  useIssuesCreateCommentMutation,
  useIssuesListEventsQuery,
  useIssuesListLabelsOnIssueQuery,
  useIssuesAddLabelsMutation,
  useIssuesSetLabelsMutation,
  useIssuesRemoveAllLabelsMutation,
  useIssuesRemoveLabelMutation,
  useIssuesLockMutation,
  useIssuesUnlockMutation,
  useIssuesListEventsForTimelineQuery,
  useIssuesListLabelsForRepoQuery,
  useIssuesCreateLabelMutation,
  useIssuesGetLabelQuery,
  useIssuesUpdateLabelMutation,
  useIssuesDeleteLabelMutation,
  useIssuesListMilestonesQuery,
  useIssuesCreateMilestoneMutation,
  useIssuesGetMilestoneQuery,
  useIssuesUpdateMilestoneMutation,
  useIssuesDeleteMilestoneMutation,
  useIssuesListLabelsForMilestoneQuery,
  useIssuesListForAuthenticatedUserQuery,
} = injectedRtkApi;
