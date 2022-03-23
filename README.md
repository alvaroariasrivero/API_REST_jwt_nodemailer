# JWT Nodemailer Workshop :e-mail:

API REST of user login/sign-up, logout and view and edit a list of products with with Node.js, Express and MongoDB using jwt(jsonwebtoken) authentication and Nodemailer to reset and recover password

## Libraries

- Express
- Bcrypt
- Nodemailer
- Dotenv
- Jsonwebtoken
- Mongoose
- Nodemailer
- Pug

## Tutorial

The first step is to change the configuration of your Google account to allow less secure app access to send mails by nodemailer.
![img](./assets/lesssecureapps.png)

Then go to your Rest Client (I use Advanced Rest Client) and make your signup request.
![img](./assets/signup.gif)

This will create a document in your DB with tha user data. Logged value will be false by default.
![img](./assets/signdoc.png)

Make a login request using your user data. Then copy and save the token.
![img](./assets/login.gif)

The logged value will change to true.
![img](.assets/mongodoc.png)

Now, paste your token in the header and make a GET request to see the products.
![img](.assets/getproducts.gif)

You can make POST request to create a product and insert it in the DB.
![img](.assets/createproduct.gif)

If you make a logout, the logged value will change to false and you wouldn't get or create products untill login again.
![img](.assets/logout.gif)
![img](.assets/logoutgetproducts.gif)

To send a recover password email make a GET request with the user email.
![img](.assets/recoveremail.gif)

Now go to your email inbox and you will see the sent email to recover your password, click and copy the URL in to your Rest Client, make a PUT request and send in the boby the new password.
![img](.assets/resetpassword1.gif)
![img](.assets/resetpassword2.gif)

Login with the new password.
![img](.assets/newlogin.gif)
