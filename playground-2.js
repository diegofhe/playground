const admin = require('firebase-admin');
const {SerializedDocumentArray, SerializedDocument, fromJSON, toJSON} = require('@healthtree/firestore-join');
admin.initializeApp()
const db = admin.firestore();
const collection = db.collection('users')
const {chunk} = require('lodash')

async function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    })
}


async function main() {
    const res = await new SerializedDocumentArray.fromQuery(
        db.collection('test')
            .where('letters', 'array-contains-any', [
                // 'a',
                // 'b',
                // 'c',
                // 'd',
                // 'e',
                // 'f',
                // 'g',
                // 'h',
                // 'i',
                // 'j',
                'k',
            ])
        , {})
    console.log(res.length)
}

main()
