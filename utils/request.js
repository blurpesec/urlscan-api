const https = require('https')

const request = options => {
  return new Promise((resolve, reject) => {
    console.log('options: ' + JSON.stringify(options, null, 4));
    let req = https.request(options, res => {
      res.setEncoding('utf8')
      let data = ''

      res.on('data', chunk => {
        console.log('got data')
        data += chunk
      })
      res.on('end', () => {
        try {
          console.log('got data end')
          resolve(JSON.parse(data))
        } catch (e) {
          resolve(data)
        }
      })
    })

    req.on('error', e => {
      console.error(`Error: ${e.message}`)
      reject(e)
    })
  })
}

module.exports = request
