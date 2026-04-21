import {
  hasSupportedUserId,
  hasSupportedUsername,
  supportedUsers,
} from "./supported-configs.js";

const DEBUG_LOGS_ENABLED = false;

const logDebug = (message) => {
  if (!DEBUG_LOGS_ENABLED) return;
  console.log(message);
};

const log = (message) => {
  console.log(message);
};

export default {
  async fetch(request, env, ctx) {
    logDebug(`[MT]> request url: '${request.url}'.`);

    const requestUrl = new URL(request.url);
    // logDebug(`[MT]> request url - host: '${requestUrl.host}'.`);
    // logDebug(`[MT]> request url - origin: '${requestUrl.origin}'.`);
    logDebug(`[MT]> request url > search: '${requestUrl.search}'.`);
    logDebug(`[MT]> request url > pathname: '${requestUrl.pathname}'.`);
    const search = requestUrl.search;
    const pathname = requestUrl.pathname;
    const pathnameParts = pathname.split("/");
    logDebug(`[MT]> request url > pathname parts[${pathnameParts.length}]: '${pathnameParts}'.`);

    logDebug(`[MT]> supported users: ${supportedUsers.length}`);

    // 2/users/by/username/{username}
    // 2/users/{id}/tweets
    const baseHostUrl = "https://api.x.com";
    let apiUrl = ''
    if (pathnameParts.length > 1 && pathnameParts[1] == "2") {
      if (pathnameParts.length > 2 && pathnameParts[2] == "users") {
        if (pathnameParts.length > 3) {
          if (pathnameParts[3] == "by") {
            if (pathnameParts.length > 4 && pathnameParts[4] == "username") {
              if (pathnameParts.length > 5) {
                const username = pathnameParts[5];
                if (hasSupportedUsername(username)) {
                  apiUrl = baseHostUrl + pathname + search;
                }
              }
            }
          } else {
            const userId = pathnameParts[3];
            if (pathnameParts.length > 4 && pathnameParts[4] == "tweets") {
              if (hasSupportedUserId(userId)) {
                const maxResult = "&max_results=7";
                apiUrl = baseHostUrl + pathname + search + maxResult;
              }
            }
          }
        }
      }
    }
    logDebug(`[MT]> apiUrl: '${apiUrl}'`);
    if (apiUrl.length == 0) {
      return new Response('404 not found', {
        status: 404,
        headers: { 'Content-Type': 'text/html' }
      });
    }
    const cacheUrl = new URL(apiUrl);
    const cacheKey = cacheUrl.toString();
    const cache = caches.default;
    let response = await cache.match(cacheKey);
    if (!response) {
      log(`[MT]> NO Cache hit for: ${request.url} (${apiUrl}).`);
      const token = env.MT_TWITTER_TOKEN;
      const apiRequest = new Request(apiUrl, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      logDebug(`[MT]> Fetching from '${apiUrl})'...`);
      response = await fetch(apiRequest);
      log(`[MT]> Fetching from '${apiUrl})'... DONE`);
      logDebug(`[MT]> Response.headers: ${response.headers}.`);
      logDebug(`[MT]> Response.status: ${response.status}.`);
      if (response.status == 200) {
        response = new Response(response.body);
        response.headers.append("Cache-Control", "s-maxage=10800"); // 3 hours
        ctx.waitUntil(cache.put(cacheKey, response.clone()));
        log(`[MT]> Cache saved for: ${request.url} (${apiUrl}).`);
      }
    } else {
      log(`[MT]> Cache hit for: ${request.url} (${apiUrl}).`);
    }
    return response;
  }
};
