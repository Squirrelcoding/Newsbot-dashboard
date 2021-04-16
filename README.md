# Newsbot Dashboard
Control the Newsbot easily without comands using this Dashboard!

# Installing
Follow the instructions to use this dashboard!

## Prerequisites
- Nodejs Installed (v15.12.2)
- Firebase w/ service account
- Git installed

### 1. Clone the respitory
Go to the shell, then type `git clone https://github.com/Squirrelcoding/Newsbot-dashboard.git`
Then open the respitory.

### 2. Make the files
In the shell type `touch key.json` and paste your service account private key

### 3. Install the dependencies
Again, in the shell type `npm i express firebase-admin lodash vue@2.6.12 vue-server-renderer`

### 4. Set up the values in firebase
Go to the firebase console and do the following:
1. Go to Firestore
2. Click `+ Start Collection`
3. Name the collection `Test` and create a document called `articles`
4. Make the following `map` values with the names: `allArticles`, `list`, `queue`, and `whitelist`.
5. Make another value with a string or a number type and enter your discord ID called `main`.
6. Your done!

### 5. Use it!

To use, just type `node index.js` in the shell. After that, open your web browser and type `http:localhost:8080/` and your dashboard is ready to use!

---
# Features
- Get all articles in a JSON file
- Delete articles
- Publish articles
- See articles, whitelisted users and the main admin (you)
- Remove and add user's that can publish and delete articles.
