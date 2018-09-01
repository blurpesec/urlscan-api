const req = require('request')
const downloadscreenshot = require('./utils/downloadscreenshot.js')
const fs = require('fs')
const zlib = require('zlib')

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

    downloadscreenshot( uuid, savefilename ) {
        return new Promise(function(resolve, reject) {
            let options = {
                uri: 'https://urlscan.io/screenshots/' + uuid + '.png',
                headers: {
                    'Content-Type': 'application/json'
                },
            }
            if( fs.existsSync(savefilename) ) {
                resolve({'statusCode': 409, 'message': 'Location you are trying to save to already exists.'})
            }
            else {
                let out = downloadscreenshot( uuid, savefilename, options )
                resolve(out)
            }
        });
    }
    downloaddom( uuid, savefilename ) {
        return new Promise(function(resolve, reject) {
            let options = {
                uri: 'http://urlscan.io/dom/' + uuid + '/',
                encoding: null,
                headers: {
                    'Content-Type': 'request'
                },
            }
            if( fs.existsSync(savefilename) ) {
                resolve({'statusCode': 409, 'message': 'Location you are trying to save to already exists.'})
            }
            else {
                req( options, function(error, response, body) {
                    if( response.headers['content-encoding'] == 'gzip' ) {
                        zlib.gunzip(body, function(error, output) {
                            if( error ) {
                                resolve({'error': error, 'message': 'Error in decoding gzip file.'})
                            }
                            fs.writeFileSync(savefilename, output.toString(), function(error){
                                if( error ) {
                                    resolve({'error': error, 'message': 'Error in writing DOM to file.'})
                                }
                                resolve({'statusCode': 200, 'message': 'Completed successfully'})
                            })

                        })
                    }
                    else {
                        fs.writeFileSync(savefilename, body, function(error){
                            if( error ) {
                                resolve({'error': error, 'message': 'Error in writing DOM to file.'})
                            }
                            resolve({'statusCode': 200, 'message': 'Completed successfully'})
                        })
                    }
                })

            }
        });
    }



}

module.exports = urlscan
