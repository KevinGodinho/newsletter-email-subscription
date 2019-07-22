const express = require('express');
const app = express();
const port = process.env.PORT;

const bodyParser = require('body-parser');
const request = require ('request');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendFile(__dirname + '/signup.html'));

app.post('/', (req, res) => {

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const options = {
    url: 'https://us3.api.mailchimp.com/3.0/lists/f36b920316',
    method: 'POST',
    headers: {
      'Authorization': 'kevin 9f646bdb9791e80c6a133dffbd021775-us3'
    },
    body: jsonData,
  };

  request(options, (error, response, body) => {
    if (error) {
      res.sendFile(__dirname + '/failure.html');
      console.log(error);
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + '/success.html');
        console.log(response.statusCode);
      } else {
        res.sendFile(__dirname + '/failure.html');
      }
    }
  });

});

app.post('/failure', (req, res) => res.redirect('/'));

app.listen(port || 3000, console.log(`Server is running on port ${port}`));

// 9f646bdb9791e80c6a133dffbd021775-us3

// f36b920316
