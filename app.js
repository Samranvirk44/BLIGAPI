const express = require('express');
const app = express();

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
const bodyParser = require('body-parser');
const Connection = require('./connetion');
//convert into json
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//import files
const Signup = require('./routes/Signup/Signup');
const LogIn = require('./routes/Login/Login');
const Register = require('./routes/Register/Register');
const Company = require('./routes/MarkeetPlace/Company');
const MarketPlace = require('./routes/MarkeetPlace/Markeet');
const Investor = require('./routes/Investor/Investor');
const User = require('./routes/User/User');
const Image = require('./routes/Images/ImagesUpload');
const DashboardCompany = require('./routes/Company/Company');
const Profile = require('./routes/Profile/Profile');
const MileStones = require('./routes/Payment/MileStones');
const Wallet = require('./routes/Wallet/Wallet');
const Session = require('./routes/Session/Session');
const Chat = require('./routes/Chat/Chat');
const Entrepreneur = require('./routes/Entrepreneur/Entrepreneur');
const Contract = require('./routes/Contract/Contract');
const subscription=require('./routes/Subscription/SubscriptionPlan');
const Stripe=require('./routes/Stripe/Stripe')
// 
const models =require('./Modal/Modal')
io.on('connection', function (socket) {
    console.log("a user connected..")

    socket.on('BLIG', Receivermessage => {
        console.log("receiver id=>",Receivermessage)
        let values = [{
            message_pair_id: Receivermessage.PairId,
            message: Receivermessage.Message,
            state: Receivermessage.SenderId,
        }];
        models.message_data.bulkCreate(values)
            .then((data) => {
                models.message_data.findAll({
                    attributes: ['message', 'state'],
                    where: {
                        message_pair_id: values[0].message_pair_id,
                    }
                }).then(Chat => {
                    console.log('Receiver Id=>',Receivermessage.ReceiverId,JSON.stringify(Chat))
                    socket.broadcast.emit(Receivermessage.ReceiverId, Chat);
                    // console.log("Chattt=>",Chat)
                })
            })

    })
});

//api's
app.use('/', (req, res, next) => {
    Connection.connection.authenticate()
        .then(() => { console.log("Database connected..."), next() })
        .catch(err => { console.log('error', err), res.redirect('/error') })
})
app.use('/SignUp', Signup);
app.use('/LogIn', LogIn);
app.use('/Register', Register);
app.use('/Company', Company);
app.use('/Investor', Investor);
app.use('/User', User);
app.use('/Image', Image);
app.use('/MarketPlace', MarketPlace);
app.use('/DashboardCompany', DashboardCompany);
app.use('/Profile', Profile);
app.use('/MileStones', MileStones);
app.use('/Wallet', Wallet);
app.use('/Session', Session);
app.use('/Chat', Chat);
app.use('/Entrepreneur', Entrepreneur);
app.use('/Contract', Contract);
app.use('/Subscription',subscription);
app.use('/Stripe',Stripe)

//to show error






//to show error
app.use('/error', (req, res, next) => {
    res.send("connection not authenticated")
})

server.listen(80, () => console.log("server is listening at port 3000"))