# Front-end Project

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/RTK-v.1-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![SASS](https://img.shields.io/badge/SASS-v.1-hotpink)

This project requires implementation of TypeScript and SASS.

## Requirement

1. Use the API endpoint [https://fakeapi.platzi.com/](https://fakeapi.platzi.com/) to create an e-commerce website.

2. Create at lease 4 pages (can be more if you want):

   - Page for all products
   - Product page
   - Profile page (only available if user logins)
   - Cart page (cart page could be a page or a modal)

3. Create Redux store for following features:

   - product reducer:
     - Get all products
     - Find a single products
     - Filter products by categories
     - Sort products by price.
     - Create, update and delete a product (enable update & delete features only for admin of the webapp)

   - user reducer:
     - register
     - login

   - cart reducer:
     - add product to cart
     - remove products
     - update products's quantity in cart

4. When adding routers to your application, programatically set certain routes to be private. For example, route to user profile page should not be accessible if user has not logged in.
5. Implement unit testing for the reducers
6. Deploy the application and rewrite README file.

## Bonus

1. Use context API to switch theme
2. Use pagination when fetching/displaying all the products
3. Implement performance optimization where applicable
