// import express from "express";
// import { Book } from "./models/complain.js";
// import mongoose from 'mongoose';
// import bookRoute from './routes/booksRoute.js';
// import cors from'cors';
// import {PORT , mongoDBURL} from './server/server.js';

// const app = express();




// //Middleware for parsing request body
// app.use(express.json());

// //Middleware for handling CORS POLICY
// //Option 1:Allow All origins with Default of cors(*)
// app.use(cors());
// //option 2: Allow Custom Origins

// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET','POST','PUT','DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )

// app.get('/',(request,response)=> {
//     console.log(request);
//     return response.status(234).send('welcome To MERN Stack Tutorial'); 

// });

// app.use('/books',bookRoute); 



import express from "express";
import { PORT ,mongoDBURL } from "./config.js"; 
import mongoose from 'mongoose';
import bookRoute from './routes/booksRoute.js';
import cors from'cors';

const app = express();

//Middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS POLICY
//Option 1:Allow All origins with Default of cors(*)
app.use(cors());
//option 2: Allow Custom Origins
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET','POST','PUT','DELETE'],
        allowedHeaders: ['Content-Type'],
    })
)

app.get('/',(request,response)=> {
    console.log(request);
    return response.status(234).send('welcome To MERN Stack Tutorial'); 

});

app.use('/books',bookRoute); 

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
            
    })
    .catch((error) => {
        console.log(error);
    });

 