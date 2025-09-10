export const nextEventQuery = `*[_type == "event" && dateTime(date) > dateTime(now())] 
| order(date asc)[0] {
  _id,
  name,
  slug,
  Link,
  date,
  description,
  short,
  location,
  "imageUrl": imageUrl.asset->url
}`;
