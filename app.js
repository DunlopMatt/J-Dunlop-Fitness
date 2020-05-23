const express       = require('express'),
      nodemailer    = require('nodemailer'),
      flash         = require('connect-flash'),
      bodyParser    = require('body-parser');

var app = express();

// set the view engine
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

//session
app.use(require("express-session")({
  secret: "Alllrighty then!",
  resave: false,
  saveUninitialized: false
}));

//flash middle ware
app.use(flash());
app.use(function(req, res, next){
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

//contentfull
const contentful = require("contentful");
const client = contentful.createClient({
  space: "xtro6jmgne1s",
  accessToken: "lE_0yuJVrp6MKWjaQDR8qTXJzNxbPWH0udPAW19Zeok"
});
// This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.
client
  .getEntry("2dbRz7NI6BfZbW6lu41cCy")
  .then(entry => console.log(entry))
  .catch(err => console.log(err));

// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

//show pages
//posts
app.get('/posts', function(req, res) {
  res.render('pages/posts');
});

//Clients
app.get('/clients', function(req, res) {
  res.render('pages/clients');
});


//post route to send contact form

//get info from for
app.post('/', function(req, res){
    var output = `
    <p> You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>
      <li>First Name: ${req.body.FirstName}</li>
      <li>Last Name: ${req.body.LastName}</li>
      <li>Contact Number: ${req.body.ContactNumber}</li>
      <li>Email: ${req.body.Email}</li>
    </ul>
    <h3>Message<h3>
    <p>${req.body.Message}</p>
    `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "dunlopmatt2@gmail.com", 
      pass: "K100603w!"
    }
  });

  // setup email data
  let mailOptions = {
    from: '"nodeMailer" <dunlopmatt2@gmail.com>', // sender address
    to: "dunlopmatt2@gmail.com", // list of receivers
    subject: "New Contact", // Subject line
    html: output // html body
  };

  //send email with transport object
  transporter.sendMail(mailOptions, function(err, info){
    if(err){
      req.flash("error", err.message);
    }else{
    req.flash("success","Thank you for submitting " + req.body.FirstName)
    res.redirect('/');
    }
  });
  
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});