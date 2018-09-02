# urlscan-api
###### Created by: [blurpesec](https://twitter.com/blurpesec)

An API wrapper for [urlscan.io](https://urlscan.io)

On npm: https://www.npmjs.com/package/urlscan-api

---

### Usage
- [Submission and results](#submission-and-results)
    - [submit( APIKEY, url )](#to-submit-urls)
    - [result( uuid )](#to-search-for-results)
- [Searches](#searches)
    - [searchdomain( hostname )](#to-search-for-a-domain)
    - [searchfilename( filename )](#to-search-for-a-filename)
    - [searchip( ip )](#to-search-for-an-ip)
    - [searchasn( asn )](#to-search-for-an-asn)
    - [searchasnname( asnname )](#to-search-for-an-asnname)
    - [searchfilehash( filehash )](#to-search-for-a-filehash)
    - [searchserver( server )](#to-search-for-a-server)    
- [Downloads](#downloads)
    - [downloadscreenshot( uuid, savefilename )](#to-download-a-screenshot)
    - [downloaddom( uuid, savefilename )](#to-download-dom)

#### See the [Implementations Directory](https://github.com/hahnmichaelf/urlscan-api/wiki/Implementations) for further custom implementations [WIP]

### Submission and Results

#### To submit urls:
###### Note - There is a rate-limit on submitting urls. Please wait 2 seconds between consecutive submission requests
```
/* params:
*  APIKEY   - given from urlscan.io website
*  url      - url to scan
*/
const urlscan = require('urlscan-api')
new urlscan().submit( APIKEY, url ).then( function( submitoutput ) {
    // Returns a promise containing the JSON returned from the site after submission.
    // An example:
    console.log(JSON.stringify(submitoutput, null, 4))
    /*
        {
            "message": "Submission successful",
            "uuid": "aaecebf6-3085-49fd-9fd6-53ef658aaa96",
            "result": "https://urlscan.io/result/aaecebf6-3085-49fd-9fd6-53ef658aaa96/",
            "api": "https://urlscan.io/api/v1/result/aaecebf6-3085-49fd-9fd6-53ef658aaa96/",
            "visibility": "public",
            "options": {
                "useragent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36"
            },
            "url": "https://mycrypto.com"
        }
    */
    // An Example of hitting the rate limit:
    /*
    {
        'statusCode': 427,
        'message': 'Scan not completed yet.'
    }
    */
} )
```


#### To search for results:
```
/* params:
*  uuid     - This is returned when submitting to urlscan.io
*/

const urlscan = require('urlscan-api')
new urlscan().result( uuid ).then( function( resultoutput ) {
    console.log(JSON.stringify(resultoutput, null, 4))
    // Returns a promise containing the JSON return from the site
    // An example of a successful output: https://urlscan.io/result/aaecebf6-3085-49fd-9fd6-53ef658aaa96/
    // If the scan has not completed it returns a JSON file as follows:
    /*
        {
            'statusCode': 400,
            'message': 'Scan not completed yet.'
        }
    */
} )
```

-----

### Searches

#### To search for a domain:
```
/* params:
*  hostname  - This needs to have no http:// or https:// protocol in it. Valid format: `mycrypto.com`.
*/

const urlscan = require('urlscan-api')
new urlscan().searchdomain( hostname ).then( function( searchoutput ) {
    console.log(JSON.stringify(searchoutput, null, 4))
    // JSON return from the site containing a an array of results
    // An example of a successful output: https://urlscan.io/api/v1/search/?q=domain:mycrypto.com
    // If the queried domain was invalid, returns the following
    /*
        {
            "statusCode": 404,
            "message": "Failed to find what you were searching for.",
            "total": 0,
            "input": "mycrtyptoqkladsjadsac.salt"
        }
    */
} )
```

#### To search for a filename:
```
/* params:
*  filename - Filename to search for
*/

const urlscan = require('urlscan-api')
new urlscan().searchfilename( filename ).then( function( searchoutput ) {
    console.log(JSON.stringify(searchoutput, null, 4))
    // JSON return from the site containing a an array of results
    // An example of a successful output: https://urlscan.io/api/v1/search/?q=filename:T1X5ZPT.gif
    // If the queried filename was invalid, returns the following
    /*
        {
            "statusCode": 404,
            "message": "Failed to find what you were searching for.",
            "total": 0,
            "input": "blanktextfile.txt"
        }
    */
} )
```

#### To search for an ip:
```
/* params:
*  ip       - Can follow the following formats:
*               '2400:cb00:2048:1::681b:9cb9',
*               '255.255.255.255',
*               '255.255.255.0/16'
*/

const urlscan = require('urlscan-api')
new urlscan().searchip( ip ).then( function( searchoutput ) {
    console.log(JSON.stringify(searchoutput, null, 4))
    // JSON return from the site containing a an array of results
    // An example of a successful output: https://urlscan.io/api/v1/search/?q=ip:%222400:cb00:2048:1::681b:9cb9%22
    // If the queried ip was invalid, returns the following
    /*
        {
            "statusCode": 404,
            "message": "Failed to find what you were searching for.",
            "total": 0,
            "input": "299.29912.22414.122"
        }
    */
} )
```

#### To search for an asn:
```
/* params:
*  asn       - An example: 'AS24940'
*/

const urlscan = require('urlscan-api')
new urlscan().searchasn( asn ).then( function( searchoutput ) {
    console.log(JSON.stringify(searchoutput, null, 4))
    // JSON return from the site containing a an array of results
    // An example of a successful output: https://urlscan.io/api/v1/search/?q=asn:AS24940
    // If the queried asn was invalid, returns the following
    /*
        {
            "statusCode": 404,
            "message": "Failed to find what you were searching for.",
            "total": 0,
            "input": "BS920301234"
        }   
    */
} )
```

#### To search for an asnname:
```
/* params:
*  asnname       - An example: 'hetzner'
*/

const urlscan = require('urlscan-api')
new urlscan().searchasnname( asnname ).then( function( searchoutput ) {
    console.log(JSON.stringify(searchoutput, null, 4))
    // JSON return from the site containing a an array of results
    // An example of a successful output: https://urlscan.io/api/v1/search/?q=asnname:hetzner
    // If the queried asnname was invalid, returns the following
    /*
        {
            "statusCode": 404,
            "message": "Failed to find what you were searching for.",
            "total": 0,
            "input": "blahblahblah"
        }   
    */
} )
```

#### To search for a filehash:
```
/* params:
*  asn       - An example: 'hetzner'
*/

const urlscan = require('urlscan-api')
new urlscan().searchfilehash( filehash ).then( function( searchoutput ) {
    console.log(JSON.stringify(searchoutput, null, 4))
    // JSON return from the site containing a an array of results
    // An example of a successful output: https://urlscan.io/api/v1/search/?q=filehash:d699f303990ce9bd7d7c97e9bd3cad6a46ecf2532f475cf22ae58213237821b9
    // If the queried filehash was invalid, returns the following
    /*
        {
            "statusCode": 404,
            "message": "Failed to find what you were searching for.",
            "total": 0,
            "input": "blahblahblah"
        }   
    */
} )
```

#### To search for a server:
```
/* params:
*  server       - An example: 'nginx'
*/

const urlscan = require('urlscan-api')
new urlscan().searchserver( server ).then( function( searchoutput ) {
    console.log(JSON.stringify(searchoutput, null, 4))
    // JSON return from the site containing a an array of results
    // An example of a successful output: https://urlscan.io/api/v1/search/?q=server:nginx
    // If the queried server was invalid, returns the following
    /*
        {
            "statusCode": 404,
            "message": "Failed to find what you were searching for.",
            "total": 0,
            "input": "blahblahblah"
        }   
    */
} )
```

----

### Downloads:
#### To download a screenshot:
```
/* params:
*  uuid         - UUID given when a domain is submitted.
*  savefilename - Name of file to save the screenshot as.              
*/

const urlscan = require('urlscan-api')
new urlscan().downloadscreenshot( uuid, savefilename ).then( function( downloadstatus ) {
    console.log(JSON.stringify(downloadstatus, null, 4))
    // If the UUID was invalid, it will save the wrong screenshot file.
    // If the filename you specify already exists:
    /*
        {
            statusCode: 409,
            message: 'Location you are trying to save to already exists.'
        }
    */
    // If the download completes successfully:
    /*
        {
            statusCode: 200,
            message: 'Completed Successfully.'
        }
    */
} )
```

#### To download DOM:
```
/* params:
*  uuid         - UUID given when a domain is submitted.
*  savefilename - Name of file to save the DOM to.              
*/

const urlscan = require('urlscan-api')
new urlscan().downloaddom( uuid, savefilename ).then( function( downloadstatus ) {
    console.log(JSON.stringify(downloadstatus, null, 4))
    // If the UUID was invalid, it will save the wrong DOM into the specifiedfile.
    // If the filename you specify already exists:
    /*
        {
            statusCode: 409,
            message: 'Location you are trying to save to already exists.'
        }
    */
    // If the download failed due to issue decoding gzip:
    /*
        {
            error: error,
            message: 'Error in decoding gzip file.'
        }
    */
    // If the download fails due to issue writing to file:
    /*
        {
            error: error,
            message: 'Error in writing DOM to file.'
        }
    */
    // If the download completes successfully:
    /*
        {
            statusCode: 200,
            message: 'Completed Successfully.'
        }
    */
} )
```
