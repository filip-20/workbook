import { githubApi as api } from "../baseApi";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    packagesListPackagesForOrganization: build.query<
      PackagesListPackagesForOrganizationApiResponse,
      PackagesListPackagesForOrganizationApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/packages`,
        params: {
          package_type: queryArg.packageType,
          visibility: queryArg.visibility,
        },
      }),
    }),
    packagesGetPackageForOrganization: build.query<
      PackagesGetPackageForOrganizationApiResponse,
      PackagesGetPackageForOrganizationApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/packages/${queryArg.packageType}/${queryArg.packageName}`,
      }),
    }),
    packagesDeletePackageForOrg: build.mutation<
      PackagesDeletePackageForOrgApiResponse,
      PackagesDeletePackageForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/packages/${queryArg.packageType}/${queryArg.packageName}`,
        method: "DELETE",
      }),
    }),
    packagesRestorePackageForOrg: build.mutation<
      PackagesRestorePackageForOrgApiResponse,
      PackagesRestorePackageForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/packages/${queryArg.packageType}/${queryArg.packageName}/restore`,
        method: "POST",
        params: { token: queryArg.token },
      }),
    }),
    packagesGetAllPackageVersionsForPackageOwnedByOrg: build.query<
      PackagesGetAllPackageVersionsForPackageOwnedByOrgApiResponse,
      PackagesGetAllPackageVersionsForPackageOwnedByOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/packages/${queryArg.packageType}/${queryArg.packageName}/versions`,
        params: {
          page: queryArg.page,
          per_page: queryArg.perPage,
          state: queryArg.state,
        },
      }),
    }),
    packagesGetPackageVersionForOrganization: build.query<
      PackagesGetPackageVersionForOrganizationApiResponse,
      PackagesGetPackageVersionForOrganizationApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/packages/${queryArg.packageType}/${queryArg.packageName}/versions/${queryArg.packageVersionId}`,
      }),
    }),
    packagesDeletePackageVersionForOrg: build.mutation<
      PackagesDeletePackageVersionForOrgApiResponse,
      PackagesDeletePackageVersionForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/packages/${queryArg.packageType}/${queryArg.packageName}/versions/${queryArg.packageVersionId}`,
        method: "DELETE",
      }),
    }),
    packagesRestorePackageVersionForOrg: build.mutation<
      PackagesRestorePackageVersionForOrgApiResponse,
      PackagesRestorePackageVersionForOrgApiArg
    >({
      query: (queryArg) => ({
        url: `/orgs/${queryArg.org}/packages/${queryArg.packageType}/${queryArg.packageName}/versions/${queryArg.packageVersionId}/restore`,
        method: "POST",
      }),
    }),
    packagesListPackagesForAuthenticatedUser: build.query<
      PackagesListPackagesForAuthenticatedUserApiResponse,
      PackagesListPackagesForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/packages`,
        params: {
          package_type: queryArg.packageType,
          visibility: queryArg.visibility,
        },
      }),
    }),
    packagesGetPackageForAuthenticatedUser: build.query<
      PackagesGetPackageForAuthenticatedUserApiResponse,
      PackagesGetPackageForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/packages/${queryArg.packageType}/${queryArg.packageName}`,
      }),
    }),
    packagesDeletePackageForAuthenticatedUser: build.mutation<
      PackagesDeletePackageForAuthenticatedUserApiResponse,
      PackagesDeletePackageForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/packages/${queryArg.packageType}/${queryArg.packageName}`,
        method: "DELETE",
      }),
    }),
    packagesRestorePackageForAuthenticatedUser: build.mutation<
      PackagesRestorePackageForAuthenticatedUserApiResponse,
      PackagesRestorePackageForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/packages/${queryArg.packageType}/${queryArg.packageName}/restore`,
        method: "POST",
        params: { token: queryArg.token },
      }),
    }),
    packagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUser:
      build.query<
        PackagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUserApiResponse,
        PackagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUserApiArg
      >({
        query: (queryArg) => ({
          url: `/user/packages/${queryArg.packageType}/${queryArg.packageName}/versions`,
          params: {
            page: queryArg.page,
            per_page: queryArg.perPage,
            state: queryArg.state,
          },
        }),
      }),
    packagesGetPackageVersionForAuthenticatedUser: build.query<
      PackagesGetPackageVersionForAuthenticatedUserApiResponse,
      PackagesGetPackageVersionForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/packages/${queryArg.packageType}/${queryArg.packageName}/versions/${queryArg.packageVersionId}`,
      }),
    }),
    packagesDeletePackageVersionForAuthenticatedUser: build.mutation<
      PackagesDeletePackageVersionForAuthenticatedUserApiResponse,
      PackagesDeletePackageVersionForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/packages/${queryArg.packageType}/${queryArg.packageName}/versions/${queryArg.packageVersionId}`,
        method: "DELETE",
      }),
    }),
    packagesRestorePackageVersionForAuthenticatedUser: build.mutation<
      PackagesRestorePackageVersionForAuthenticatedUserApiResponse,
      PackagesRestorePackageVersionForAuthenticatedUserApiArg
    >({
      query: (queryArg) => ({
        url: `/user/packages/${queryArg.packageType}/${queryArg.packageName}/versions/${queryArg.packageVersionId}/restore`,
        method: "POST",
      }),
    }),
    packagesListPackagesForUser: build.query<
      PackagesListPackagesForUserApiResponse,
      PackagesListPackagesForUserApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/packages`,
        params: {
          package_type: queryArg.packageType,
          visibility: queryArg.visibility,
        },
      }),
    }),
    packagesGetPackageForUser: build.query<
      PackagesGetPackageForUserApiResponse,
      PackagesGetPackageForUserApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/packages/${queryArg.packageType}/${queryArg.packageName}`,
      }),
    }),
    packagesDeletePackageForUser: build.mutation<
      PackagesDeletePackageForUserApiResponse,
      PackagesDeletePackageForUserApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/packages/${queryArg.packageType}/${queryArg.packageName}`,
        method: "DELETE",
      }),
    }),
    packagesRestorePackageForUser: build.mutation<
      PackagesRestorePackageForUserApiResponse,
      PackagesRestorePackageForUserApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/packages/${queryArg.packageType}/${queryArg.packageName}/restore`,
        method: "POST",
        params: { token: queryArg.token },
      }),
    }),
    packagesGetAllPackageVersionsForPackageOwnedByUser: build.query<
      PackagesGetAllPackageVersionsForPackageOwnedByUserApiResponse,
      PackagesGetAllPackageVersionsForPackageOwnedByUserApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/packages/${queryArg.packageType}/${queryArg.packageName}/versions`,
      }),
    }),
    packagesGetPackageVersionForUser: build.query<
      PackagesGetPackageVersionForUserApiResponse,
      PackagesGetPackageVersionForUserApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/packages/${queryArg.packageType}/${queryArg.packageName}/versions/${queryArg.packageVersionId}`,
      }),
    }),
    packagesDeletePackageVersionForUser: build.mutation<
      PackagesDeletePackageVersionForUserApiResponse,
      PackagesDeletePackageVersionForUserApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/packages/${queryArg.packageType}/${queryArg.packageName}/versions/${queryArg.packageVersionId}`,
        method: "DELETE",
      }),
    }),
    packagesRestorePackageVersionForUser: build.mutation<
      PackagesRestorePackageVersionForUserApiResponse,
      PackagesRestorePackageVersionForUserApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.username}/packages/${queryArg.packageType}/${queryArg.packageName}/versions/${queryArg.packageVersionId}/restore`,
        method: "POST",
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as githubApi };
export type PackagesListPackagesForOrganizationApiResponse =
  /** status 200 Response */ Package[];
export type PackagesListPackagesForOrganizationApiArg = {
  /** The type of supported package. Can be one of `npm`, `maven`, `rubygems`, `nuget`, `docker`, or `container`. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  packageType: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  org: string;
  /** The selected visibility of the packages. Can be one of `public`, `private`, or `internal`. Only `container` package_types currently support `internal` visibility properly. For other ecosystems `internal` is synonymous with `private`. This parameter is optional and only filters an existing result set. */
  visibility?: "public" | "private" | "internal";
};
export type PackagesGetPackageForOrganizationApiResponse =
  /** status 200 Response */ Package;
export type PackagesGetPackageForOrganizationApiArg = {
  /** The type of supported package. Can be one of `npm`, `maven`, `rubygems`, `nuget`, `docker`, or `container`. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  packageType: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  packageName: string;
  org: string;
};
export type PackagesDeletePackageForOrgApiResponse =
  /** status 204 Response */ undefined;
export type PackagesDeletePackageForOrgApiArg = {
  /** The type of supported package. Can be one of `npm`, `maven`, `rubygems`, `nuget`, `docker`, or `container`. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  packageType: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  packageName: string;
  org: string;
};
export type PackagesRestorePackageForOrgApiResponse =
  /** status 204 Response */ undefined;
export type PackagesRestorePackageForOrgApiArg = {
  /** The type of supported package. Can be one of `npm`, `maven`, `rubygems`, `nuget`, `docker`, or `container`. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  packageType: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  packageName: string;
  org: string;
  /** package token */
  token?: string;
};
export type PackagesGetAllPackageVersionsForPackageOwnedByOrgApiResponse =
  /** status 200 Response */ PackageVersion[];
export type PackagesGetAllPackageVersionsForPackageOwnedByOrgApiArg = {
  /** The type of supported package. Can be one of `npm`, `maven`, `rubygems`, `nuget`, `docker`, or `container`. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  packageType: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  packageName: string;
  org: string;
  /** Page number of the results to fetch. */
  page?: number;
  /** Results per page (max 100) */
  perPage?: number;
  /** The state of the package, either active or deleted. */
  state?: "active" | "deleted";
};
export type PackagesGetPackageVersionForOrganizationApiResponse =
  /** status 200 Response */ PackageVersion;
export type PackagesGetPackageVersionForOrganizationApiArg = {
  /** The type of supported package. Can be one of `npm`, `maven`, `rubygems`, `nuget`, `docker`, or `container`. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  packageType: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  packageName: string;
  org: string;
  /** Unique identifier of the package version. */
  packageVersionId: number;
};
export type PackagesDeletePackageVersionForOrgApiResponse =
  /** status 204 Response */ undefined;
export type PackagesDeletePackageVersionForOrgApiArg = {
  /** The type of supported package. Can be one of `npm`, `maven`, `rubygems`, `nuget`, `docker`, or `container`. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  packageType: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  packageName: string;
  org: string;
  /** Unique identifier of the package version. */
  packageVersionId: number;
};
export type PackagesRestorePackageVersionForOrgApiResponse =
  /** status 204 Response */ undefined;
export type PackagesRestorePackageVersionForOrgApiArg = {
  /** The type of supported package. Can be one of `npm`, `maven`, `rubygems`, `nuget`, `docker`, or `container`. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  packageType: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  packageName: string;
  org: string;
  /** Unique identifier of the package version. */
  packageVersionId: number;
};
export type PackagesListPackagesForAuthenticatedUserApiResponse =
  /** status 200 Response */ Package[];
export type PackagesListPackagesForAuthenticatedUserApiArg = {
  /** The type of supported package. Can be one of `npm`, `maven`, `rubygems`, `nuget`, `docker`, or `container`. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  packageType: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The selected visibility of the packages. Can be one of `public`, `private`, or `internal`. Only `container` package_types currently support `internal` visibility properly. For other ecosystems `internal` is synonymous with `private`. This parameter is optional and only filters an existing result set. */
  visibility?: "public" | "private" | "internal";
};
export type PackagesGetPackageForAuthenticatedUserApiResponse =
  /** status 200 Response */ Package;
export type PackagesGetPackageForAuthenticatedUserApiArg = {
  /** The type of supported package. Can be one of `npm`, `maven`, `rubygems`, `nuget`, `docker`, or `container`. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  packageType: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  packageName: string;
};
export type PackagesDeletePackageForAuthenticatedUserApiResponse =
  /** status 204 Response */ undefined;
export type PackagesDeletePackageForAuthenticatedUserApiArg = {
  /** The type of supported package. Can be one of `npm`, `maven`, `rubygems`, `nuget`, `docker`, or `container`. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  packageType: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  packageName: string;
};
export type PackagesRestorePackageForAuthenticatedUserApiResponse =
  /** status 204 Response */ undefined;
export type PackagesRestorePackageForAuthenticatedUserApiArg = {
  /** The type of supported package. Can be one of `npm`, `maven`, `rubygems`, `nuget`, `docker`, or `container`. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  packageType: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  packageName: string;
  /** package token */
  token?: string;
};
export type PackagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUserApiResponse =
  /** status 200 Response */ PackageVersion[];
export type PackagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUserApiArg =
  {
    /** The type of supported package. Can be one of `npm`, `maven`, `rubygems`, `nuget`, `docker`, or `container`. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
    packageType:
      | "npm"
      | "maven"
      | "rubygems"
      | "docker"
      | "nuget"
      | "container";
    /** The name of the package. */
    packageName: string;
    /** Page number of the results to fetch. */
    page?: number;
    /** Results per page (max 100) */
    perPage?: number;
    /** The state of the package, either active or deleted. */
    state?: "active" | "deleted";
  };
export type PackagesGetPackageVersionForAuthenticatedUserApiResponse =
  /** status 200 Response */ PackageVersion;
export type PackagesGetPackageVersionForAuthenticatedUserApiArg = {
  /** The type of supported package. Can be one of `npm`, `maven`, `rubygems`, `nuget`, `docker`, or `container`. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  packageType: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  packageName: string;
  /** Unique identifier of the package version. */
  packageVersionId: number;
};
export type PackagesDeletePackageVersionForAuthenticatedUserApiResponse =
  /** status 204 Response */ undefined;
export type PackagesDeletePackageVersionForAuthenticatedUserApiArg = {
  /** The type of supported package. Can be one of `npm`, `maven`, `rubygems`, `nuget`, `docker`, or `container`. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  packageType: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  packageName: string;
  /** Unique identifier of the package version. */
  packageVersionId: number;
};
export type PackagesRestorePackageVersionForAuthenticatedUserApiResponse =
  /** status 204 Response */ undefined;
export type PackagesRestorePackageVersionForAuthenticatedUserApiArg = {
  /** The type of supported package. Can be one of `npm`, `maven`, `rubygems`, `nuget`, `docker`, or `container`. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  packageType: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  packageName: string;
  /** Unique identifier of the package version. */
  packageVersionId: number;
};
export type PackagesListPackagesForUserApiResponse =
  /** status 200 Response */ Package[];
export type PackagesListPackagesForUserApiArg = {
  /** The type of supported package. Can be one of `npm`, `maven`, `rubygems`, `nuget`, `docker`, or `container`. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  packageType: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The selected visibility of the packages. Can be one of `public`, `private`, or `internal`. Only `container` package_types currently support `internal` visibility properly. For other ecosystems `internal` is synonymous with `private`. This parameter is optional and only filters an existing result set. */
  visibility?: "public" | "private" | "internal";
  username: string;
};
export type PackagesGetPackageForUserApiResponse =
  /** status 200 Response */ Package;
export type PackagesGetPackageForUserApiArg = {
  /** The type of supported package. Can be one of `npm`, `maven`, `rubygems`, `nuget`, `docker`, or `container`. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  packageType: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  packageName: string;
  username: string;
};
export type PackagesDeletePackageForUserApiResponse =
  /** status 204 Response */ undefined;
export type PackagesDeletePackageForUserApiArg = {
  /** The type of supported package. Can be one of `npm`, `maven`, `rubygems`, `nuget`, `docker`, or `container`. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  packageType: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  packageName: string;
  username: string;
};
export type PackagesRestorePackageForUserApiResponse =
  /** status 204 Response */ undefined;
export type PackagesRestorePackageForUserApiArg = {
  /** The type of supported package. Can be one of `npm`, `maven`, `rubygems`, `nuget`, `docker`, or `container`. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  packageType: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  packageName: string;
  username: string;
  /** package token */
  token?: string;
};
export type PackagesGetAllPackageVersionsForPackageOwnedByUserApiResponse =
  /** status 200 Response */ PackageVersion[];
export type PackagesGetAllPackageVersionsForPackageOwnedByUserApiArg = {
  /** The type of supported package. Can be one of `npm`, `maven`, `rubygems`, `nuget`, `docker`, or `container`. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  packageType: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  packageName: string;
  username: string;
};
export type PackagesGetPackageVersionForUserApiResponse =
  /** status 200 Response */ PackageVersion;
export type PackagesGetPackageVersionForUserApiArg = {
  /** The type of supported package. Can be one of `npm`, `maven`, `rubygems`, `nuget`, `docker`, or `container`. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  packageType: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  packageName: string;
  /** Unique identifier of the package version. */
  packageVersionId: number;
  username: string;
};
export type PackagesDeletePackageVersionForUserApiResponse =
  /** status 204 Response */ undefined;
export type PackagesDeletePackageVersionForUserApiArg = {
  /** The type of supported package. Can be one of `npm`, `maven`, `rubygems`, `nuget`, `docker`, or `container`. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  packageType: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  packageName: string;
  username: string;
  /** Unique identifier of the package version. */
  packageVersionId: number;
};
export type PackagesRestorePackageVersionForUserApiResponse =
  /** status 204 Response */ undefined;
export type PackagesRestorePackageVersionForUserApiArg = {
  /** The type of supported package. Can be one of `npm`, `maven`, `rubygems`, `nuget`, `docker`, or `container`. Packages in GitHub's Gradle registry have the type `maven`. Docker images pushed to GitHub's Container registry (`ghcr.io`) have the type `container`. You can use the type `docker` to find images that were pushed to GitHub's Docker registry (`docker.pkg.github.com`), even if these have now been migrated to the Container registry. */
  packageType: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  /** The name of the package. */
  packageName: string;
  username: string;
  /** Unique identifier of the package version. */
  packageVersionId: number;
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
} | null;
export type CodeOfConduct = {
  key: string;
  name: string;
  url: string;
  body?: string;
  html_url: string | null;
};
export type MinimalRepository = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
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
  git_url?: string;
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
  ssh_url?: string;
  stargazers_url: string;
  statuses_url: string;
  subscribers_url: string;
  subscription_url: string;
  tags_url: string;
  teams_url: string;
  trees_url: string;
  clone_url?: string;
  mirror_url?: string | null;
  hooks_url: string;
  svn_url?: string;
  homepage?: string | null;
  language?: string | null;
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
  pushed_at?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  permissions?: {
    admin?: boolean;
    maintain?: boolean;
    push?: boolean;
    triage?: boolean;
    pull?: boolean;
  };
  role_name?: string;
  template_repository?: Repository;
  temp_clone_token?: string;
  delete_branch_on_merge?: boolean;
  subscribers_count?: number;
  network_count?: number;
  code_of_conduct?: CodeOfConduct;
  license?: {
    key?: string;
    name?: string;
    spdx_id?: string;
    url?: string;
    node_id?: string;
  } | null;
  forks?: number;
  open_issues?: number;
  watchers?: number;
  allow_forking?: boolean;
} | null;
export type Package = {
  id: number;
  name: string;
  package_type: "npm" | "maven" | "rubygems" | "docker" | "nuget" | "container";
  url: string;
  html_url: string;
  version_count: number;
  visibility: "private" | "public";
  owner?: SimpleUser;
  repository?: MinimalRepository;
  created_at: string;
  updated_at: string;
};
export type BasicError = {
  message?: string;
  documentation_url?: string;
  url?: string;
  status?: string;
};
export type PackageVersion = {
  id: number;
  name: string;
  url: string;
  package_html_url: string;
  html_url?: string;
  license?: string;
  description?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  metadata?: {
    package_type:
      | "npm"
      | "maven"
      | "rubygems"
      | "docker"
      | "nuget"
      | "container";
    container?: {
      tags: string[];
    };
    docker?: {
      tag?: string[];
    };
  };
};
export const {
  usePackagesListPackagesForOrganizationQuery,
  usePackagesGetPackageForOrganizationQuery,
  usePackagesDeletePackageForOrgMutation,
  usePackagesRestorePackageForOrgMutation,
  usePackagesGetAllPackageVersionsForPackageOwnedByOrgQuery,
  usePackagesGetPackageVersionForOrganizationQuery,
  usePackagesDeletePackageVersionForOrgMutation,
  usePackagesRestorePackageVersionForOrgMutation,
  usePackagesListPackagesForAuthenticatedUserQuery,
  usePackagesGetPackageForAuthenticatedUserQuery,
  usePackagesDeletePackageForAuthenticatedUserMutation,
  usePackagesRestorePackageForAuthenticatedUserMutation,
  usePackagesGetAllPackageVersionsForPackageOwnedByAuthenticatedUserQuery,
  usePackagesGetPackageVersionForAuthenticatedUserQuery,
  usePackagesDeletePackageVersionForAuthenticatedUserMutation,
  usePackagesRestorePackageVersionForAuthenticatedUserMutation,
  usePackagesListPackagesForUserQuery,
  usePackagesGetPackageForUserQuery,
  usePackagesDeletePackageForUserMutation,
  usePackagesRestorePackageForUserMutation,
  usePackagesGetAllPackageVersionsForPackageOwnedByUserQuery,
  usePackagesGetPackageVersionForUserQuery,
  usePackagesDeletePackageVersionForUserMutation,
  usePackagesRestorePackageVersionForUserMutation,
} = injectedRtkApi;
