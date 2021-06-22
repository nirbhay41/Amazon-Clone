module.exports = {
    target: 'serverless',
    images: {
        domains: ["fakestoreapi.com"]
    },

    env:{
        stripe_public_key: process.env.STRIPE_PUBLIC_KEY
    }
}