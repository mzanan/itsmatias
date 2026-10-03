export const POSTHOG_PROXY_PATH = "/relay";
export const POSTHOG_UI_HOST = "https://eu.posthog.com";

const POSTHOG_INGEST_HOST = "https://eu.i.posthog.com";
const POSTHOG_ASSETS_HOST = "https://eu-assets.i.posthog.com";

export const posthogRewrites = [
  {
    source: `${POSTHOG_PROXY_PATH}/static/:path*`,
    destination: `${POSTHOG_ASSETS_HOST}/static/:path*`,
  },
  {
    source: `${POSTHOG_PROXY_PATH}/array/:path*`,
    destination: `${POSTHOG_ASSETS_HOST}/array/:path*`,
  },
  {
    source: `${POSTHOG_PROXY_PATH}/:path*`,
    destination: `${POSTHOG_INGEST_HOST}/:path*`,
  },
];

export const trailingSlashRedirect = {
  source: `/:path((?!${POSTHOG_PROXY_PATH.slice(1)}/).+)/`,
  destination: "/:path",
  permanent: true,
};

const NO_TRACK_KEY = "notrack";

export function isTrackingDisabled(): boolean {
  try {
    const param = new URLSearchParams(window.location.search).get(NO_TRACK_KEY);
    if (param === "1") window.localStorage.setItem(NO_TRACK_KEY, "1");
    if (param === "0") window.localStorage.removeItem(NO_TRACK_KEY);
    return window.localStorage.getItem(NO_TRACK_KEY) === "1";
  } catch {
    return false;
  }
}
