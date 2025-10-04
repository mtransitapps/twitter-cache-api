export default {
  async fetch(request, env, ctx) {
    console.log(`[MT]> request url: ${request.url}`);
    return new Response('404 not found X', {
        status: 404,
        headers: { 'Content-Type': 'text/html' }
      });
    // return response;
  }
};