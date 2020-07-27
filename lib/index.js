const FirebaseAdmin = require('./services/init.js')
const Exports = require('./services/export.js')
const Imports = require('./services/import')

/**
 * Class to management firestore backup
 * @class FirestoreBackup
 */
class FirestoreBackup{
    /**
     *Creates an instance of Firestore Backup.
     * @param {JSON} credentials
     * @param {string} databaseURL
     * @memberof FirestoreBackup
     */
    constructor(credentials, databaseURL){
        this.app = new FirebaseAdmin(credentials, databaseURL)
        this.exportObj = new Exports(this.app)
        this.importObj = new Imports(this.app)
    }
    

    /**
     * Create a complete backup of firestore 
     * @returns Object
     * @memberof FirestoreBackup
     */
    exportAll(){
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.exportObj.exportAll()
                resolve(data)
            } catch (error) {
                reject(new Error(error))
            }
        })
    }

    /**
     * Create a custom backup of firestore.
     * Send an Array with the names of collections
     * that will be part of the backup
     * @param {Array<string>} collectionList
     * @returns Object
     * @memberof FirestoreBackup
     */
    exportCustom(collectionList){
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.exportObj.exportCustom(collectionList)
                resolve(data)
            } catch (error) {
                reject(new Error(error))
            }
        })
    }

    /**
     * Import backup to firestore from any object
     * that meets the import structure
     * @param {Object} data
     * @returns Batch result
     * @memberof FirestoreBackup
     */
    importData(data){
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.importObj.importData(data)
                resolve(result)
            } catch (error) {
                reject(new Error(error))
            }
        })
    }

    /**
     *  Import backup to firestore from a JSON file
     * @param {string} pathFile
     * @returns Batch result
     * @memberof FirestoreBackup
     */
    importDataFromFile(pathFile){
        return new Promise(async (resolve, reject) => {
            try {
                const result = await this.importObj.importDataFromFile(pathFile)
                resolve(result)
            } catch (error) {
                reject(new Error(error))
            }
        })
    }

    /**
     * Create a JSON file with a exported information from firestore
     * @param {Object} data
     * @param {Object} { path, name }
     * @returns Promise<void>
     * @memberof FirestoreBackup
     */
    saveFile(data, { path, name }){
        return this.exportObj.saveFile(data, { path, name })
    }
}

module.exports = FirestoreBackup