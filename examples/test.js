const urlscan = require('urlscan-api')
const config = require('../config.js')
const APIKEY = config.APIKEY
const domaintosubmit = 'https://mycrypto.com'
const domaintosearch = 'https://mycrypto.com'
//const urlscan = new urlscanobj()


test_submit = (APIKEY, domaintosubmit) => {
    console.log('Testing `urlscan.submit( domain )`: Test 1')
    new urlscan().submit(APIKEY, domaintosubmit).then( function( submitoutput ) {
        console.log('Test 1 Success.')
        test_result(submitoutput.uuid)
    } )
};

test_result = (uuid) => {
    console.log('Testing `urlscan.result( uuid )`: Test 2')
    var resultwait = setInterval(function() {
        new urlscan().result(uuid).then( function( resultoutput ) {
            if (resultoutput.statusCode != 404) {
                console.log('Test 2 Success.')
                clearInterval(resultwait)
                test_searchdomain('mycrypto.com', uuid)
            }
        } )
    }, 10 * 1000) // re-check every 10 second
};

test_searchdomain = (domaintosearch, uuid) => {
    console.log('Testing `urlscan.searchdomain( domain )`: Test 3')
    var searchwait = setInterval(function() {
        new urlscan().searchdomain(domaintosearch).then( function( searchoutput ) {
            if (searchoutput.statusCode != 404) {
                console.log('Test 3 Success.')
                clearInterval(searchwait)
                test_resultdom(uuid)
             }
        } )
    }, 2 * 1000) // re-check every 1 second
};

test_searchfilename = (filename) => {
    console.log('Testing `urlscan.searchfilename( filename )`: Test 4')
    var searchfilenamewait = setInterval(function() {
        new urlscan().searchfilename(filename).then( function( searchfilenameresult ) {
            if (searchfilenameresult.statusCode != 404) {
                console.log('Test 4 Success.')
                console.log(JSON.stringify(JSON.parse(searchfilenameresult), null, 2))
                clearInterval(searchfilenamewait)
             }
        } )
    }, 5 * 1000) // re-check every 1 second
};

test_searchip = (ip) => {
    console.log('Testing `urlscan.searchip( ip )`: Test 5')
    var searchipwait = setInterval(function() {
        new urlscan().searchip(ip).then( function( searchipresult ) {
            if (searchipresult.statusCode != 404) {
                console.log('Test 4 Success.')
                console.log(JSON.stringify(JSON.parse(searchipresult), null, 2))
                clearInterval(searchipwait)
             }
        } )
    }, 5 * 1000) // re-check every 1 second
};

//test_submit(APIKEY, domaintosubmit)
test_searchip('2400:cb00:2048:1::681b:9cb9')
