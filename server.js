const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Chatkit = require("pusher-chatkit-server");
const app = express();

// init chatkit
const chatkit = new Chatkit.default({
  instanceLocator: "v1:us1:17ecc123-f301-4205-a569-62e7f1e51ca4",
  key:
    "25831bbd-436c-4992-8331-0bdf0d61d974:f8qsLok1El8alXLv2TQD7D+t33z6zrNNIus5lzGmFGg="
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// create users
app.post("/users", (req, res) => {
  const { username } = req.body;
  console.log(username);
  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error_type === "services/chatkit/user_already_exists") {
        res.sendStatus(200);
      } else {
        res.status(error.status).json(error);
      }
    });
});
const PORT = 3001;
app.listen(PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log(`Running on port ${PORT}`);
  }
});
