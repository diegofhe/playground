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


async function main(n) {
  const query =  db.collection('apps/curehub/linesOfTherapy')
    .where('user', '==', db.doc('users/B1r2iLfz5US1I1zjOKXdPQSTvAY2'))
  const date = DateTime.now().minus({hours: 4}).toJSDate()
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

  fs.writeFileSync('./lines.json', toJSON(active))

  const file = require('./lines.json')
  const json = fromJSON(JSON.stringify(file), db)
  console.log('done')

  // await Promise.all(
  //   json.map(
  //     s => s.ref.set(s.data,{merge: true})
  //   )
  // )

}
main().then(_ => console.log('done'));

