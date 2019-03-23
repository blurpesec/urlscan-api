const req = require('request')
const fs = require('fs')

downloadimage = (uuid, savefilename, options) => {
  return new Promise((resolve, reject) => {
    let result = req(options)
    result.pause()
    result.on('response', (response) => {
      if (response.statusCode === 200) {
        try {
          result.pipe(fs.createWriteStream(savefilename))
          result.resume()
          result.end()
          resolve({
            statusCode: response.statusCode,
            message: 'Completed successfully',
          })
        } catch (e) {
          reject(e)
        }
      } else {
        reject('Unable to find file for uuid: ' + uuid + ' .')
      }
    })
  })
}

module.exports = downloadimage
