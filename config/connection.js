const mongoose = require('mongoose');



mongoose.connect(process.env.MOONGOSE);


mongoose.connection
    .once("open",() => console.log("connected db"))
    .on("error", error => {
        console.log(error);
    });
    