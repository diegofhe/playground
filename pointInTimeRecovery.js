const throttledQueue = require('throttled-queue');
const {SerializedDocumentArray, SerializedDocument, fromJSON, toJSON, processParsedJoinJSON} = require('@healthtree/firestore-join');
const admin = require('firebase-admin');
admin.initializeApp()
const db = admin.firestore();
const { Timestamp } = require('@google-cloud/firestore');
const fs = require('fs');
const {
  difference,
  intersection,
  sortBy
} = require('lodash')
const {DateTime} = require('luxon');
const {doc} = require('mocha/lib/reporters');
function getRoundedDate(minutes, d=new Date()) {

  let ms = 1000 * 60 * minutes; // convert minutes to ms
  let roundedDate = new Date(Math.round(d.getTime() / ms) * ms);

  return roundedDate
}

async function main(n) {
  const query =  db.collection('sponsors/')
  const date = DateTime.now().minus({minutes: 10}).toJSDate()
  const roundedDate = getRoundedDate(1, date)

  let readTimestamp = admin.firestore.Timestamp.fromDate(roundedDate)
  readTimestamp = admin.firestore.Timestamp.fromDate(
    DateTime.fromSeconds(readTimestamp.seconds).toJSDate()
  )
  console.log(date.toISOString())
  console.log(readTimestamp.toDate().toISOString())
  const querySnapshot = await db.runTransaction(
    (updateFunction) => updateFunction.get(query),
    {
      readOnly: true,
      readTime: readTimestamp
    });
  const docs = new SerializedDocumentArray(querySnapshot)
  for(const doc of docs) {
    console.log(doc.ref.path)
    await doc.ref.update({
      disease: doc.data.disease,
    })
  }
  console.log('done')
}
main().then(_ => console.log('done'));

