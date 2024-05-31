const admin = require('firebase-admin');
const {SerializedDocumentArray, SerializedDocument, fromJSON, toJSON} = require('@healthtree/firestore-join');
admin.initializeApp()
const db = admin.firestore();
const observationsCol = db.collection('apps/curehub/medicalResources/normalizations/Observation')
const mappingsCol = db.collection('apps/curehub/observationMappings')
const {chunk, difference} = require('lodash')

async function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms);
    })
}


async function usingArrayContainsAny(serializedDocuments) {
    console.time('usingArrayContainsAny')
    if(serializedDocuments.length === 0) return []
    const promises = chunk(serializedDocuments, 10).map(chunkedSerializedDocuments => {
        return new SerializedDocumentArray.fromQuery(
            .where('observationMappings', 'array-contains-any', chunkedSerializedDocuments.map(s => s.ref))
            .where('user', '==', db.doc('users/BvcDykQWyUTvLzItyqTJRZPakWM2'))
          , {}
        )
    })
    const total = (await Promise.all(promises)).reduce((p, c) => [...p, ...c], []);
    console.timeEnd('usingArrayContainsAny')
    return total;
}

async function usingArrayContains(serializedDocuments) {
    console.time('usingArrayContains')
    const promises = serializedDocuments.map(serializedDocument => {
        return new SerializedDocumentArray.fromQuery(
          observationsCol.where('observationMappings', 'array-contains', serializedDocument.ref)
            .where('user', '==', db.doc('users/BvcDykQWyUTvLzItyqTJRZPakWM2'))
          , {}
        )
    })
    const total = await Promise.all(promises);
    console.timeEnd('usingArrayContains')
    return total;
}

async function main() {
    const observationMappings = await new SerializedDocumentArray.fromQuery(
      mappingsCol
        .where('diseases', 'array-contains', db.doc('/diseases/GxAhXAnh3drV4xY5Vf3A')), {}
    );
    await sleep(5000) //invalidate cache
    const total1 = await usingArrayContainsAny(observationMappings)
    await sleep(5000) //invalidate cache
    const total2 = await usingArrayContains(observationMappings)

    console.log('areEqual', areEqual)
    console.log('done')
}

main()
