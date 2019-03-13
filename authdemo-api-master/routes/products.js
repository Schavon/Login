//products

let auth = require('./auth');

module.exports.get = async (req, res) => {
    // ring mongo
    
    if ( await auth.isAdmin(req.headers.authorization)){
        console.log('Yes!');
        res.status(200).send(['product1', 'product2'])
        // admin
    } else {
        
        // inte admin
        res.status(403).send('väx upp!');
    }
} 