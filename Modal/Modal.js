const Sequelize = require('sequelize')
var db = require('../connetion')


//creatae models

const admin = db.connection.define('admin', {
    admin_id: Sequelize.INTEGER,
    duration: Sequelize.INTEGER,
    comession: Sequelize.INTEGER
});

const cc_transaction = db.connection.define('cc_transaction', {
    transaction_id: Sequelize.INTEGER,
    trans_date: Sequelize.DATE,
    processor: Sequelize.STRING,
    processor_trans_id: Sequelize.STRING,
    amount: Sequelize.INTEGER,
    charges: Sequelize.INTEGER,
    cc_num: Sequelize.INTEGER,
    cc_type: Sequelize.INTEGER,
    code: Sequelize.INTEGER,
    response: Sequelize.TEXT
})
const credit_card = db.connection.define('credit_card', {
    c_name: Sequelize.STRING,
    c_num: Sequelize.STRING,
    c_expiry_month: Sequelize.INTEGER,
    c_expiry_year: Sequelize.INTEGER,
    cvv_num: Sequelize.INTEGER,
    user_id: Sequelize.INTEGER

});
const citie = db.connection.define('citie', {
    city_id: Sequelize.INTEGER,
    state_id: Sequelize.INTEGER,
    city_name: Sequelize.STRING
});



const company = db.connection.define('company', {

    company_id: Sequelize.INTEGER,
    company_name: Sequelize.STRING,
    company_desc: Sequelize.STRING,
    company_logo: Sequelize.STRING,
    email: Sequelize.STRING,
    cell: Sequelize.TEXT,
    add1: Sequelize.STRING,
    add2: Sequelize.STRING,
    country_id: Sequelize.STRING,
    state_id: Sequelize.STRING,
    city_id: Sequelize.STRING,
    postal_cod: Sequelize.STRING,
    reg_num: Sequelize.STRING,
    company_cat_id: Sequelize.INTEGER,
    company_type_id: Sequelize.INTEGER,
    last_y_rev: Sequelize.INTEGER,
    next_y_rev: Sequelize.INTEGER,
    entre_id: Sequelize.INTEGER,
    investment_req: Sequelize.INTEGER,
    investment_eq: Sequelize.INTEGER,
    investment_duration: Sequelize.INTEGER,
    c_investor_id: Sequelize.INTEGER,
    req_attachment: Sequelize.STRING,
    file1_attachment: Sequelize.STRING,
    video_attachment: Sequelize.STRING,
    file2_attachment: Sequelize.STRING,
    profit: Sequelize.STRING,
    loss: Sequelize.STRING,
    expenditures: Sequelize.STRING,
    blig_equity: Sequelize.INTEGER,
    funding: Sequelize.INTEGER,
    longitude: Sequelize.DOUBLE,
    latitude: Sequelize.DOUBLE,
    marketplace: Sequelize.BOOLEAN,
    feature: Sequelize.BOOLEAN,
    sales_equity: Sequelize.FLOAT,
    entreprenuer: Sequelize.BOOLEAN,
    status: Sequelize.STRING,
    Loan_Financing: Sequelize.FLOAT,

    created_at: Sequelize.DATE,
    created_by: Sequelize.INTEGER,
    updated_at: Sequelize.DATE,
    updated_by: Sequelize.INTEGER,
})
const company_category = db.connection.define('company_category', {

    company_cat_id: Sequelize.INTEGER,
    cat_name: Sequelize.STRING,
    created_at: Sequelize.DATE,
    created_by: Sequelize.INTEGER,
    updated_at: Sequelize.DATE,
    updated_by: Sequelize.INTEGER
})
const company_investor = db.connection.define('company_investor', {
    c_investor_id: Sequelize.INTEGER,
    investor_id: Sequelize.INTEGER,
    company_id: Sequelize.INTEGER,
    investor_equity: Sequelize.INTEGER,
    milestone_qty: Sequelize.INTEGER,
    total_investment: Sequelize.INTEGER,
    investment_end: Sequelize.DATE,
    payment_method: Sequelize.STRING,
    status: Sequelize.STRING,
    created_at: Sequelize.DATE,
    created_by: Sequelize.INTEGER,
    updated_at: Sequelize.DATE,
    updated_by: Sequelize.INTEGER,
    contract_number: Sequelize.STRING

})

