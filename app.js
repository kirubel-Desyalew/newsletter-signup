const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us17.api.mailchimp.com/3.0/lists/51a388f6ac",
    method: "POST",
    headers: {
      Authorization: "kirubel edf4d4e957c97e6ac64fae528100c290-us17",
    },
    body: jsonData,
  };

  request(options, function (error, response, body) {
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen("3000", function () {
  console.log("server is running on port 3000");
});
