// Shared between server and client, so it lives outside $lib/server.
// Apple's artwork URLs end in /<size>x<size>bb.jpg and will serve any size
// from that path, so a stored 600px URL can be rendered as a thumbnail.
export const artworkAt = (url: string, px: number) =>
  url.replace(/\/\d+x\d+bb\.jpg$/, `/${px}x${px}bb.jpg`);
