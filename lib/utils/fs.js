const fs = require('fs')

/**
 * Function to save the information obtained
 * from the firebase project database
 * @param {Object} data
 * @param {Object} [{ path, name }={}]
 * @returns Promise<void>
 */
function save(data, { path, name } = {} ) {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${path || './'}${name || 'data-export'}.json`,
            JSON.stringify(data),
            err => err ? reject(new Error(err)) : resolve()
        )
    })
}

/**
 * Funtion to read the information from
 * a JSON file
 * @param {String} path
 * @returns Promise<Object>
 */
function read(path) {
    return new Promise((resolve, reject) => {
        try {
            fs.readFile(path, 'utf8', function(err, data){
                if(err){ reject(err.message) }
                const fileData = JSON.parse(data)
                resolve(fileData)
            })
        } catch (error) {
            reject(new Error(error.message))
        }
    })
}

module.exports = { save, read }