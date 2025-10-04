export default {
  async fetch(request, env, ctx) {
    console.log(`[MT]> request url: ${request.url}`);

    const requestUrl = new URL(request.url);
    console.log(`[MT]> request url - host: ${requestUrl.host}`);
    console.log(`[MT]> request url - origin: ${requestUrl.origin}`);
    console.log(`[MT]> request url - pathname: ${requestUrl.pathname}`);
    console.log(`[MT]> request url - search: ${requestUrl.search}`);
    const path = requestUrl.pathname;
    const parts = path.split("/");
    console.log(`[MT]> request url - parts[${parts.length}]: ${parts}`);


    // https://twitter-cache-api.mtransit-apps.workers.dev/2/users/329993645/tweets?max_results=5&since_id=1962998976371949825&exclude=replies,retweets&tweet.fields=id,text,author_id,created_at,entities,lang&expansions=author_id,attachments.media_keys&media.fields=media_key,type,alt_text,url,preview_image_url,variants&user.fields=id,name,username,profile_image_url
    // 2/users/by/username/{username}
    // 2/users/{id}/tweets

    const baseHostUrl = "https://api.x.com";
    const supportedUsernames = ["montransit"];
    const supportedUserIds = ["329993645"]
    let apiUrl = ''
    if (parts.length > 1 && parts[1] == "2") {
      if (parts.length > 2 && parts[2] == "users") {
        if (parts.length > 3) {
          const part3 = parts[3];
          if (part3 == "by") {
            if (parts.length > 4 && parts[4] == "username") {
              if (parts.length > 5) {
                const username = parts[5];
                if (supportedUsernames.includes(username)) {
                  apiUrl = baseHostUrl + path + search;
                }
              }
            }
          } else {
            const userId = part3;
            if (parts.length > 4 && parts[4] == "tweets") {
              if (supportedUserIds.includes(userId)) {
                apiUrl = baseHostUrl + path + search;
              }
            }
          }
        }
      }
    }
    console.log(`[MT]> apiUrl: '${apiUrl}'`);
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
      console.log(`[MT]> NO Cache hit for: ${request.url} (${apiUrl}).`);
      const token = env.MT_TWITTER_TOKEN;
      console.log(`[MT]> token: *** (${token.length}).`);
      const apiRequest = new Request(apiUrlWithSecret, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log(`[MT]> Fetching from '${apiUrl})'...`);
      response = await fetch(apiRequest);
      console.log(`[MT]> Fetching from '${apiUrl})'... DONE`);
      console.log(`[MT]> Response.headers: ${response.headers}.`);
      console.log(`[MT]> Response.status: ${response.status}.`);
      if (response.status == 200) {
        response = new Response(response.body);
        response.headers.append("Cache-Control", "s-maxage=10800"); // 3 hours
        ctx.waitUntil(cache.put(cacheKey, response.clone()));
        console.log(`[MT]> Cache saved for: ${request.url} (${apiUrl}).`);
      }
    } else {
      console.log(`[MT]> Cache hit for: ${request.url} (${apiUrl}).`);
    }
    return response;
  }
};