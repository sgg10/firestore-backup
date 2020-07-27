const admin = require('firebase-admin')
/**
 * Class that generates the connection to the Firebase Project.
 * This class needs the project credentials and the database url
 * @class FirebaseAdmin
 */
class FirebaseAdmin {
    /**
     *Creates an instance of FirebaseAdmin.
     * @param {JSON} credential
     * @param {string} databaseURL
     * @memberof FirebaseAdmin
     */
    constructor(credential, databaseURL) {
        this.app = admin.initializeApp({
            credential: admin.credential.cert(credential),
            databaseURL
        })
    }
}


module.exports = FirebaseAdmin 