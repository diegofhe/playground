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


async function usingInclude(serializedDocuments) {
    console.time('usingInclude')
    if(serializedDocuments.length === 0) return []
    const col = serializedDocuments[0].ref.parent
    const promises = chunk(serializedDocuments, 10).map(chunkedSerializedDocuments => {
        return new SerializedDocumentArray.fromQuery(
            col
                .where(admin.firestore.FieldPath.documentId(), 'in', chunkedSerializedDocuments.map(s => s.ref.id)), {}
        )
    })
    const total = (await Promise.all(promises)).reduce((p, c) => [...p, ...c], []);
    console.timeEnd('usingInclude')
    return total;
}

async function individualRefs(serializedDocuments) {
    console.time('individualRefs')
    const promises = serializedDocuments.map(serializedDocument => {
        return new SerializedDocument.fromDocumentReference(serializedDocument.ref, {})
    })
    const total = await Promise.all(promises);
    console.timeEnd('individualRefs')
    return total;
}

async function main() {
    const users = await new SerializedDocumentArray.fromQuery(
        collection.limit(150), {}
    );
    await sleep(5000) //invalidate cache
    const total1 = await usingInclude(users)
    await sleep(500) //invalidate cache

    const total2 = await individualRefs(users)

    const areEqual = JSON.stringify(total1.map(e => e.ref.id)) === JSON.stringify(total2.map(e => e.ref.id))
    console.log('areEqual', areEqual)
    console.log('done')
}

main()
