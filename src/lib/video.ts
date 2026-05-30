export const posterFor = (videoSrc: string) =>
  videoSrc.replace("/videos/", "/videos/posters/").replace(/\.mp4$/, ".webp");
