const { read } = require('../utils/fs.js')

/**
 * Class to import firestore backup 
 * @class Imports
 */
class Imports{
    /**
     *Creates an instance of Imports.
     * @param {FirebaseApp} { app }
     * @memberof Imports
     */
    constructor({ app }){
        this.db = app.firestore()
        this.batch = null
    }

    /**
     * Method to create insert batches with documents
     * of a specific collection
     * @param {Object} data
     * @memberof Imports
     */
    insertData(data){
        const collections = Object.keys(data)
        collections.forEach(collection => {
            const documentsIds = Object.keys(data[collection])
            documentsIds.forEach( id => {
                this.create({ collection, id, data: data[collection][id] })
            })
        })
    }

    /**
     * Method to create an insert batch 
     * @param {Object} { collection, id, data }
     * @memberof Imports
     */
    create({ collection, id, data }){
        const ref = this.db.collection(collection).doc(id)
        this.batch.set(ref, data)
    }

    /**
     * Method to create an insert order
     * @param {Object} data
     * @returns Batch result
     * @memberof Imports
     */
    async imports(data){
        this.batch = this.db.batch()
        this.insertData(data)
        const result = await this.uploadData()
        return result
    }

    /**
     * Method to confirm an upload data to firestore
     * @returns Batch result
     * @memberof Imports
     */
    uploadData(){
        return this.batch.commit()
    }

    /**
     * Method to import data from any object to Firestore
     * @param {Object} data
     * @returns Batch result
     * @memberof Imports
     */
    importData(data){
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.imports(data)
                resolve(result)
            } catch (error) {
                reject(new Error(error))
            }
        })
    }

    /**
     * Method to import data from JSON file
     * @param {String} pathFile
     * @returns Batch result
     * @memberof Imports
     */
    importDataFromFile(pathFile){
        return new Promise(async (resolve, reject) => {
            try {
                const data = await read(pathFile)
                const result = await this.imports(data)
                resolve(result)
            } catch (error) {
                reject(new Error(error))
            }
        })
    }
}

module.exports = Imports