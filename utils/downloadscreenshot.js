const req = require('request')
const fs = require('fs')

downloadscreenshot = ( uuid, savefilename, options ) => {
    return new Promise(function(resolve, reject) {
        let result = req(options)
        result.pause()
        result.on('response', function( response ) {
            console.log(JSON.stringify(response, null, 2))
            if( response.statusCode === 200) {
                result.pipe(fs.createWriteStream(savefilename))
                result.resume()
                result.end()
                resolve({'statusCode': response.statusCode, 'message': 'Completed successfully'})
            }
            else {
                resolve({'statusCode': response.statusCode, 'message': 'Unable to find file for uuid: "' + uuid + '". Try a different uuid.'});
            }
        })
    })
}

module.exports = downloadscreenshot
