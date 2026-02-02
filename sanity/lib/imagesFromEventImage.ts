// This gets "Today at 00:00:00"
export const ImagesFromEvent = `*[_type == "event" && dateTime(startDate) >= dateTime(string::split(now(), "T")[0] + "T00:00:00Z")] 
| order(startDate asc) {
  _id,
  "imageUrl": imageUrl.asset->url
}`;