const company_type = db.connection.define('company_type', {

    company_type_id: Sequelize.INTEGER,
    type_name: Sequelize.STRING,
    created_at: Sequelize.DATE,
    created_by: Sequelize.INTEGER,
    updated_at: Sequelize.DATE,
    updated_by: Sequelize.INTEGER

})

const countries = db.connection.define('countries', {
    country_id: Sequelize.STRING,
    iso_num: Sequelize.STRING,
    country_name: Sequelize.STRING

})

const coupons = db.connection.define('coupons', {
    coupon_id: Sequelize.INTEGER,
    code: Sequelize.STRING,
    description: Sequelize.STRING,
    active: Sequelize.BOOLEAN,
    coupon_value: Sequelize.INTEGER,
    multiple: Sequelize.BOOLEAN,
    usage_limit: Sequelize.INTEGER,
    min_order: Sequelize.INTEGER,
    max_amount: Sequelize.INTEGER,
    start_date: Sequelize.DATE,
    end_date: Sequelize.DATE,
    created_at: Sequelize.DATE,
    created_by: Sequelize.INTEGER,
    updated_at: Sequelize.DATE,
    updated_by: Sequelize.INTEGER
})

const coupons_subscribes = db.connection.define('coupons_subscribes', {
    coupons_id: Sequelize.INTEGER,
    subscription_id: Sequelize.INTEGER

})

const email_template = db.connection.define('email_template', {
    template_id: Sequelize.INTEGER,
    template_type: Sequelize.STRING,
    template_name: Sequelize.STRING,
    subject: Sequelize.STRING,
    message: Sequelize.STRING,
    fromname: Sequelize.STRING,
    fromemail: Sequelize.STRING,
    palintext: Sequelize.TEXT,
    active: Sequelize.BOOLEAN,
    created_at: Sequelize.DATE,
    created_by: Sequelize.INTEGER,
    updated_at: Sequelize.DATE,
    updated_by: Sequelize.INTEGER

})

const entrepreneurcompany = db.connection.define('entrepreneurcompany', {
    ecid: Sequelize.INTEGER,
    company_id: Sequelize.INTEGER,
    companytype_id: Sequelize.INTEGER,
    companycategory_id: Sequelize.INTEGER

})

const entrepreneurservices = db.connection.define('entrepreneurservices', {
    esid: Sequelize.INTEGER,
    company_id: Sequelize.INTEGER,
    service_id: Sequelize.INTEGER

})

const entreprenuers = db.connection.define('entreprenuers', {
    entre_id: Sequelize.INTEGER,
    user_id: Sequelize.INTEGER,
    active: Sequelize.BOOLEAN,
    business_kind: Sequelize.INTEGER,
    created_at: Sequelize.DATE,
    created_by: Sequelize.INTEGER,
    updated_at: Sequelize.DATE,
    updated_by: Sequelize.INTEGER


})

const image_type = db.connection.define('image_type', {
    image_type_id: Sequelize.INTEGER,
    image_type_name: Sequelize.STRING
})


//////////////////////images
const images = db.connection.define('image', {


    image_id: Sequelize.INTEGER,
    user_id: Sequelize.INTEGER,
    image_title: Sequelize.STRING,
    image_type_id: Sequelize.INTEGER,
    name: Sequelize.STRING,
    uri: Sequelize.STRING,
    entreprenuer: Sequelize.BOOLEAN,
    identity_proof: Sequelize.BOOLEAN,
    profile_pic: Sequelize.BOOLEAN,
    created_by: Sequelize.INTEGER,
    updated_at: Sequelize.DATE,
    updated_by: Sequelize.INTEGER,


});
//////////////////////investors
const investors = db.connection.define('investor', {
    user_id: Sequelize.INTEGER,
    investor_id: Sequelize.INTEGER,
    total_investment: Sequelize.INTEGER,
    total_invested: Sequelize.INTEGER,
    total_c_invested: Sequelize.INTEGER,
    country_id: Sequelize.STRING,
    state_id: Sequelize.STRING,
    id_pro: Sequelize.STRING,
    add_pro: Sequelize.STRING,
    latitude: Sequelize.DOUBLE,
    longitude: Sequelize.DOUBLE,
    business_kind: Sequelize.INTEGER,
    blig_equity: Sequelize.INTEGER,
    active: Sequelize.BOOLEAN,
    mini_eq_company_require: Sequelize.INTEGER,
    mini_eq_require: Sequelize.INTEGER,
    created_at: Sequelize.DATE,
    created_by: Sequelize.INTEGER,
    updated_at: Sequelize.DATE,
    updated_by: Sequelize.INTEGER,


});

