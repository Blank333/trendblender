# TrendBlender

This project is a full-stack e-commerce application built using modern web technologies:

- **Frontend:** React + Vite
- **Backend:** Node.js and Express
- **Database:** MongoDB

## Live Preview

[Live Preview](https://trendblender.netlify.app/)
You can use this admin account for starting. More admin accounts can be created through the admin panel.

```
email: admin@admin.com
password: password
```

This test paypal account can be used for payment through email

```
email: sb-zjrf031002810@personal.example.com
password: hb8rLx.C
```

This test paypal account can be used for payment through card

```
Type: VISA
Card: 4032032573460943
Expiry: 06/2029
CVC Code: Any 3 digits
```

## Installation

- Clone the repository.

- Navigate to the backend directory.

- Run `npm install` to install dependencies.

- Check the .env example file and enter your credentials

- Run `node index.js` to start the backend server.

- Navigate to the frontend directory.

- Run `npm install` to install dependencies.

- Check the .env example file and enter your credentials

- Run `npm run dev` to start the frontend.

## Usage

- Register a new account.
- Switch it to an admin account in the database
- Open the admin panel
- Add new product

Managing the products, users and orders can be done from the admin panel.
Additional admin accounts can also be created from the admin panel.

## API Endpoints

**Products:** `api/products`

1. **Normal Routes:**

- `/`: GET - all products (with optional filtering, search, and pagination)
- `/featured`: GET - featured products
- `/count`: GET - total product count (with optional filtering and search)
- `/:id`: GET - a single product by ID
- `/:id/reviews`: GET - all reviews for a product

2. **Protected Routes (needs user account):**

- `/:id/reviews`: POST - Add a review for a product

3. **Authorized Routes (needs admin account):**

- `/`: POST - Create a new product
- `/upload`: POST - Upload a product image
- `/:id`: PUT - Update a product
- `/:id`: DELETE - Delete a product

**Cart:** `api/cart`

1. **Protected Routes (needs user account):**

- `/me`: GET - Get the current user's cart
- `/`: POST - Add a product
- `/`: DELETE - Clear the user's cart
- `/:product`: DELETE - Remove a specific product
- `/:product`: PUT - Update the quantity of a product

2. **Authorized Routes (needs admin account):**

- `/`: GET - Get all carts

**Orders:** `api/orders`

1. **Protected Routes (needs user account):**

- `/count`: GET - Get total order count
- `/user`: GET - Get all user's orders (paginated and sorted)
- `/user/count`: GET - Get user's order count
- `/user/:id`: PUT - Update a user's order (status only)
- `/`: POST - Create a new order

2. **Authorized Routes (needs admin account):**

- `/`: GET - Get all orders (paginated and sorted) with user and product details
- `/:id`: PUT - Update order (status and delivery date)

**Users:** `api/users`

1. **Normal Routes:**

- `/register`: POST - Register a new user
- `/login`: POST - Login a user

2. **Protected Routes (needs user account):**

- `/auth`: GET - Authenticate the current user (send JWT token back)
- `/:email`: GET - Get a user by email
- `/:id/profile`: PUT - Update the currently authenticated user's profile information (firstname, lastname, email)

3. **Authorized Routes (needs admin account):**

- `/`: GET - Get all users (paginated and sorted)
- `/count`: GET - total user count
- `/:id`: PUT - Update any user information (firstname, lastname, email, isAdmin)
- `/:id`: DELETE - Delete a user
