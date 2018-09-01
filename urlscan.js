const req = require('request')

let APIKEY = 0

class urlscan {

    submit( APIKEY, domain ) {
        return new Promise(function(resolve, reject) {
            let options = {
                uri: 'https://urlscan.io/api/v1/scan/',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'API-Key': APIKEY,
                },
                json: {
                    'url': domain,
                    'public': 'on'
                }
            }

            let result = req.post(options, function(e, response, body) {
                if(e || !([200, 301, 302, 400, 427].includes(response.statusCode))) {
                    resolve({'statusCode': response.statusCode, 'message': 'Hit the rate limit of 1 submission every 2 seconds.'})
                }
                else if(!e && response.statusCode == 200){
                    resolve(body)
                }
            });
      });
    }

    result( UUID ) {
        return new Promise(function(resolve, reject) {
            let options = {
                uri: 'https://urlscan.io/api/v1/result/' + UUID,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            let result = req(options, function(e, response, body) {
                if(e || !([200, 301, 302, 400].includes(response.statusCode))) {
                    if (response.statusCode === 400) {
                        resolve(JSON.parse(body))
                    }
                    resolve({'statusCode': response.statusCode, 'message': 'Scan not completed yet.'})
                }
                else if(!e && response.statusCode == 200){
                    resolve(JSON.parse(body))
                }
                else {
                    resolve({'statusCode': response.statusCode, 'message': 'Scan not completed yet.'})
                }
            });
      });
    }

    searchfilename( filename ) {
        return new Promise(function(resolve, reject) {
            let options = {
                uri: 'https://urlscan.io/api/v1/search/?q=filename:' + filename,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            let result = req(options, function(e, response, body) {
                if(e || !([200, 301, 302, 400].includes(response.statusCode))) {
                    if (response.statusCode === 400) {
                        resolve(JSON.parse(body))
                    }
                    resolve({'statusCode': response.statusCode, 'message': 'Unable to query for "' + filename + '".'})
                }
                else if(!e && response.statusCode == 200){
                    resolve(JSON.parse(body))
                }
                else {
                    resolve({'statusCode': response.statusCode, 'message': 'Unable to query for "' + filename + '".'})
                }
            });
        });
    }

    searchdomain( domain ) {
          return new Promise(function(resolve, reject) {
              let options = {
                  uri: 'https://urlscan.io/api/v1/search/?q=domain:' + domain,
                  headers: {
                      'Content-Type': 'application/json',
                  },
              }
              let result = req(options, function(e, response, body) {
                  if(e || !([200, 301, 302, 400].includes(response.statusCode))) {
                      if (response.statusCode === 400) {
                          resolve(JSON.parse(body))
                      }
                      resolve({'statusCode': response.statusCode, 'message': 'Unable to query for "'
                      + domain + '". Domain searches should not contain https:// or http:// protocols'})
                  }
                  else if(!e && response.statusCode == 200){
                      resolve(JSON.parse(body))
                  }
                  else {
                      resolve({'statusCode': response.statusCode, 'message': 'Unable to query for "'
                      + domain + '". Domain searches should not contain https:// or http:// protocols'})
                  }
              });
        });
    }

    searchip( ip ) {
          return new Promise(function(resolve, reject) {
              let options = {
                  uri: 'https://urlscan.io/api/v1/search/?q=ip:"' + ip + '"',
                  headers: {
                      'Content-Type': 'application/json',
                  },
              }
              let result = req(options, function(e, response, body) {
                  if(e || !([200, 301, 302, 400].includes(response.statusCode))) {
                      if (response.statusCode === 400) {
                          resolve(JSON.parse(body))
                      }
                      resolve({'statusCode': response.statusCode, 'message': 'Unable to query for "' + ip + '".'})
                  }
                  else if(!e && response.statusCode == 200){
                      resolve(JSON.parse(body))
                  }
                  else {
                      resolve({'statusCode': response.statusCode, 'message': 'Unable to query for "' + ip + '".'})
                  }
              });
        });
    }

}

module.exports = urlscan
