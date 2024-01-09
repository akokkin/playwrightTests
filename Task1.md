# Task 1 - E-commerce testing: 

## Scenario 1: User Authentication (Register & Login)

Scenario Details: Users should be able to create an account and also login to it. This way a user can conduct orders, track them, access historical orders, manage personal information (Addresses, payment methods) and also protect their personal data.
Also, fast registration and login processes result in overall better user experience, and therefore, sales.

### Test Cases:

#### Registration:
Scenario: User successfully creates an account using valid credentials.
Acceptance Criteria:
1. Navigate to the 'Create An Account' page.
2. Ensure the registration form accepts valid Email addresses, Passwords, First Name, Last Name.
3. Ensure the registration form does not accept same email address and password inputs.
4. Ensure the registration form does not accept different inputs in password fields
5. Ensure the registration form does not accept same incorrect password formats.
6. Ensure all the mandatory fields are completed.  
7. Ensure the form submits successfully and creates a new account.
8. Ensure the user is logged in and navigated to their account page.

#### Login:
Scenario: User logs in successfully using valid credentials.
Acceptance Criteria:
1. Navigate to the 'Sign In' page
2. Ensure the login form accepts valid email address and password.
3. Both fields should be completed with existing user's credentials.
4. After successfull login, user is redirected to their account dashboard.


## Scenario 2: Product discovery 

Scenario Details: Users should be able to search for products through the search bar and navigate to products via categories and filter of their choice. Providing good search and indexing/filtering results in positive user experience. In contrast, lack of structure, inefficient search tools and filters can affect sales.  

### Test Cases:

#### Product Search:
1. Login as a registered user.
2. Conduct searches using different product names.
3. Ensure that corresponding products are returned via search.
4. Ensure that tapping on a specific product redirects user to the corresponding product's landing page.

#### Product Discovery Via Categories
1. Login as a registered user.
2. Hover over a category.
3. Click on a random category child.
4. Ensure that tapping on a specific product redirects user to the corresponding product's landing page.

#### Product Filtering
1. Login as a registered user.
2. Hover over a category.
3. Click on a random category child.
4. Select any Shopping Option (filter) on the left of the screen .
5. Ensure the returned products correspond to the selected filter.
6. Ensure that tapping on a specific product redirects user to the corresponding product's landing page.


## Scenario 3: Adding/Removing items in Cart 

Scenario Details: Users should be able to add multiple items to their cart in a quick manner and also remove them from it before checking out. Allowing users to include or remove products from their cart is a fundamental functionality and ensures the customers are well informed about the quantities and the amounts of the products they have chosen.

### Test Cases:

#### Add product to cart from product details page:
1. Login as a registered user.
2. Conduct searches using different product names.
3. Tap on a random product to enter its details page.
4. Ensure that 'add to cart' button (after inputing valid options e.g. quantity > 0) adds this product to your cart.
5. Ensure the cart icon count (top right of screen) displays the correct amount of products in your cart.
6. Navigate to 'View and Edit Cart'.
7. Ensure product's details (Price, Quantity, Size, Colour, Subtotal) are correct.
8. Ensure the order total is calculated correctly.
9. Ensure the 'block crosssell' class (carousel) is present and it represents 4 products.

#### Quick-Add product to cart from category results page:
1. Login as a registered user.
2. Navigate to a random products category.
3. Hover over any product listing.
4. Select product parameters (if needed).
5. Tap on 'Add to cart' button.
6. Ensure the cart icon count (top right of screen) displays the correct amount of products in your cart.
6. Navigate to 'View and Edit Cart'.
7. Ensure product's details (Price, Quantity, Size, Colour, Subtotal) are correct.
8. Ensure the order total is calculated correctly.

#### Update cart
1. Login as a registered user.
2. Add 2 random products to your cart.
3. Navigate to 'View and Edit Cart'.
4. Update the first product's quantity to a different number.
5. Ensure the first product's subtotal was updated accordingly.
6. Ensure the Order total was updated accordingly.
7. Update the second product's parameters to a different size and/or colour and tap on 'Update Cart'.
8. Esnure the user is redirected to 'View Cart' landing page.
9. Ensure the second product's parameters were updated accordingly.


#### Remove products from cart
1. Login as a registered user.
2. Add 3 random products to your cart.
3. Tap on the 'Move to Wishlist' button of the first product.
4. Ensure the item was removed from the cart.
5. Ensure the Order Total was updated accordingly.
6. Tap on the Remove Item (bin) button of the first product
7. Ensure the item was removed from the cart.
8. Ensure the Order Total was updated accordingly.

#### Quick-Remove products from cart
1. Login as a registered user
2. Add 2 random products to your cart.
3. Tap on the Cart icon on the top right corner of the page.
4. Tap on the Remove Item (bin) button of the first product.
5. Tap 'OK' in the prompt that appears.
6. Ensure the count in the Cart icon on the top right of the screen was updated accordingly 
7. Ensure the item was removed from the cart quick view.
8. Ensure the Cart Subtotal was updated accordingly in the cart quick view.
9. Navigate to 'View and Edit Cart' page. 
10. Ensure the item was removed from the cart.
11. Ensure the Order Total was updated accordingly.


## Scenario 4: Checkout process 

Scenario Details: Users should be able to complete their purchase easily and in a timely manner. Also users should be able to track their order status and details after placing it. Both functionalities result in better experience and service of the users. This helps in repeating customers.

### Test Cases:

#### Complete Checkout, track order details and status 
1. Login as a registered user.
2. Add 1 random product to your cart.
3. Tap on the Cart icon on the top right corner of the page.
4. Tap on 'Proceed to Checkout' button.
5. Fill in the required fields.
6. Tap on 'Next' button.
7. Ensure the amount and details are correct in the order review.
8. Tap on 'Place Order' button.
9. Ensure user is navigated to the correct page and details are correct. 
10. Tap on 'Continue Shopping' button.
11. Navigate to 'My Orders'.
12. Ensure the retrieved details are correct.
13. Tap on 'View Order' button.
14. Ensure the retrieved details are correct.
 

## Scenario 5: Product Reviews 

Scenario Details: Users should be able to review products in a timely manner. User product reviews serve in two ways. They provoke new users to look into items that they otherwise might have missed, and also, provide potential buyers a sense of safety and reassurance due to other consumer's thoughts on them. This functionality helps sales increase bearing zero-cost for the platform owners, like passive marketing. 

### Test Cases:
1. Login as a registered user.
2. Enter a random product's reviews page.
3. Input a Nickname, Summary and Review.
4. Tap on 'Submit Review' button.
5. Navigate to 'Reviews' tab.
6. Ensure the review exists and its details are correct.