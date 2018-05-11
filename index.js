const express = require("express");
const router = express.Router();

// Include the Stripe server library, and authenticate in your secret key.
const stripe = require("stripe")(process.env.STRIPE_KEY);

router.post("/", (request, response) => {
    // Build the options
    const options = {
        // If you're not hard-coding this on the server, make sure you validate
        // it so that it's the correct amount for what they're buying
        amount: +request.body.amount,
        currency: "usd",
        description: request.body.description,
        source: request.body.token,
    };
    // Create a charge with them
    stripe.charges.create(options, (error, charge) => {
        error
            // If there was an error processing it, send back an error
            ? response.status(400).json({error: error.message})
            // Otherwise, send back details about the payment
            : response.json({data: charge});
    });
});




// const express = require('express');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const cors = require('cors');

// const app = express();

// app.use(morgan('tiny'));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
// app.use(cors());

// app.get('/', (req, res) => {
//   res.json({
//     message: 'Hello World! 🌈'
//   });
// });

// app.use((req, res, next) => {
//   res.status(404);
//   const error = new Error('Not Found. 🔍');
//   next(error);
// });

// app.use((error, req, res, next) => {
//   res.status(res.statusCode || 500);
//   res.json({
//     message: error.message,
//     error: error.stack
//   });
// });

// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Listening on ${port}`);
// });
