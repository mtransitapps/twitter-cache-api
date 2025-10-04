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


    // https://twitter-cache-api.mtransit-apps.workers.dev/2/users/329993645/tweets?max_results=5&since_id=1962998976371949825&exclude=replies,retweets&tweet.fields=id,text,author_id,created_at,entities,lang&expansions=author_id,attachments.media_keys&media.fields=media_key,type,alt_text,url,preview_image_url,variants&user.fields=id,name,username,profile_image_url
    // 2/users/by/username/{username}
    // 2/users/{id}/tweets

    let apiUrl = ''
    if (parts.length > 1 && parts[1] == "2") {
      if (parts.length > 2 && parts[2] == "users") {
        if (parts.length > 3) {
          const part3 = parts[3];
          if (part3 == "by") {
            if (parts.length > 4 && parts[4] == "username") {
              if (parts.length > 5) {
                const username = parts[5];
                apiUrl = "https://api.x.com/";
              }
            }
          } else {
            const userId = part3;

          }
        }
      }
    }

    return new Response('404 not found X', {
        status: 404,
        headers: { 'Content-Type': 'text/html' }
      });
    // return response;
  }
};