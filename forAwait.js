const admin = require('firebase-admin');
const {SerializedDocumentArray, SerializedDocument} = require('@healthtree/firestore-join');
admin.initializeApp()
const db = admin.firestore();

const util = require('util');
const exec = util.promisify(require('child_process').exec);
async function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(()=> {
            resolve();
        }, ms);
    })
}

async function main1 () {
    const arr = [1,2,3,4]
    for (const element of arr) {
        console.log(element, 'start')
        await sleep(2000);
        console.log(element, 'finished')
    }
    console.log('FNC Finished');
}
async function main2 () {
    const arr = [1,2,3,4]
    for (const element of arr) {
        console.log(element, 'start')
        sleep(2000)
            .then(_ =>console.log(element, 'real finished'));
        console.log(element, 'finished?')
    }
    console.log('FNC Finished');
}
main2();
