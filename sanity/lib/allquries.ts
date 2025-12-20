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

export const allEvents = `*[_type == "event"]
| order(date asc) {
  _id,
  name,
  _type,
  slug,
  genre,
  Link,
  date,
  description,
  short,
  location,
  "imageUrl": imageUrl.asset->url
}`;

export const allCommunityEvents = `*[_type == "communityevent" 
&& approved == true &&
  !(_id in path("drafts.**"))]
| order(date asc) {
  _id,
  name,
  startDate,
  _type,   
  slug,
  genre,
  Link,
  description,
  short,
  location,
  "image": image.asset->url,
}`;