//////////////////////investorservices
const investorservices = db.connection.define('investorservice', {
    is_id: Sequelize.INTEGER,
    investor_id: Sequelize.INTEGER,
    services_id: Sequelize.INTEGER,

});
//////////////////////investortype
const investortype = db.connection.define('investortype', {
    it_id: Sequelize.INTEGER,
    investor_id: Sequelize.INTEGER,
    companytype_id: Sequelize.INTEGER,

});
//////////////////////marketplace
const marketplace = db.connection.define('marketplace', {
    company_id: Sequelize.INTEGER,
    status_id: Sequelize.INTEGER,
    transanction_id: Sequelize.INTEGER,
    sponsored: Sequelize.BOOLEAN,
    created_at: Sequelize.DATE,
    created_by: Sequelize.INTEGER,
    updated_at: Sequelize.DATE,
    updated_by: Sequelize.INTEGER,

});
//////////////////////messages

const message_pair = db.connection.define('message_pair', {

    user1: Sequelize.INTEGER,
    user2: Sequelize.INTEGER,
    date_time: Sequelize.DATE

});
const message_data = db.connection.define('message_data', {
        message_pair_id: Sequelize.INTEGER,
        message: Sequelize.STRING,
        state: Sequelize.INTEGER,
        date_time: Sequelize.DATE

    })
    //////////////////////milestones
