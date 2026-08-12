import { httpRequest } from "./libs/httpRequest";

const albumList = document.querySelector("#album-list");
const { albums } = await httpRequest.get("/api/albums?limit=20&offset=0");
albums.forEach((album) => {
  return `
  `;
});
