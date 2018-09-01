# urlscan-api
###### Created by: [blurpesec](https://twitter.com/blurpesec)

An API wrapper for urlscan.io

---

### Usage

* [submit( APIKEY, url )](#To submit urls:)

* [result( uuid )](#To search for results:)

* [searchdomain( hostname )](#To search for a domain:)

* [searchfilename( filename )](#To search for a filename:)

* [searchip( ip )](#To search for an ip:)

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

#### To search for a domain:
```
/* params:
*  hostname  - This needs to have no http:// or https:// protocol in it. Valid format: `mycrypto.com`.
*/

const urlscan = require('urlscan-api')
new urlscan().searchdomain( hostname ).then( function( searchoutput ) {
    // JSON return from the site containing a an array of results
    // An example of a successful output: https://urlscan.io/api/v1/search/?q=domain:mycrypto.com
    // If the queried domain was invalid, returns the following
    /*
        {
            statusCode: 400,
            message: 'Unable to query the request "https://mycrypto.com". Domain searches should not contain https:// or http:// protocols.'
        }
    */
} )
```

#### To search for a filename:
```
/* params:
*  hostname  - This needs to have no http:// or https:// protocols in it.
*/

const urlscan = require('urlscan-api')
new urlscan().searchfilename( filename ).then( function( searchoutput ) {
    // JSON return from the site containing a an array of results
    // An example of a successful output: https://urlscan.io/api/v1/search/?q=filename:T1X5ZPT.gif
    // If the queried filename was invalid, returns the following
    /*
        {
            statusCode: 400,
            message: 'Unable to query the request "filename"'
        }
    */
} )
```

#### To search for anip:
```
/* params:
*  ip       - Can follow the following formats:
*               '2400:cb00:2048:1::681b:9cb9',
*               '255.255.255.255',
*               '255.255.255.0/16'
*/

const urlscan = require('urlscan-api')
new urlscan().searchip( ip ).then( function( searchoutput ) {
    // JSON return from the site containing a an array of results
    // An example of a successful output: https://urlscan.io/api/v1/search/?q=ip:%222400:cb00:2048:1::681b:9cb9%22
    // If the queried filename was invalid, returns the following
    /*
        {
            statusCode: 400,
            message: 'Unable to query the request "ip"'
        }
    */
} )
```
