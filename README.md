## Project statement

A Restaurant Finder Web application using Zomato API

## Reference
- Goto https://developers.zomato.com/api and signup for a Free API key.
- Goto https://developers.zomato.com/documentation for Documentation of Zomato API.
- Youtube reference that really helpfull - `https://www.youtube.com/watch?v=WJdY_RtXrU0&t=5014s` by Coding Addict.

## Specification

- User must select the City he’s looking to search the restaurant.
- The listing page must display the nearby restaurants along with a restaurant featured image, rating, votes & reviews count. Display paginated results.
- On clicking the restaurant, it should navigate to the details page. Show all the relevant information, and make the page as unique as possible.
- The details page must have a reviews section which should display only 5 reviews with a more button. On clicking more button, navigate to a reviews page showing all reviews. Implement pagination on this page.
- Implement a Like feature for the restaurants. User must be able to like or unlike the
restaurant. If the user has liked the restaurant, it should be displayed in both listing & detail page. The likes are not to be posted to the server, but maintained only on the client side.

## Tech stack

HTML5,CSS,vanilla JavaScript. 



## [WIP]

- Infinite scroll pagination for the listing page & reviews page.
- Use Geolocation to automatically set the user location & get the nearby restaurants.

## Intial Wireframes for reference

### Select a city

![Select a city](https://i.imgur.com/aMRmFDN.png)

### List of all restaurants in a city

![List of all restaurants in a city](https://i.imgur.com/Vxd4NXR.png)

### View of a single restaurant

![View of a single restaurant](https://i.imgur.com/jJo8QJe.png)
