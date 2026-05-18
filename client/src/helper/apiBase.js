const localHosts = ["localhost", "127.0.0.1", "0.0.0.0"];

const isLocalApiUrl = (value = "") =>
  localHosts.some((host) => value.includes(host));

const isLocalBrowser = () => {
  if (typeof window === "undefined") return false;
  return localHosts.includes(window.location.hostname);
};

const getApiBaseUrl = () => {
  const configuredUrl = process.env.REACT_APP_SERVER_DOMAIN;

  if (!configuredUrl) return "/api";

  if (isLocalApiUrl(configuredUrl) && !isLocalBrowser()) {
    return "/api";
  }

  return configuredUrl;
};

export default getApiBaseUrl;
