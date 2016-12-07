var express = require('express');
var app = express();

app.use(express.static('public'));

const PORT = 8000;

app.route('/users').get(function (req, res) {

});

app.listen(PORT, function () {
    console.log("Server listening on: http://localhost:%s", PORT);
});