const milestone = db.connection.define('milestone', {
    milestone_id: Sequelize.INTEGER,
    //milestone_desc: Sequelize.TEXT,
    c_investor_id: Sequelize.INTEGER,
    // status_id: Sequelize.INTEGER,
    milestone_start: Sequelize.DATE,
    milestone_end: Sequelize.DATE,
    amount: Sequelize.INTEGER,
    transanction_id: Sequelize.INTEGER,
    e_release_date: Sequelize.DATE,
    e_recieving_date: Sequelize.DATE,
    milestone_att_1: Sequelize.STRING,
    //milestone_att_2: Sequelize.STRING,
    //milestone_att_3: Sequelize.STRING,
    percentage_equity: Sequelize.INTEGER,
    rating: Sequelize.INTEGER,
    created_at: Sequelize.DATE,
    created_by: Sequelize.INTEGER,
    updated_at: Sequelize.DATE,
    updated_by: Sequelize.INTEGER,
    project_description: Sequelize.STRING,
    project_tittle: Sequelize.STRING,
    status: Sequelize.STRING,

    feedback: Sequelize.TEXT,
    feedback_attached: Sequelize.STRING,
    feedback_video: Sequelize.STRING,
    modefication_detail: Sequelize.STRING,
    modefication_attached: Sequelize.STRING,
    modefication_video: Sequelize.STRING,
});
//////////////////////recepient
const recepient = db.connection.define('recepient', {
    recepient_id: Sequelize.INTEGER,
    message_id: Sequelize.INTEGER,
    is_read: Sequelize.BOOLEAN,

});
//////////////////////roles
const role = db.connection.define('role', {
    role_id: Sequelize.INTEGER,
    name: Sequelize.STRING,
    created_at: Sequelize.DATE,
    created_by: Sequelize.INTEGER,
    updated_at: Sequelize.DATE,
    updated_by: Sequelize.INTEGER,

});
//////////////////////service_provided
const service_provided = db.connection.define('service_provided', {
    service_provided_id: Sequelize.INTEGER,
    service_provider_id: Sequelize.INTEGER,
    user_id: Sequelize.INTEGER,
    transanction_id: Sequelize.INTEGER,
    rate: Sequelize.INTEGER,
    amount: Sequelize.INTEGER,
    start_time: Sequelize.DATE,
    end_time: Sequelize.DATE,
    comession_blig: Sequelize.INTEGER

});
//////////////////////service_provider
const service_provider = db.connection.define('service_provider', {
    service_provider_id: Sequelize.INTEGER,
    service_id: Sequelize.INTEGER,
    start_date: Sequelize.DATE,
    end_date: Sequelize.DATE,
    comession: Sequelize.INTEGER,
    rate: Sequelize.INTEGER,
    user_id: Sequelize.INTEGER,

});
//////////////////////services
const service = db.connection.define('service', {

    service_id: Sequelize.INTEGER,
    service_name: Sequelize.STRING,
});
const session = db.connection.define('session', {

    //    session_id:Sequelize.STRING,
    ip_address: Sequelize.STRING,
    mac_address: Sequelize.STRING,
    email: Sequelize.STRING,
    status: Sequelize.BOOLEAN,
    //  session_data:Sequelize.TEXT,
    created_at: Sequelize.DATE,
    updated_at: Sequelize.DATE,
    entrepreneur: Sequelize.BOOLEAN
});
//////////////////////shares
const share = db.connection.define('share', {

    company_id: Sequelize.INTEGER,
    user_id: Sequelize.INTEGER,
    shares: Sequelize.INTEGER,

});
//////////////////////signup
const signup = db.connection.define('signup', {

    user_assign_id: Sequelize.INTEGER,
    email: Sequelize.STRING,
    password: Sequelize.STRING,

});
//////////////////////states
const state = db.connection.define('state', {

    state_id: Sequelize.STRING,
    country_id: Sequelize.STRING,
    code: Sequelize.STRING,
    state_name: Sequelize.STRING,

});
//////////////////////status
const status = db.connection.define('statu', {

    status_id: Sequelize.INTEGER,
    status_name: Sequelize.STRING,
    status_desc: Sequelize.STRING,
    created_at: Sequelize.DATE,
    created_by: Sequelize.INTEGER,
    updated_at: Sequelize.DATE,
    updated_by: Sequelize.INTEGER,

});
//////////////////////subscription
const subscription = db.connection.define('subscription', {

    subscription_id: Sequelize.INTEGER,
    subs_name: Sequelize.STRING,
    subs_desc: Sequelize.STRING,
    subs_dur: Sequelize.INTEGER,
    subs_amount: Sequelize.INTEGER,
    subs_discount: Sequelize.INTEGER,
    subs_total: Sequelize.INTEGER,
    created_at: Sequelize.DATE,
    created_by: Sequelize.INTEGER,
    updated_at: Sequelize.DATE,
    updated_by: Sequelize.INTEGER,

});
//////////////////////user_roles
const user_roles = db.connection.define('user_role', {

    user_id: Sequelize.INTEGER,
    role_id: Sequelize.INTEGER,
    created_at: Sequelize.DATE,
    created_by: Sequelize.INTEGER,
    updated_at: Sequelize.DATE,
    updated_by: Sequelize.INTEGER,

});
//////////////////////user_subscription
const user_subscription = db.connection.define('user_subscription', {

    subscription_id: Sequelize.INTEGER,
    startdate: Sequelize.DATE,
    enddate: Sequelize.DATE,
    nextdate: Sequelize.DATE,
    processor: Sequelize.STRING,
    processor_trans_id: Sequelize.STRING,
    cc_num: Sequelize.STRING,
    code: Sequelize.TEXT,
    cc_type: Sequelize.TEXT,
    response: Sequelize.TEXT,
    created_at: Sequelize.DATE,
    created_by: Sequelize.INTEGER,
    updated_at: Sequelize.DATE,
    updated_by: Sequelize.INTEGER,
    expiry: Sequelize.INTEGER,
    card_holder_name: Sequelize.STRING,
    user_subs_id: Sequelize.INTEGER,
    user_id: Sequelize.INTEGER,
    payed: Sequelize.BOOLEAN,
    entreprenuer: Sequelize.BOOLEAN

});
//////////////////////users2
const users2 = db.connection.define('users2', {
    user_id: Sequelize.INTEGER,
    email: Sequelize.TEXT,
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    contact_no: Sequelize.INTEGER,
    password: Sequelize.STRING,
    active: Sequelize.BOOLEAN,
    activation_key: Sequelize.STRING,
    dob: Sequelize.DATE,
    address1: Sequelize.TEXT,
    address2: Sequelize.TEXT,
    country_id: Sequelize.STRING,
    state_id: Sequelize.STRING,
    city_id: Sequelize.STRING,
    identity_proof: Sequelize.STRING,
    address_proof: Sequelize.STRING,
    user_subs_id: Sequelize.INTEGER,
    profile_pic: Sequelize.STRING,
    latitude: Sequelize.DOUBLE,
    longitude: Sequelize.DOUBLE,
    investment_start: Sequelize.DATE,
    kind_business: Sequelize.INTEGER,
    language: Sequelize.STRING,
    Response_time: Sequelize.STRING,
    created_at: Sequelize.DATE,
    created_by: Sequelize.INTEGER,
    updated_at: Sequelize.DATE,
    updated_by: Sequelize.INTEGER,


});
const bid = db.connection.define('bid', {
    user_id: Sequelize.INTEGER,
    company_id: Sequelize.INTEGER,
    offer_desc: Sequelize.STRING,
    start_date: Sequelize.DATE,
    end_date: Sequelize.DATE,
    total_price: Sequelize.INTEGER,
    status: Sequelize.STRING
});
const rate_milestone = db.connection.define('rate_milestone', {
    c_investor_id: Sequelize.INTEGER,
    milestone_id: Sequelize.INTEGER,
    investor_id: Sequelize.INTEGER,
    rate_value_time: Sequelize.FLOAT,
    rate_value_professionalism: Sequelize.FLOAT,
    rate_value_leadership: Sequelize.FLOAT,
    rate_value_success_rate_per_stage: Sequelize.FLOAT,
    rate_value_communicaion_skils: Sequelize.FLOAT,
    total_score: Sequelize.FLOAT,


});

