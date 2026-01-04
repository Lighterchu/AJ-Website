export const nextEventQuery = `*[_type == "event" && dateTime(startDate) > dateTime(now())] 
| order(startDate asc)[0] {
  _id,
  name,
  slug,
  Link,
  startDate,
  description,
  short,
  location,
  "imageUrl": imageUrl.asset->url
}`;

export const allEvents = `*[_type == "event"]
| order(startDate asc) {
  _id,
  name,
  _type,
  slug,
  genre,
  Link,
  startDate,
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
