const urlscan = require('../urlscan.js')
const config = require('../config.js')
const APIKEY = config.APIKEY

// Submits a domain and then queries to get the result of the scan when it is complete.
let domaintosearch = 'mycrypto.com'
new urlscan().searchdomain(domaintosearch).then( function( searchoutput ) {
    get_result(searchoutput.results[0]._id)
} )

// console.logs the result associated with the most-recent task when searching for a domain.
get_result = (uuid) => {
    new urlscan().result(uuid).then( function( resultoutput ) {
        if (resultoutput.statusCode != 404) {
            console.log(JSON.stringify(resultoutput, null, 2))
        }
    } )
};
