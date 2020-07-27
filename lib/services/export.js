const { save } = require('../utils/fs.js')

/**
 * Class to export firestore backup 
 * @class Exports
 */
class Exports{
    /**
     *Creates an instance of Exports.
     * @param {FirebaseApp} { app }
     * @memberof Exports
     */
    constructor({ app }){
        this.db = app.firestore()
    }

    /**
     * Method to get a list of firestore collections
     * @returns List of firestore collections
     * @memberof Exports
     */
    getCollectionList(){
        return new Promise(async (resolve, reject) => {
            try {
                const query = await this.db.listCollections()
                const collections = query.map( obj => obj['_queryOptions']['collectionId'])
                resolve(collections)
            } catch (error) {
                reject(new Error(error))
            }
        })
    }

    /**
     * Method to get a documents of collection as a promise
     * @param {string} collection
     * @returns Promise<List<Object>>
     * @memberof Exports
     */
    getDocuments(collection){
        return new Promise(async (resolve, reject) => {
            try {
                const documents = await this.db.collection(collection).get()
                resolve(documents.docs)
            } catch (error) {
                reject(new Error(error))
            } 
        })
    }

    /**
     * Method to get a documents of collection in JSON format
     * @param {Array<string>} collections
     * @returns Promise<Object>
     * @memberof Exports
     */
    exportData(collections){
        return new Promise(async (resolve, reject) => {
            try {
                let data = {}
                const promises = []
                collections.forEach(collection => {
                    data[collection] = {}
                    promises.push(this.getDocuments(collection))
                })
                const dataCollections = await Promise.all(promises)
                for (let i = 0; i < collections.length; i++) {
                    dataCollections[i].forEach( doc => {
                        data[collections[i]][doc.id] = doc.data()
                    })
                }
                resolve(data)
            } catch (error) {
                reject(error)
            }
        })
    }

    /**
     * Method to export complete db backup in JSON format
     * @returns Object
     * @memberof Exports
     */
    async exportAll(){
        const collections = await this.getCollectionList()
        const data = await this.exportData(collections)
        return data
    }

    /**
     * Method to export custom db backup in JSON format.
     * Each element in colletionList is a name of collection
     * to export.
     * @param {Array<string>} collectionList
     * @returns Object
     * @memberof Exports
     */
    async exportCustom(collectionList){
        const data = await this.exportData(collectionList)
        return data
    }

    /**
     * Method to save exported information in a JSON file
     * @param {Object} data
     * @param {Object} { path, name }
     * @returns Promise<void>
     * @memberof Exports
     */
    saveFile(data, { path, name }){
        return save(data, { path, name })
    }
}

module.exports = Exports