//this table manage by admin
const contract_payments = db.connection.define('contract_payments', {
    c_investor_id: Sequelize.INTEGER,
    milestone_id: Sequelize.INTEGER,
    amount: Sequelize.INTEGER,
    transaction_number: Sequelize.STRING,
    status: Sequelize.STRING,
    date: Sequelize.DATE

})
const webinar = db.connection.define('wabinar', {
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    name: Sequelize.STRING,
    date: Sequelize.DATE,
    video_uri: Sequelize.STRING

});

const seminar = db.connection.define('seminar', {
    title: Sequelize.STRING,
    description: Sequelize.STRING,
    name: Sequelize.STRING,
    date: Sequelize.DATE,
    address: Sequelize.STRING,
    video_uri: Sequelize.STRING

});
entrepreneurcompany.belongsTo(company)
company.hasMany(entrepreneurcompany, {
    foreignKey: {
        fieldName: 'company_id'
    }
});

company.hasMany(entrepreneurcompany, {
    foreignKey: {
        fieldName: 'company_id'
    }
});
company_type.hasMany(entrepreneurcompany, {
    foreignKey: {
        fieldName: 'companytype_id'
    }
});
company_investor.hasMany(milestone, {
    foreignKey: {
        fieldName: 'c_investor_id'
    }
});
company_investor.hasMany(rate_milestone, {
    foreignKey: {
        fieldName: 'c_investor_id'
    }
});
company.hasMany(bid, {
    foreignKey: {
        fieldName: 'company_id'
    }
});
milestone.hasMany(contract_payments, {
    foreignKey: {
        fieldName: 'milestone_id'
    }
});
company_investor.hasMany(contract_payments, {
    foreignKey: {
        fieldName: 'c_investor_id'
    }
});
company.hasMany(entrepreneurservices, {
    foreignKey: {
        fieldName: 'company_id'
    }
});

investors.hasMany(investortype, {
    foreignKey: {
        fieldName: 'investor_id'
    }
});
investors.hasMany(investorservices, {
    foreignKey: {
        fieldName: 'investor_id'
    }
});
module.exports.images = images
module.exports.investors = investors
module.exports.investorservices = investorservices
module.exports.investortype = investortype
module.exports.marketplace = marketplace
    //module.exports.message = message
module.exports.milestone = milestone
module.exports.recepient = recepient
module.exports.role = role
module.exports.service_provided = service_provided
module.exports.service_provider = service_provider
module.exports.service = service
module.exports.session = session
module.exports.share = share
module.exports.signup = signup
module.exports.state = state
module.exports.status = status
module.exports.subscription = subscription
module.exports.user_roles = user_roles
module.exports.user_subscription = user_subscription
module.exports.users2 = users2

module.exports.admin = admin
module.exports.cc_transaction = cc_transaction
module.exports.citie = citie
module.exports.company = company
module.exports.company_category = company_category
module.exports.company_investor = company_investor
module.exports.company_type = company_type
module.exports.countries = countries
module.exports.coupons = coupons
module.exports.coupons_subscribes = coupons_subscribes
module.exports.email_template = email_template
module.exports.entrepreneurcompany = entrepreneurcompany
module.exports.entrepreneurservices = entrepreneurservices
module.exports.entreprenuers = entreprenuers
module.exports.image_type = image_type
module.exports.message_pair = message_pair
module.exports.message_data = message_data
module.exports.bid = bid
module.exports.rate_milestone = rate_milestone
module.exports.contract_payments = contract_payments
module.exports.webinar = webinar
module.exports.seminar = seminar
module.exports.credit_card = credit_card