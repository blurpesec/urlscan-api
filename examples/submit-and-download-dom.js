const urlscan = require('../urlscan.js')
const config = require('../config.js')
const APIKEY = config.APIKEY
const filename = 'mycrypto.txt'

// Submits a domain and then downloads the DOM when the scan is complete.
let domaintosubmit = 'https://mycrypto.com'
new urlscan().submit(APIKEY, domaintosubmit).then( function( submitoutput ) {
    get_result(submitoutput.uuid)
} )


get_result = (uuid) => {
    var resultwait = setInterval(function() {
        new urlscan().result(uuid).then( function( resultoutput ) {
            if (resultoutput.statusCode != 404) {
                downloaddom(uuid, filename)
                clearInterval(resultwait)
            }
        } )
    }, 10 * 1000) // re-check every 10 second
};

downloaddom = (uuid, filename) => {
    new urlscan().downloaddom(uuid, filename).then( function( downloadstatus ) {
        console.log(JSON.stringify(downloadstatus, null, 2))
    } )
}
