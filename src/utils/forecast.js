const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.weatherapi.com/v1/current.json?key=67c62633247b4a0fa1372410222001&q=' + encodeURIComponent(address)

    request({url, json: true }, (error, {body}={}) => {
        if(error){
            callback('Unable to connect to server', undefined)
        } else if(body.error){
            callback('Unable to find location. Try another search ', undefined)
        } else{
            callback(undefined, body) 
        }
    })
}

module.exports = geocode