# mindstorm-backend

# How to Start
Go into the mindstorm-backend directory and type: npm run server. This uses nodemon to start the server.js and can be found in
package.json under "scripts".

# Nodemon.json
This file is needed to help start the project. After creating this file, set your mongoDB string and JWT secret as json objects, like this:
{
  "env": {
      "mongo_secret_name_here": "mongodb string here",
      "JWT_secret_name_here": "JWT secret string here"
  }
}

# Note about multer
You may also need to save multer in the project directory: npm install --save multer
