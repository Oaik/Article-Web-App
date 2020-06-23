# ArticlePage
Website allow people to sign up and start to write articles in several categories or (edit/delete) his own articles and other people can read his article (CRUD APP) 

<a href="https://aqueous-reef-27948.herokuapp.com/">Live preview</a>

Technology and languages Used: Bootstrap, JavaScript, Node.js, Express.js, MongoDB.js, Passport.js

<ul>
  <li><a href="#-feature-of-the-app">App features</a></li>
  <li><a href="#-how-to-install-and-run-the-app">running the app in your local server</a></li>
</ul>

### 🚀 Feature of the app
- Register/login system
- Registered users can create articles also he can edit his own articles or delete any of them
- index page will contain all written articles sorted in publish date 

<h3>🚀 How to install and run the app</h3>

Download the github repository
### install nodeJS
which can be downloaded <a href="https://nodejs.org/en/download/">here</a>

### database setup
in order to intrect with database mongo must be installed which can be downloaded from <a href="https://www.mongodb.com/download-center/community">here</a>
make sure that mongo is running, in case you don't know wheather your database is running or not follow this instruction for <a href="https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows">winodw</a> or <a href="https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#start-mongodb">linux</a>

### installing dependices
which can be easily done using `npm` *if you installed node, npm will be installed*
```console
$ npm install
```

### runing the app
To `run` the app using `node`:
```console
$ node app.js
```
#### now open your browser and open `http://localhost:5000/`
