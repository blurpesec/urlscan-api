const req = require('request')
const downloadscreenshot = require('./utils/downloadscreenshot.js')
const fs = require('fs')
const zlib = require('zlib')

let APIKEY = 0

class urlscan {

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Submit Module ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

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

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Result Module ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

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

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Search Modules ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

    searchfilename( filename ) {
        return new Promise(function(resolve, reject) {
            let options = {
                uri: 'https://urlscan.io/api/v1/search/?q=filename:' + filename,
                headers: {
                    'Content-Type': 'application/json',
                }
            }
            let result = req(options, function(e, response, body) {
                if( response.statusCode == 200 ) {
              		if( JSON.parse(body).total != 0 ) {
                        resolve(JSON.parse(body))
              		}
                    resolve({'statusCode': 404, 'message': 'Failed to find what you were searching for.', 'total': 0, 'input': filename})
              	}
                else {
              	     resolve({'statusCode': 404, 'message': 'Failed to find what you were searching for.', 'total': 0, 'input': filename})
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
                  if( response.statusCode == 200 ) {
                      if( JSON.parse(body).total != 0 ) {
                          resolve(JSON.parse(body))
                      }
                      resolve({'statusCode': 404, 'message': 'Failed to find what you were searching for.', 'total': 0, 'input': domain})
                  }
                  else {
                	  resolve({'statusCode': 404, 'message': 'Failed to find what you were searching for.', 'total': 0, 'input': domain})
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
                if( response.statusCode == 200 ) {
                    if( JSON.parse(body).total != 0 ) {
                        resolve(JSON.parse(body))
                    }
                    resolve({'statusCode': 404, 'message': 'Failed to find what you were searching for.', 'total': 0, 'input': ip})
                }
                else {
                     resolve({'statusCode': 404, 'message': 'Failed to find what you were searching for.', 'total': 0, 'input': ip})
                }
              });
        });
    }

    searchasn( asn ) {
          return new Promise(function(resolve, reject) {
              let options = {
                  uri: 'https://urlscan.io/api/v1/search/?q=asn:"' + asn + '"',
                  headers: {
                      'Content-Type': 'application/json',
                  },
              }
              let result = req(options, function(e, response, body) {
                if( response.statusCode == 200 ) {
              		if( JSON.parse(body).total != 0 ) {
                        resolve(JSON.parse(body))
              		}
                    resolve({'statusCode': 404, 'message': 'Failed to find what you were searching for.', 'total': 0, 'input': asn})
              	}
                else {
              	     resolve({'statusCode': 404, 'message': 'Failed to find what you were searching for.', 'total': 0, 'input': asn})
              	}
              });
        });
    }

    searchasnname( asnname ) {
          return new Promise(function(resolve, reject) {
              let options = {
                  uri: 'https://urlscan.io/api/v1/search/?q=asnname:"' + asnname + '"',
                  headers: {
                      'Content-Type': 'application/json',
                  },
              }
              let result = req(options, function(e, response, body) {
                if( response.statusCode == 200 ) {
                    if( JSON.parse(body).total != 0 ) {
                        resolve(JSON.parse(body))
                    }
                    resolve({'statusCode': 404, 'message': 'Failed to find what you were searching for.', 'total': 0, 'input': asnname})
                }
                else {
                     resolve({'statusCode': 404, 'message': 'Failed to find what you were searching for.', 'total': 0, 'input': asnname})
                }
              });
        });
    }

    searchfilehash( filehash ) {
          return new Promise(function(resolve, reject) {
              let options = {
                  uri: 'https://urlscan.io/api/v1/search/?q=hash:"' + filehash + '"',
                  headers: {
                      'Content-Type': 'application/json',
                  },
              }
              let result = req(options, function(e, response, body) {
                if( response.statusCode == 200 ) {
                    if( JSON.parse(body).total != 0 ) {
                        resolve(JSON.parse(body))
                    }
                    resolve({'statusCode': 404, 'message': 'Failed to find what you were searching for.', 'total': 0, 'input': filehash})
                }
                else {
                     resolve({'statusCode': 404, 'message': 'Failed to find what you were searching for.', 'total': 0, 'input': filehash})
                }
              });
        });
    }

    searchserver( server ) {
          return new Promise(function(resolve, reject) {
              let options = {
                  uri: 'https://urlscan.io/api/v1/search/?q=server:"' + server + '"',
                  headers: {
                      'Content-Type': 'application/json',
                  },
              }
              let result = req(options, function(e, response, body) {
                if( response.statusCode == 200 ) {
                    if( JSON.parse(body).total != 0 ) {
                        resolve(JSON.parse(body))
                    }
                    resolve({'statusCode': 404, 'message': 'Failed to find what you were searching for.', 'total': 0, 'input': server})
                }
                else {
                     resolve({'statusCode': 404, 'message': 'Failed to find what you were searching for.', 'total': 0, 'input': server})
                }
              });
        });
    }

    /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Download Modules ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

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
