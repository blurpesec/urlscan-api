const urlscan = require('../urlscan.js')
const config = require('../config.js')

//const urlscan = new urlscanobj()

let ips = ['8.8.8.8', '255.255.255.0/16', 'blahblah.com']
let urls = ['mycrypto.com', 'https://mycrypto.com']
let filenames = ['blahblah.txt', 'T1X5ZPT.gif']
let asns = ['AS24940', 'BS920301234']
let asnnames = ['hetzner', 'frodo']
let filehashes = [
  'd699f303990ce9bd7d7c97e9bd3cad6a46ecf2532f475cf22ae58213237821b9',
  '00000000000ce9bd7d7c97e9bd3cad6a46ecf2532f475cf22ae58213237821b9',
]
let servers = ['nginx', 'bilbo-baggins']
const APIKEY = config.APIKEY
const domaintosubmit = 'https://mycrypto.com'
const domaintosearch = 'https://mycrypto.com'

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Submit Module Test ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

test_submit = (APIKEY, domaintosubmit) => {
  console.log('Testing `urlscan.submit( domain )`: Test 1')
  new urlscan()
    .submit(APIKEY, domaintosubmit)
    .then(submitoutput => {
      console.log('Test 1 Success.')
      test_result(submitoutput.uuid)
    })
    .catch(err => {
      console.log(err)
    })
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Result Module Test ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

test_result = uuid => {
  console.log('Testing `urlscan.result( uuid )`: Test 2')
  var resultwait = setInterval(function() {
    new urlscan()
      .result(uuid)
      .then(function(resultoutput) {
        if (resultoutput.statusCode != 404) {
          console.log('Test 2 Success.')
          clearInterval(resultwait)
          test_searchdomain('mycrypto.com', uuid)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }, 10 * 1000) // re-check every 10 second
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Search Modules Tests ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

test_searchdomain = domaintosearch => {
  console.log('Testing `urlscan.searchdomain( domain )`: Test 3')
  new urlscan()
    .searchdomain(domaintosearch)
    .then(function(searchoutput) {
      if (searchoutput && searchoutput.total != 0) {
        console.log(domaintosearch + ' - ' + searchoutput.total)
      } else {
        console.log(JSON.stringify(searchoutput, null, 4))
      }
    })
    .catch(err => {
      console.log(err)
    })
}

test_searchfilename = filename => {
  console.log('Testing `urlscan.searchfilename( filename )`: Test 4')
  new urlscan()
    .searchfilename(filename)
    .then(function(searchfilenameresult) {
      if (searchfilenameresult && searchfilenameresult.total != 0) {
        console.log(filename + ' - ' + searchfilenameresult.total)
      } else {
        console.log(JSON.stringify(searchfilenameresult, null, 4))
      }
    })
    .catch(err => {
      console.log(err)
    })
}

test_searchip = ip => {
  console.log('Testing `urlscan.searchip( ip )`: Test 5')
  new urlscan()
    .searchip(ip)
    .then(function(searchipresult) {
      if (searchipresult && searchipresult.total != 0) {
        console.log(JSON.stringify(ip) + ' - ' + searchipresult.total)
      } else {
        console.log(JSON.stringify(searchipresult, null, 4))
      }
    })
    .catch(err => {
      console.log(err)
    })
}

test_searchasn = asn => {
  console.log('Testing `urlscan.searchasn( asn )`: Test 6')
  new urlscan()
    .searchasn(asn)
    .then(function(searchasnresult) {
      if (searchasnresult && searchasnresult.total != 0) {
        console.log(JSON.stringify(asn) + ' - ' + searchasnresult.total)
      } else {
        console.log(JSON.stringify(searchasnresult, null, 4))
      }
    })
    .catch(err => {
      console.log(err)
    })
}

test_searchasnname = asnname => {
  console.log('Testing `urlscan.searchasnname( asnname )`: Test 7')
  new urlscan()
    .searchasnname(asnname)
    .then(function(searchasnnameresult) {
      if (searchasnnameresult && searchasnnameresult.total != 0) {
        console.log(JSON.stringify(asnname) + ' - ' + searchasnnameresult.total)
      } else {
        console.log(JSON.stringify(searchasnnameresult, null, 4))
      }
    })
    .catch(err => {
      console.log(err)
    })
}

test_searchfilehash = filehash => {
  console.log('Testing `urlscan.searchfilehash( filehash )`: Test 8')
  new urlscan()
    .searchfilehash(filehash)
    .then(function(searchfilehashresult) {
      if (searchfilehashresult && searchfilehashresult.total != 0) {
        console.log(
          JSON.stringify(filehash) + ' - ' + searchfilehashresult.total
        )
      } else {
        console.log(JSON.stringify(searchfilehashresult, null, 4))
      }
    })
    .catch(err => {
      console.log(err)
    })
}

test_searchserver = server => {
  console.log('Testing `urlscan.searchserver( server )`: Test 9')
  new urlscan()
    .searchserver(server)
    .then(function(searchserverresult) {
      if (searchserverresult && searchserverresult.total != 0) {
        console.log(JSON.stringify(server) + ' - ' + searchserverresult.total)
      } else {
        console.log(JSON.stringify(searchserverresult, null, 4))
      }
    })
    .catch(err => {
      console.log(err)
    })
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Download Modules Tests ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

test_downloadimage = (uuid, filename) => {
  console.log('Testing `urlscan.downloadimage( uuid, filename )`: Test 10')
  new urlscan()
    .downloadscreenshot(uuid, filename)
    .then(function(downloadstatus) {
      console.log(JSON.stringify(downloadstatus, null, 2))
    })
    .catch(err => {
      console.log(err)
    })
}

test_downloaddom = (uuid, filename) => {
  console.log('Testing `urlscan.downloaddom( uuid, filename )`: Test 11')
  new urlscan()
    .downloaddom(uuid, filename)
    .then(function(downloadstatus) {
      console.log(JSON.stringify(downloadstatus, null, 2))
    })
    .catch(err => {
      console.log(err)
    })
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Begin Tests ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
const test = async () => {
  await test_submit(APIKEY, domaintosubmit)/*
  Promise.all(
    servers.forEach(async server => {
      await test_searchserver(server)
    })
  )
  Promise.all(
    filehashes.forEach(async filehash => {
      await test_searchfilehash(filehash)
    })
  )
  Promise.all(
    asnnames.forEach(async asnname => {
      await test_searchasnname(asnname)
    })
  )
  Promise.all(
    ips.forEach(async ip => {
      await test_searchip(ip)
    })
  )
  Promise.all(
    urls.forEach(async url => {
      await test_searchdomain(url)
    })
  )
  Promise.all(
    filenames.forEach(async file => {
      await test_searchfilename(file)
    })
  )
  Promise.all(
    asns.forEach(async asn => {
      await test_searchasn(asn)
    })
  )*/
}

test()
