const throttledQueue = require('throttled-queue');
const {SerializedDocumentArray, SerializedDocument, fromJSON, toJSON, processParsedJoinJSON} = require('@healthtree/firestore-join');
const admin = require('firebase-admin');
admin.initializeApp()
const db = admin.firestore();
const { Timestamp } = require('@google-cloud/firestore');
const fs = require('fs');
const {
  get,
  difference,
  intersection,
  sortBy,
  chunk
} = require('lodash')
const {DateTime} = require('luxon');
const {doc} = require('mocha/lib/reporters');
const {slug} = require('mocha/lib/utils');
function a({prop1,prop2,prop5}) {
  console.log(prop1)
  console.log(prop2)
  console.log(prop5)
}

function atLeastOneIncluded(checkForInclusion, arrayToCheck) {
  for(const checkForInclusionValue of checkForInclusion) {
    for(const arrayToCheckValue of arrayToCheck) {
      if(checkForInclusionValue === arrayToCheckValue){
        return true
      }
    }
  }
}
async function main(n) {
  const a = await new SerializedDocumentArray.fromQuery(
    db.collection('apps/curehub/medicalResources/normalizations/Observation')
    .where('observationMappings', 'array-contains', db.doc('apps/curehub/observationMappings/72253-8'))
  )
   console.log(a.map(b => b.ref.path))
}

main().then(_ => console.log('done'));

