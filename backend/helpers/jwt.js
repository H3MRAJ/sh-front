const expressJwt =require('express-jwt');

function authJwt(){
    const secret=process.env.secret;
    const api= process.env.API_URL;
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        //revoking under certain conditions
        isRevoked: isRevoked
    }).unless({
        path:[ 
            {url: /\/api\/one\/products(.*)/,methods:['GET','OPTIONS']},
            {url: /\/api\/one\/categories(.*)/,methods:['GET','OPTIONS']},
            `${api}/users/login`,
            `${api}/users/register`
        ]
    })
}

async function isRevoked(req, payload, done) {
    if(!payload.isAdmin) {
        done(null, true)
    }
    done();
}

module.exports= authJwt;