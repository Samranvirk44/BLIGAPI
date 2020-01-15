var con = require('../connetion')
var models = require('../Modal/Modal')

function allsync() {
    con.connection.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}


function adminsync() {
    models.admin.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}

function cc_transactionsync() {
    models.cc_transaction.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}

function citiessync() {
    models.citie.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}


function companysync() {
    models.company.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}


function company_categorysync() {
    models.company_category.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}


function allsync() {
    con.connection.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}


function adminsync() {
    models.admin.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}

function cc_transactionsync() {
    models.cc_transaction.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}

function citiessync() {
    models.citie.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}


function companysync() {
    models.company.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}


function company_investorsync() {
    models.company_investor.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}



function company_typesync() {
    models.company_type.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}


function countriessync() {
    models.countries.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}

function couponssync() {
    models.coupons.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}


function coupons_subscribessync() {
    models.coupons_subscribes.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}

function email_templatesync() {
    models.email_template.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}




function entrepreneurcompanyesync() {
    models.entrepreneurcompany.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}

function entrepreneurservicessync() {
    models.entrepreneurservices.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}

function entreprenuersync() {
    models.entreprenuers.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}



function image_typesync() {
    models.image_type.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}


/////////////////////////////////////images
function imagessync() {
    models.images.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}
/////////////////////////////////////investors
function investorssync() {
    models.investors.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}
/////////////////////////////////////investorservices
function investorservicessync() {
    models.investorservices.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}
/////////////////////////////////////investortype
function investortypesync() {
    models.investortype.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}

/////////////////////////////////////marketplace
function marketplacesync() {
    models.marketplace.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}


/////////////////////////////////////milestones
function milestonesync() {
    models.milestone.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}
/////////////////////////////////////recepient
function recepientsync() {
    models.recepient.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}
/////////////////////////////////////roles
function rolesync() {
    models.role.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}
/////////////////////////////////////service_provided
function service_providedsync() {
    models.service_provided.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}
/////////////////////////////////////service_provider
function service_providersync() {
    models.service_provider.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}
/////////////////////////////////////services
function servicesync() {
    models.service.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}
/////////////////////////////////////sessions
function sessionsync() {
    models.session.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}
/////////////////////////////////////shares
function sharesync() {
    models.share.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}
/////////////////////////////////////singup
function singupsync() {
    models.signup.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}
/////////////////////////////////////states
function statesync() {
    models.state.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}
/////////////////////////////////////status
function statussync() {
    models.status.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}
/////////////////////////////////////subscription
function subscriptionsync() {
    models.subscription.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}
/////////////////////////////////////user_roles
function user_rolessync() {
    models.user_roles.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}
/////////////////////////////////////user_subscription
function user_subscriptionsync() {
    models.user_subscription.sync({
            logging: console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}
/////////////////////////////////////user2
function user2sync() {
    models.users2.sync({
            // logging:console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}
/////////////////////////////////////user2
function MessagePairsync() {
    models.message_pair.sync({
            // logging:console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}
/////////////////////////////////////user2
function MessageDatasync() {
    models.message_data.sync({
            // logging:console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}

/////////////////////////////////////user2
function bidsync() {
    models.bid.sync({
            // logging:console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}

/////////////////////////////////////user2
function ratemilestonesync() {
    models.rate_milestone.sync({
            // logging:console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}

/////////////////////////////////////user2
function contractpaymentssync() {
    models.contract_payments.sync({
            // logging:console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}
/////////////////////////////////////user2
function webinarsync() {
    models.webinar.sync({
            // logging:console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}

function credit_cardsync() {
    models.credit_card.sync({
            // logging:console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}
/////////////////////////////////////user2
function seminarsync() {
    models.seminar.sync({
            // logging:console.log,
            force: true
        })
        .then(() => {
            console.log('connection established.......')
        })
        .catch(err => {
            console.log('unable to connect:', err)
        })
}

module.exports.imagessync = imagessync
module.exports.investorssync = investorssync
module.exports.investorservicessync = investorservicessync
module.exports.investortypesync = investortypesync
module.exports.marketplacesync = marketplacesync
    //module.exports.messagesync=messagesync
module.exports.milestonesync = milestonesync
module.exports.recepientsync = recepientsync
module.exports.rolesync = rolesync
module.exports.service_providedsync = service_providedsync
module.exports.service_providersync = service_providersync
module.exports.servicesync = servicesync
module.exports.sessionsync = sessionsync
module.exports.sharesync = sharesync
module.exports.singupsync = singupsync
module.exports.statesync = statesync
module.exports.statussync = statussync
module.exports.subscriptionsync = subscriptionsync
module.exports.user_rolessync = user_rolessync
module.exports.user_subscriptionsync = user_subscriptionsync
module.exports.user2sync = user2sync





module.exports.allsync = allsync
module.exports.adminsync = adminsync
module.exports.cc_transactionsync = cc_transactionsync
module.exports.citiessync = citiessync
module.exports.companysync = companysync
module.exports.company_categorysync = company_categorysync
module.exports.company_investorsync = company_investorsync
module.exports.company_typesync = company_typesync
module.exports.countriessync = countriessync
module.exports.couponssync = couponssync
module.exports.coupons_subscribessync = coupons_subscribessync
module.exports.email_templatesync = email_templatesync
module.exports.entrepreneurcompanyesync = entrepreneurcompanyesync
module.exports.entrepreneurservicessync = entrepreneurservicessync
module.exports.entreprenuersync = entreprenuersync
module.exports.image_typesync = image_typesync
module.exports.MessageDatasync = MessageDatasync
module.exports.MessagePairsync = MessagePairsync
module.exports.ratemilestonesync = ratemilestonesync
module.exports.webinarsync = webinarsync
module.exports.seminarsync = seminarsync
module.exports.credit_cardsync = credit_cardsync

function syncc() {
    adminsync()
    cc_transactionsync()
    citiessync()
    companysync()

    company_categorysync()
    company_investorsync()
    company_typesync()
    countriessync()
    couponssync()
    coupons_subscribessync()
    email_templatesync()
    entrepreneurcompanyesync()
    entrepreneurservicessync()
    entreprenuersync()
    image_typesync()
    imagessync()
    investorssync()
    investorservicessync()
    investortypesync()
    marketplacesync()
        // messagesync()
    milestonesync()
    recepientsync()
    rolesync()
    service_providedsync()
    service_providersync()
    servicesync()
    sessionsync()
    sharesync()
    singupsync()
    statesync()
    statussync()
    subscriptionsync()
    user_rolessync()
    user_subscriptionsync()
    user2sync()
    MessageDatasync();
    MessagePairsync()
    bidsync()
    ratemilestonesync()
    contractpaymentssync()
    webinarsync()
    seminarsync()
    credit_cardsync()
}

function sync() {
    companysync()
}
//sync()