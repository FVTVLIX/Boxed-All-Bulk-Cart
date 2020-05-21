# Boxed-All-Bulk-Cart

# Summary

Ever use an online super-store like Amazon or Boxed? As a design exercise, we've tried to implement our own version of the Boxed online store, but with some informational pop-ups that direct the user to either the All-bulk (warehouse items) store or the Express (grocery shopping service) store. We also implement corresponding separate shopping carts to improve the shopper's experience.

We also incorporate a database where products can be added to, edited and deleted from. The webpage will pull products from this database and display them for users. A secret administrator page will be used to edit products. Potential administrators will be given an invite code in order to make an administrator account.

Built using MERN stack: MongoDB, Express, React, Nodejs

# Team Members

#### Software Engineering Immersive (SEI)
1. Andre Gonzalez
2. Andrew Hsu
3. Tom Moliterno
4. Luke Sweeney

#### User Experience (UX)
1. Taylor Davenport
2. Bengisu Halezeroglu
3. Tara Jung

# App Design 

## Features 
Our main app features revolve around the following two goals: (1) creating a functional full-stack app that allows users to browse products in the store, which are served from the database, and (2) employing the features designed by the UX team in their project to enhance the user experience of the Boxed.com site. 

#### App MVP

Our MVP was to create the storefront in React, and build an Express server and MongoDB database that serve as the backend. The backend would provide an API for the frontend to read all or one of the products in the store. Additionally, the backend would provide a system to sign up as a user, authenticate sign ins and provide CRUD functions to allow a store admin to add, edit or delete products from the database. A bare-bones (unstyled) adminstrator login page would allow the admin to do these things from the browser.

* React frontend deployed to Surge
* Express backend deployed to Heroku, with MongoDB Atlas database connection
* Ability to read products from database via API endpoint
* Administrator ability to create, update and delete products from database via API endpoint and valid JSON web token
* Hand-rolled JSON web token authentication system in Express backend
* React components that route to different pages (products, productDetails, login) that have different API calls
* Styling based on UX mockups and Boxed.com aesthetics

#### App post-MVP

Our post-MVP development involved including a number of quality of life and UX features. Almost all the UX features were post-MVP, being added after the main functionality (but before styling) of the app was done. 
* Main UX Features: 3 informative popups
  * Home popup
  * Add to cart popup
  * Bulk and Express shopping carts
* Frontend:
  * Search box in navigation bar functional
  * Extensive filtering and sorting on products page
* Backend: 
  * API endpoint for search box that uses regular expressions to match terms with Schema fields
  * API endpoint for returning only products that fall under certain categories or subcategories
  * Additional environment variable for restricting account creation (acting as an invite code)

#### UX Features
The UX team provided a set of mockups, both detailing the components and styling for the Boxed.com site, as well as the new features they wanted to introduce.

[Mockups in Zeplin](https://scene.zeplin.io/project/5ea47ccc58a80025db2899bb)

##### Feature 1: Home popup
The purpose of this mockup is to distinguish the two different stores or services of Boxed.come. The first is All-Bulk, which is bulk purchasing which is shipped from their warehouses. The second is Express, which is a shopping or grocery service where a local affiliate purchases the items and delivers them to the customer's home.

[Feature 1: Boxed homepage popup](https://scene.zeplin.io/project/5ea47ccc58a80025db2899bb/screen/5ea47ddf33694a2667fbea64)

##### Feature 2: Add to cart popup
When a customer wants to order an item, it may be out of stock or undeliverable in the period between ordering and shipping. This feature was designed to ask if the customer would like a replacement to be shipped if the original were not available (and to be charged/refunded appropriately and automatically) after clicking the "Add to cart" button on the product details page.

[Feature 2: Boxed add to cart popup](https://scene.zeplin.io/project/5ea47ccc58a80025db2899bb/screen/5ea47de08b7dc7272d15114d)

##### Feature 3: Bulk and Express shopping carts 
In Boxed.com's current implementation, the shopping cart is one column and both Bulk and Express orders are added to it. This may become confusing to users because the two carts still need to be checked out separately. This double column design helps users see the difference between their two carts.

[Feature 3: Boxed Bulk and Express shopping carts](https://scene.zeplin.io/project/5ea47ccc58a80025db2899bb/screen/5ea47de033694a2667fbeae7)

#### Post-MVP

# Development

## Project Timeframe

Because this was our first time working together, and also our first time doing a group software development project, we ended up front loading a lot of work in the first few days of our schedule.

#### Trello Board

[Development Trello Board](https://trello.com/b/OVCriFYj/ga-sei-apollo-project-3-boxed)

## Code Examples And References

#### Express/Mongoose: User Schema
 
The User Schema only holds the following (all required) fields, which are required upon admin account creation:
  * email: string
  * username: string
  * password_digest: string

#### Express/Mongoose: Product Schema

The Product Schema has many more keys than the User and many are used for categorization and filtering on the products page of the app.

##### Product Schema Fields
  | -------- | ------------ | ---------------------- | ------------------- | -------------|
  | REQUIRED | name: string | images: array[strings] | description: string | price: string |
  | REQUIRED | stock: number | rating: number (int 0-5) | categories: string | subcategories: string |
  | NOT REQUIRED | typeOfProduct: string | values: string | brands: string |
  
If the app were to be refactored further, the front end would have its filter functions redesigned so that the last three fields (typeOfProduct, values, brands) could be arrays.

#### Express/Mongoose: Example of product json object for seeding database based on Product Schema
```js
{
    "name": "TriFun Cereal Box",
    "images": [
      "https://vpc-prod-thumbor-public-gcp.boxed.com/unsafe/fit-   in/512x400/filters:quality(100):max_bytes(200000):fill(white)/http://dcmzfk78s4reh.cloudfront.net/1436140429902.jpg",
      "https://vpc-prod-thumbor-public-gcp.boxed.com/unsafe/fit-in/512x400/filters:quality(100):max_bytes(200000):fill(white)/http://dcmzfk78s4reh.cloudfront.net/1436140428983.jpg",
      "https://vpc-prod-thumbor-public-gcp.boxed.com/unsafe/fit-in/512x400/filters:quality(100):max_bytes(200000):fill(white)/http://dcmzfk78s4reh.cloudfront.net/1436140430817.jpg",
      "https://vpc-prod-thumbor-public-gcp.boxed.com/unsafe/fit-in/512x400/filters:quality(100):max_bytes(200000):fill(white)/http://dcmzfk78s4reh.cloudfront.net/1436140433415.jpg"
    ],
    "description": "Variety Pack. 58 oz. In stock",
    "price": "11.59",
    "rating": "3",
    "stock": "25",
    "categories": "grocery",
    "subcategories": "cereal & breakfast",
    "typeOfProduct": "cereals",
    "values": "",
    "brands": "Kellogg's"
  }
```
