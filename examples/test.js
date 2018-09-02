const urlscan = require('../urlscan.js')
const config = require('../config.js')
const APIKEY = config.APIKEY
const domaintosubmit = 'https://mycrypto.com'
const domaintosearch = 'https://mycrypto.com'

//const urlscan = new urlscanobj()

let ips = ['8.8.8.8', '255.255.255.0/16', 'blahblah.com']
let urls = ['mycrypto.com', 'https://mycrypto.com']
let filenames = ['blahblah.txt', 'T1X5ZPT.gif']
let asns = ['AS24940', 'BS920301234']
let asnnames = ['hetzner', 'frodo']
let filehashes = ['d699f303990ce9bd7d7c97e9bd3cad6a46ecf2532f475cf22ae58213237821b9',
                '00000000000ce9bd7d7c97e9bd3cad6a46ecf2532f475cf22ae58213237821b9']
let servers = ['nginx', 'bilbo-baggins']

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Submit Module Test ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

test_submit = (APIKEY, domaintosubmit) => {
    console.log('Testing `urlscan.submit( domain )`: Test 1')
    new urlscan().submit(APIKEY, domaintosubmit).then( function( submitoutput ) {
        console.log('Test 1 Success.')
        test_result(submitoutput.uuid)
    } )
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Result Module Test ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

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

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Search Modules Tests ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

test_searchdomain = (domaintosearch) => {
    new urlscan().searchdomain(domaintosearch).then( function( searchoutput ) {
        if ( searchoutput && searchoutput.total != 0 ) {
            console.log(domaintosearch + ' - ' + searchoutput.total)
        }
        else {
            console.log(JSON.stringify(searchoutput, null, 4 ))
        }
    } )
};

test_searchfilename = (filename) => {
    new urlscan().searchfilename(filename).then( function( searchfilenameresult ) {
        if ( searchfilenameresult && searchfilenameresult.total != 0 ) {
            console.log(filename + ' - ' + searchfilenameresult.total)
        }
        else {
            console.log(JSON.stringify(searchfilenameresult, null, 4 ))
        }
    } )
};

test_searchip = (ip) => {
    new urlscan().searchip(ip).then( function( searchipresult ) {
        if ( searchipresult && searchipresult.total != 0 ) {
            console.log(JSON.stringify(ip) + ' - ' + searchipresult.total)
        }
        else {
            console.log(JSON.stringify(searchipresult, null, 4 ))
        }
    } )
};

test_searchasn = (asn) => {
    new urlscan().searchasn(asn).then( function( searchasnresult ) {
        if ( searchasnresult && searchasnresult.total != 0 ) {
            console.log(JSON.stringify(asn) + ' - ' + searchasnresult.total)
        }
        else {
            console.log(JSON.stringify(searchasnresult, null, 4 ))
        }
    } )
};

test_searchasnname = (asnname) => {
    new urlscan().searchasnname(asnname).then( function( searchasnnameresult ) {
        if ( searchasnnameresult && searchasnnameresult.total != 0 ) {
            console.log(JSON.stringify(asnname) + ' - ' + searchasnnameresult.total)
        }
        else {
            console.log(JSON.stringify(searchasnnameresult, null, 4 ))
        }
    } )
};

test_searchfilehash = (filehash) => {
    new urlscan().searchfilehash(filehash).then( function( searchfilehashresult ) {
        if ( searchfilehashresult && searchfilehashresult.total != 0 ) {
            console.log(JSON.stringify(filehash) + ' - ' + searchfilehashresult.total)
        }
        else {
            console.log(JSON.stringify(searchfilehashresult, null, 4 ))
        }
    } )
};

test_searchserver = (server) => {
    new urlscan().searchserver(server).then( function( searchserverresult ) {
        if ( searchserverresult && searchserverresult.total != 0 ) {
            console.log(JSON.stringify(server) + ' - ' + searchserverresult.total)
        }
        else {
            console.log(JSON.stringify(searchserverresult, null, 4 ))
        }
    } )
};

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Download Modules Tests ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

test_downloadscreenshot = (uuid, filename) => {
    new urlscan().downloadscreenshot(uuid, filename).then( function( downloadstatus ) {
        console.log(JSON.stringify(downloadstatus, null, 2))
    } )
}

test_downloaddom = (uuid, filename) => {
    new urlscan().downloaddom(uuid, filename).then( function( downloadstatus ) {
        console.log(JSON.stringify(downloadstatus, null, 2))
    } )
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Begin Tests ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

/*
servers.forEach(function(server) {
    test_searchserver(server)
})

filehashes.forEach(function(filehash) {
    test_searchfilehash(filehash)
})

asnnames.forEach(function(asnname) {
    test_searchasnname(asnname)
})

ips.forEach(function(ip) {
    test_searchip(ip)
})

urls.forEach(function(url) {
    test_searchdomain(url)
})

filenames.forEach(function(file) {
    test_searchfilename(file)
})

asns.forEach(function(asn) {
    test_searchasn(asn)
})
*/
