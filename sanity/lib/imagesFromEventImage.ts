export const ImagesFromEvent = `*[_type == "event" && dateTime(startDate) > dateTime(now())] 
| order(startDate asc) {
  _id,
  "imageUrl": imageUrl.asset->url
}`;