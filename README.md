# Front-end Project

![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/RTK-v.1-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![Material UI](https://img.shields.io/badge/Material_UI-v.5-2196f3)

## Introduction

Front end of an ecommerce store inspired by the [Platzi Fake Store API](https://fakeapi.platzi.com/).

Here is the deploy [website](https://quangtricao-fs16-frontend-project.netlify.app/).

## Table of contents

- [Technologies](#technologies)
- [Architecture](#architecture)
- [Requirements](#requirements)
- [Project structure](#project-structure)
- [Getting started](#getting-started)

## Technologies

- React
- Redux (Toolkit)
- React Router
- Typescript
- Material UI

## Architecture

The project has a function-based / horizontal slice architecture.

<img src="/reducers.png" alt="reducers" />

## Requirements

1. Create at lease 4 pages: All products, Single product, Profile (only available if logged in), Cart, etc.

2. Create Redux store for following features:

   - product reducer:

     - Get all products
     - Find a single products
     - Filter products by categories
     - Sort products by price.
     - Create, update and delete a product (only admin can update & delete)

   - user reducer:

     - register
     - login

   - cart reducer:
     - add product to cart
     - remove products
     - update products's quantity in cart

3. Private routes. (e.g. "/profile" should be inaccessible without login).
4. Implement unit testing for the reducers.

### Bonus

- [ ]  Use context API to switch theme.
- [x]  Use pagination when fetching/displaying all the products.
- [ ]  Implement performance optimization where applicable.

## Project Structure

```console
.
│   .env
│   .gitignore
│   package-lock.json
│   package.json
│   README.md
│   tsconfig.json
│
├───public
│       favicon.ico
│       index.html
│       _redirects
│
└───src
    │   App.tsx
    │   index.tsx
    │   react-app-env.d.ts
    │
    ├───api
    │       token.ts
    │
    ├───assets
    │   └───img
    │           logo.png
    │
    ├───components
    │       EditModal.tsx
    │       Filter.tsx
    │       Footer.tsx
    │       Header.tsx
    │       Intro.tsx
    │       Layout.tsx
    │       ProductDetail.tsx
    │       ProductPreview.tsx
    │       ProtectedRoute.tsx
    │       SignInForm.tsx
    │       SignUpForm.tsx
    │       Sort.tsx
    │       Wrapper.tsx
    │
    ├───config
    │       router.tsx
    │
    ├───pages
    │       Cart.tsx
    │       ErrorPage.tsx
    │       Home.tsx
    │       Login.tsx
    │       Profile.tsx
    │       SellProduct.tsx
    │
    ├───redux
    │   │   hook.ts
    │   │   store.ts
    │   │
    │   └───reducers
    │           cartsReducer.ts
    │           categoriesReducer.ts
    │           productsReducer.ts
    │           userReducer.ts
    │
    ├───test
    │   │   mockProducts.ts
    │   │   mockUsers.ts
    │   │
    │   ├───components
    │   │       App.test.tsx
    │   │       appRender.tsx
    │   │
    │   ├───redux
    │   │   └───reducers
    │   │           cartsReducer.test.ts
    │   │           productsReducer.test.ts
    │   │           userReducer.test.ts
    │   │
    │   └───servers
    │           productsServer.ts
    │           userServer.ts
    │
    └───types
            Products.tsx
            Token.tsx
            User.tsx
```

## Getting started

1. Clone the repository: `git clone https://github.com/quangtricao/fs16_6-frontend-project.git`.
2. Install all dependencies: `npm install`.
3. Start the project in localhost: `npm start`.

Or visit the production [version](https://quangtricao-fs16-frontend-project.netlify.app/).
