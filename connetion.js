const Sequelize = require('sequelize')
const connection = new Sequelize('BLIG', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        timestamps: false
    }
});

// const connection = new Sequelize('BLIG', 'Flux', '12345678', {   //flux is user name of aws
//     host: 'flux.crdx3foiwt0r.us-east-2.rds-preview.amazonaws.com',
//     dialect: 'postgres',
//     define: {
//         timestamps: false      //turnoff timestapm
//     }
// });
// const connection = new Sequelize('BLIG', 'Flux', '12345678', {
//     host: 'projectmanager.crdx3foiwt0r.us-east-2.rds-preview.amazonaws.com',
//     dialect: 'postgres',
//     define: {
//         timestamps: false      //turnoff timestapm
//     }
// });


module.exports.connection = connection