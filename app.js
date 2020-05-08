var express       = require('express'),
    nodemailer    = require('nodemailer'),
    bodyParser    = require('body-parser');

var app = express();

// set the view engine
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
//body parser middleware
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

// about page 
app.get('/about', function(req, res) {
    res.render('pages/about');
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
      console.log(err);
    }
    res.render('pages/index');
    //  TODO:  add in flash to say message sent!
  });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});