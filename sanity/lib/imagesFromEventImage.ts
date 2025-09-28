export const ImagesFromEvent = `*[_type == "event" && dateTime(date) > dateTime(now())] 
| order(date asc) {
  _id,
  "imageUrl": imageUrl.asset->url
}`;