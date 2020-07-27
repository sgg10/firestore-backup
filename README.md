# Firestore Backup
Library to import and export firestore collections in any project.

## Installation
Install using [npm](https://www.npmjs.com/)

    npm install @sgg10/firestore-backup
    
## Get Credentials from Firebase
You need to generate a private key from your Project Setting > Service Accounts
and get the databaseURL to initializate.

## Usage
To import library and create a new object

    import firestoreBackup from '@sgg10/firestore-backup'
    import serviceAccount from 'serviceAccount.json'
    
    let fsb = new firestoreBackup(serviceAccount, 'your_database_url')
   
### Export Firestore data
To create a complete backup for  databse, use exportAll method
   

    fsb.exportAll()

This method will return a Promise with all data from database, if you want save data a local file, you can use a saveFile method.

    fsb.exportAll().then( result => fsb.saveFile(result, { name: 'All', path: 'optional_path' }))


To create a custom backup, use exportCustom method. This method recive an Array with name of collections do you want to add to backup.

    fsb.exportCustom(['exaple1', 'example2']).then( result => fsb.saveFile(result))

### Import Firestore data
To import data from any object to firestore, use importData method

    const obj = {
	    collection1: {
		    12SWQ55ED: {
			    name: 'example name',
			    phone: 123456789 
		    },
		    //... 
	    },
	    //...
    }
     
    fsb.importData(obj)

To import data from JSON file

    fsb.importDataFromFile(`${__dirname}/backup.json`).then(result => console.log(result))
