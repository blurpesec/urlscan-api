const downloadimage = require('./utils/downloadimage')
const fs = require('fs')
const zlib = require('zlib')

const request = require('./utils/request')

class urlscan {
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Submit Module ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  submit(APIKEY, domain) {
    return new Promise((resolve, reject) => {
      let options = {
        hostname: "urlscan.io",
        port: 80,
        path: "/api/v1/scan/",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'API-Key': APIKEY,
        },
        data: {
          url: domain,
          public: 'on',
        },
      }
      request(options)
        .then(out => resolve(out))
        .catch(err => reject(err))
    })
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Result Module ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  result(UUID) {
    return new Promise((resolve, reject) => {
      let options = {
        method: 'GET',
        uri: 'https://urlscan.io/api/v1/result/' + UUID,
        headers: {
          'Content-Type': 'application/json',
        },
      }
      request(options)
        .then(out => resolve(out))
        .catch(err => reject(err))
    })
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Search Modules ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  searchfilename(filename) {
    return new Promise((resolve, reject) => {
      let options = {
        method: 'GET',
        uri: 'https://urlscan.io/api/v1/search/?q=filename:' + filename,
        headers: {
          'Content-Type': 'application/json',
        },
      }
      request(options)
        .then(out => resolve(out))
        .catch(err => reject(err))
    })
  }

  searchdomain(domain) {
    return new Promise((resolve, reject) => {
      let options = {
        method: 'GET',
        uri: 'https://urlscan.io/api/v1/search/?q=domain:' + domain,
        headers: {
          'Content-Type': 'application/json',
        },
      }
      request(options)
        .then(out => resolve(out))
        .catch(err => reject(err))
    })
  }

  searchip(ip) {
    return new Promise((resolve, reject) => {
      let options = {
        method: 'GET',
        uri: 'https://urlscan.io/api/v1/search/?q=ip:"' + ip + '"',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      request(options)
        .then(out => resolve(out))
        .catch(err => reject(err))
    })
  }

  searchasn(asn) {
    return new Promise((resolve, reject) => {
      let options = {
        method: 'GET',
        uri: 'https://urlscan.io/api/v1/search/?q=asn:"' + asn + '"',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      request(options)
        .then(out => resolve(out))
        .catch(err => reject(err))
    })
  }

  searchasnname(asnname) {
    return new Promise((resolve, reject) => {
      let options = {
        method: 'GET',
        uri: 'https://urlscan.io/api/v1/search/?q=asnname:"' + asnname + '"',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      request(options)
        .then(out => resolve(out))
        .catch(err => reject(err))
    })
  }

  searchfilehash(filehash) {
    return new Promise((resolve, reject) => {
      let options = {
        method: 'GET',
        uri: 'https://urlscan.io/api/v1/search/?q=hash:"' + filehash + '"',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      request(options)
        .then(out => resolve(out))
        .catch(err => reject(err))
    })
  }

  searchserver(server) {
    return new Promise((resolve, reject) => {
      let options = {
        method: 'GET',
        uri: 'https://urlscan.io/api/v1/search/?q=server:"' + server + '"',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      request(options)
        .then(out => resolve(out))
        .catch(err => reject(err))
    })
  }

  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Download Modules ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

  downloadscreenshot(uuid, savefilename) {
    return new Promise((resolve, reject) => {
      let options = {
        method: 'GET',
        uri: 'https://urlscan.io/screenshots/' + uuid + '.png',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      request(options)
        .then(out => {
          if (savefilename) {
            if (fs.existsSync(savefilename)) { reject('Location you are trying to save to already exists.') }
            else {
              let output = downloadimage( uuid, savefilename, options )
            }
          }
          else { resolve() }
        })
        .catch(err => reject(err))
      /*
      if( fs.existsSync(savefilename) ) {
        resolve({'statusCode': 409, 'message': 'Location you are trying to save to already exists.'})
      }
      else {
        let out = downloadscreenshot( uuid, savefilename, options )
        resolve(out)
      }*/
    })
  }
  downloaddom(uuid, savefilename) {
    return new Promise((resolve, reject) => {
      let options = {
        method: 'GET',
        uri: 'http://urlscan.io/dom/' + uuid + '/',
        encoding: null,
        headers: {
          'Content-Type': 'request',
        },
      }
      request(options)
        .then(out => {  
          if (savefilename) {
            if ( out.headers['content-encoding'] == 'gzip' ) {
              zlib.gunzip(out.body, (error, output) => {
                if ( error ) {
                  reject('Error in decoding gzip file.')
                }
                fs.writeFileSync(savefilename, output.toString(), (error) => {
                  if ( error ) {
                    reject('Error writing DOM to file.')
                  }
                  resolve()
                })
              })
            }
            else {
              fs.writeFileSync(savefilename, out, function(error){
                if ( error ) {
                  reject('Error writing DOM to file.')
                }
                resolve()
              })
            }
          }
          else { resolve(out) };
        })
        .catch(err => reject(err))
      /*
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

      }*/
    })
  }
}

module.exports = urlscan
