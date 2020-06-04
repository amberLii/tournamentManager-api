const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');
const router = express.Router();
const nodemailer = require('nodemailer');
const cors = require('cors');
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');
require('dotenv').config();
const creds = require('./config');
const path = require("path");
const multer = require("multer");
const Image = require('../src/models/image');

/*************Upload Image*************************/
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function(req, file, cb){
    cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});


const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
}).single("myImage");

router.post('/upload', function(req, res) {
  upload(req, res, function(err) {
    console.log('Request ---', req.body);
    console.log('Request file ---', req.file);//Here you get file.
    /*Now do where ever you want to do*/


    const newImage = new Image({
      imageName: req.file.filename,
      imageData: req.file.path
    });

    newImage.save().then((result)=>{
      console.log(result);
      res.status(200).json({
        success:true,
        document: result
      });
    }).catch((err)=>console.log(err));

    if (!err)
      return res.send(200).end();
  });
});

/************Upload Ends**********************/

var transport = {
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
};

var transporter = nodemailer.createTransport(transport);

transporter.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Server is ready to take messages');
  }
});

router.post('/send', (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var message = req.body.message;
  var content = `name: ${name} \n email: ${email} \n message: ${message} `;

  var mail = {
    from: name,
    to: 'tournamentmanager20@gmail.com',
    subject: 'New Message from Contact Organizer',
    text: content
  };

  transporter.sendMail(mail, (err) => {
    if (err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
        status: 'success'
      })
    }
  })
});

const emailApp = express();
emailApp.use(cors());
emailApp.use(express.json());
emailApp.use('/', router);
emailApp.listen(3002,()=>
  console.log(`Email server running at http://localhost:3002`)
);
emailApp.use(express.static('public')); //允许public被客户端访问，如： http://localhost:3002/uploads/IMAGE-1590388254502.png

const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

// Run our server on a port specified in our .env file or port 4000
const port = process.env.PORT || 4000;
const DB_HOST = process.env.DB_HOST;

const app = express();

db.connect(DB_HOST);

// Security middleware
app.use(helmet());
// CORS middleware
app.use(cors());

// get the user info from a JWT
const getUser = token => {
  if (token) {
    try {
      // return the user information from the token
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      // if there's a problem with the token, throw an error
      throw new Error('Session invalid');
    }
  }
};

// Apollo Server setup
// updated to include `validationRules`
const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
  context: async ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization;
    // try to retrieve a user with the token
    const user = getUser(token);
    // add the db models and the user to the context
    return { models, user };
  }
});

// Apply the Apollo GraphQL middleware and set the path to /api
server.applyMiddleware({ app, path: '/api' });

app.listen({ port }, () =>
  console.log(
    `GraphQL Server running at http://localhost:${port}${server.graphqlPath}`
  )
);
