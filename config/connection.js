const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost:27017/project');


mongoose.connection
    .once("open",() => console.log("connected db"))
    .on("error", error => {
        console.log(error);
    });
    