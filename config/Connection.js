const mongoose = require('mongoose');

function connection() {
    mongoose.connect(process.env.CONNECTION_STRING)
    .then((res) => {
        console.log(
            'database connected succesfully',
            '\nHost:', res.connection.host,
            '\nPort:',res.connection.port,
            '\nname:', res.connection.name
        );
    })
}

module.exports = connection