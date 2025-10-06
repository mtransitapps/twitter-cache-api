export default {
  async fetch(request, env, ctx) {
    console.log(`[MT]> request url: ${request.url}`);

    const requestUrl = new URL(request.url);
    // console.log(`[MT]> request url - host: ${requestUrl.host}`);
    // console.log(`[MT]> request url - origin: ${requestUrl.origin}`);
    console.log(`[MT]> request url > pathname: ${requestUrl.pathname}`);
    console.log(`[MT]> request url > search: ${requestUrl.search}`);
    const search = requestUrl.search;
    const pathname = requestUrl.pathname;
    const pathnameParts = pathname.split("/");
    console.log(`[MT]> request url > pathname parts[${pathnameParts.length}]: ${pathnameParts}`);

    const supportedUsernames = [];
    const supportedUserIds = [];
    // main app
    supportedUsernames.push("montransit"); supportedUserIds.push("329993645");
    // Canada
    supportedUsernames.push("AirdrieTransit"); supportedUserIds.push("216814398");
    supportedUsernames.push("allo_exo"); supportedUserIds.push("245789900");
    supportedUsernames.push("BCTransit"); supportedUserIds.push("67042447");
    supportedUsernames.push("BikeShareTO"); supportedUserIds.push("168487515");
    supportedUsernames.push("BIXImontreal"); supportedUserIds.push("20085288");
    supportedUsernames.push("BramptonTransit"); supportedUserIds.push("124497831");
    supportedUsernames.push("BurlONTransit"); supportedUserIds.push("740628438093029376");
    supportedUsernames.push("calgarytransit"); supportedUserIds.push("26782762");
    supportedUsernames.push("Durham_Transit"); supportedUserIds.push("844085900");
    supportedUsernames.push("exo11_VH"); supportedUserIds.push("478973820");
    supportedUsernames.push("exo12_SJ"); supportedUserIds.push("1580564522");
    supportedUsernames.push("exo13_SH"); supportedUserIds.push("479698184");
    supportedUsernames.push("exo14_CA"); supportedUserIds.push("479694540");
    supportedUsernames.push("exo15_MA"); supportedUserIds.push("2328966667");
    supportedUsernames.push("exo_Nord"); supportedUserIds.push("123243009");
    supportedUsernames.push("exo_Sud"); supportedUserIds.push("1577708024");
    supportedUsernames.push("GOtransit"); supportedUserIds.push("52188923");
    supportedUsernames.push("GOtransitFR"); supportedUserIds.push("1857893034");
    supportedUsernames.push("GOtransitBR"); supportedUserIds.push("720957373192474626");
    supportedUsernames.push("GOtransitKT"); supportedUserIds.push("720954919319166976");
    supportedUsernames.push("GOtransitLE"); supportedUserIds.push("720947428426428416");
    supportedUsernames.push("GOtransitLW"); supportedUserIds.push("720950349373251585");
    supportedUsernames.push("GOtransitMI"); supportedUserIds.push("720959237577445376");
    supportedUsernames.push("GOtransitRH"); supportedUserIds.push("720963505780846593");
    supportedUsernames.push("GOtransitST"); supportedUserIds.push("743842536930873344");
    supportedUsernames.push("GRT_ROW"); supportedUserIds.push("246370991");
    supportedUsernames.push("guelphtransit"); supportedUserIds.push("30260432");
    supportedUsernames.push("hfxtransit"); supportedUserIds.push("389593324");
    supportedUsernames.push("hsr"); supportedUserIds.push("753610052892844032");
    supportedUsernames.push("KingstonTransit"); supportedUserIds.push("179762980");
    supportedUsernames.push("LTCLdnOnt"); supportedUserIds.push("925424715900116992");
    supportedUsernames.push("MetrobusTransit"); supportedUserIds.push("938855094");
    supportedUsernames.push("miltontransit"); supportedUserIds.push("542120362");
    supportedUsernames.push("mobi_bikes"); supportedUserIds.push("733739411020505088");
    supportedUsernames.push("MiWayHelps"); supportedUserIds.push("573908194");
    supportedUsernames.push("NiagaraTransit"); supportedUserIds.push("1382761596");
    supportedUsernames.push("oakvilletransit"); supportedUserIds.push("540084573");
    supportedUsernames.push("OC_Transpo"); supportedUserIds.push("126447030");
    supportedUsernames.push("OC_TranspoAide"); supportedUserIds.push("444791191");
    supportedUsernames.push("OC_TranspoHelps"); supportedUserIds.push("376835873");
    supportedUsernames.push("Orleans_Express"); supportedUserIds.push("418807540");
    supportedUsernames.push("REMgrandmtl"); supportedUserIds.push("917832911751143430");
    supportedUsernames.push("REM_infoservice"); supportedUserIds.push("1630300222961201153");
    supportedUsernames.push("roamtransit"); supportedUserIds.push("2569916766");
    supportedUsernames.push("RTCQuebec"); supportedUserIds.push("253271006");
    supportedUsernames.push("STLevis"); supportedUserIds.push("151572595");
    supportedUsernames.push("stminfo"); supportedUserIds.push("54692326");
    supportedUsernames.push("stm_Bleue"); supportedUserIds.push("1465203679");
    supportedUsernames.push("stm_Bus"); supportedUserIds.push("2615264737");
    supportedUsernames.push("stm_Jaune"); supportedUserIds.push("1465230403");
    supportedUsernames.push("stm_nouvelles"); supportedUserIds.push("329276626");
    supportedUsernames.push("stm_Orange"); supportedUserIds.push("1465166731");
    supportedUsernames.push("stm_Verte"); supportedUserIds.push("1465196582");
    supportedUsernames.push("STOGatineau"); supportedUserIds.push("4308740555");
    supportedUsernames.push("stoontransit"); supportedUserIds.push("312918611");
    supportedUsernames.push("takeETSalert"); supportedUserIds.push("281137182");
    supportedUsernames.push("ThinkTransitSJ"); supportedUserIds.push("236923036");
    supportedUsernames.push("transitalerts"); supportedUserIds.push("87220241"); // Winnipeg
    supportedUsernames.push("TransLink"); supportedUserIds.push("61617150");
    supportedUsernames.push("TransLinkNews"); supportedUserIds.push("912809850");
    supportedUsernames.push("TTChelps"); supportedUserIds.push("500231605");
    supportedUsernames.push("TTCnotices"); supportedUserIds.push("19025957");
    supportedUsernames.push("UPexpress"); supportedUserIds.push("632453857");
    supportedUsernames.push("UPexpressFR"); supportedUserIds.push("2285309340");
    supportedUsernames.push("VIA_Rail"); supportedUserIds.push("17136009");
    supportedUsernames.push("VIARailAlerts"); supportedUserIds.push("1621162227712626689");
    supportedUsernames.push("WhistlerTransit"); supportedUserIds.push("398361424");
    supportedUsernames.push("winnipegtransit"); supportedUserIds.push("87219242");
    supportedUsernames.push("YQRTransit"); supportedUserIds.push("555264926");
    supportedUsernames.push("YRTViva"); supportedUserIds.push("196262641");
    // France
    supportedUsernames.push("SANKEOtrafic"); supportedUserIds.push("1074397922");
    // United States
    supportedUsernames.push("ancpeoplemover"); supportedUserIds.push("199002356");
    supportedUsernames.push("ctranvancouver"); supportedUserIds.push("260347897");
    console.log(`[MT]> supported usernames: ${supportedUsernames.length}`);
    console.log(`[MT]> supported user IDs: ${supportedUserIds.length}`);

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
                const username = parts[5];
                if (supportedUsernames.includes(username)) {
                  apiUrl = baseHostUrl + pathname + search;
                }
              }
            }
          } else {
            const userId = pathnameParts[3];
            if (pathnameParts.length > 4 && pathnameParts[4] == "tweets") {
              if (supportedUserIds.includes(userId)) {
                apiUrl = baseHostUrl + pathname + search;
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
      const apiRequest = new Request(apiUrl, {
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