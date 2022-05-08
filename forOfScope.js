const admin = require('firebase-admin');
const {SerializedDocumentArray, SerializedDocument} = require('@healthtree/firestore-join');
admin.initializeApp()
const db = admin.firestore();

const util = require('util');
const exec = util.promisify(require('child_process').exec);
async function is5(number) {
    return new Promise((resolve, reject) => {
        if(number === 5) resolve(true);
        reject(false);
    })
}
async function lsExample() {
    const n = [1,2,3,4,5,6,7,8, 5];
    const res = []
    for await (const num of n) {
        try {
            console.log(num)
            const isFive = await is5(num);
            if(isFive) res.push(num);
            return res
        } catch (e) {
            console.log('err controlado')
        }
    }
}
async function main () {
    const resp = await lsExample();
    console.log('fue', resp)
}

main();
