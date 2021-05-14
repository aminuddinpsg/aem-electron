function signIn() {
  // get user input
  const email = document.getElementById("exampleInputEmail1").value;
  const password = document.getElementById("exampleInputPassword1").value;

  // validating
  fetch('http://localhost:3000/user', {
    method: 'POST',
    body: JSON.stringify({
      username: email,
      password: password,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  }).then((response) => {
    if (response.ok) {
      location.replace("../website/dummy.html");
      return response.json();
    }else {
      // use pouchDB data to validate
      pouchDbValidation(email,password);
      return Promise.reject(response);
    }
  }).then((data) => {
    console.log(data);
  }).catch( (error) => {
    console.warn('Something went wrong.', error);
  });
}

function pouchDbValidation(email,password){
  user.search({
    query: [email, password],
    fields: ['username', 'password'],
    include_docs: true,
    highlighting: true
  }).then(function (res) {
    if (res.rows[0]) {
      console.log(res.rows[0]);
      location.replace("../website/dummy.html");
    }
  });
}

function signOut(){
  location.replace("../website/index.html");
}

var PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-quick-search'));
const user = new PouchDB('user');

// create user tbl
user
  .info()
  .then((info) => {
    console.log(info);
  })

// remove old record & add new one
/*user.get('user1').then( (doc) => {
  user.remove(doc).then(
    user.put({
      _id: 'user1',
      username: 'usermy',
      password: 'test123'
    }).then( (response) => {
      console.log("Success", response);
    }).then((err) => {
      console.log("Error", err);
    })
  );
}).catch((err) => {
  console.log(err);
});*/


// insert fresh data
// assume not data in pouch DB
  user
    .put({
      _id: 'user1',
      username: 'usermy',
      password: 'test123'
    }).then( (response) => {
      console.log("Success", response);
    })

  user
    .put({
      _id: 'user2',
      username: 'useraz',
      password: 'test123'
    }).then((response) => {
      console.log("Success", response);
    })

