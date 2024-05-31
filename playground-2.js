const admin = require('firebase-admin');
const {SerializedDocumentArray, SerializedDocument, fromJSON, toJSON, processParsedJoinJSON} = require('@healthtree/firestore-join');
admin.initializeApp()
const db = admin.firestore();
const collection = db.collection('users')
const {chunk, isEqual, inRange, min, get, sortBy, groupBy} = require('lodash')
const {DateTime, Interval} = require('luxon');
const moment = require('moment-timezone');
const fs = require('fs');
const {Blob, Buffer} = require('node:buffer');
const JSONStream = require('JSONStream') //  2:48.009 (m:ss.mmm)
const StreamArray = require('stream-json/streamers/StreamArray'); //  3:13.355 (m:ss.mmm)
const { stringSimilarity } =  require("string-similarity-js");
const Asm = require('stream-json/Assembler');
const {parser} = require('stream-json');
const {chain}  = require('stream-chain');
const throttledQueue = require('throttled-queue');
const { backOff } = require('exponential-backoff');


async function logic(user) {
  const promises = [
    new SerializedDocumentArray.fromQuery(db.collection('apps/curehub/medicalResources/r4/Observation')
      .where('source.name', 'in', ['VETERANS_AFFAIRS', 'CERNER', 'OPEN_EPIC'])
      .where('user', '==', user.ref)
      .limit(1)),
    new SerializedDocumentArray.fromQuery(   db.collection('apps/curehub/medicalResources/r4/Observation')
      .where('migratedFromRailsHealthtree', '==', true)
      .where('user', '==', user.ref)
      .limit(1)),
  ]
  const [recordsFromFHIR,recordsFromOldHT] = await Promise.all(promises)
  if(recordsFromFHIR.length === 0 && recordsFromOldHT.length === 1 && oldHT.length < userNumber) {
    oldHT.push(user.ref.id)
  }
  if(recordsFromFHIR.length === 1 && recordsFromOldHT.length === 0  && fhir.length < userNumber) {
    fhir.push(user.ref.id)
  }
}

function transformDateToGroupIndex(startDate, thresholdDays, date) {
  const startL = DateTime.fromJSDate(startDate);
  const dateL = DateTime.fromJSDate(date);
  const diff = dateL.diff(startL).as('days');
  return Math.floor(diff/thresholdDays)
}
async function main() {
  const a = {a: 1}
  let b = {b:2}

  let toUse;
  toUse = a;
  toUse.A = true;
  console.log('a change from master', a)
  console.log('toUse', toUse)

  toUse = b;
  toUse.B = true;
  console.log('b', b)
  console.log('toUse', toUse)
}

main();
