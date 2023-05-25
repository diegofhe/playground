const admin = require('firebase-admin');
const {SerializedDocumentArray, SerializedDocument, fromJSON, toJSON} = require('@healthtree/firestore-join');
admin.initializeApp()
const db = admin.firestore();
const collection = db.collection('users')
const {chunk, isEqual, inRange, min, get, sortBy} = require('lodash')
const {DateTime, Interval} = require('luxon');
const moment = require('moment-timezone');
const fs = require('fs');
const {Blob, Buffer} = require('node:buffer');
const JSONStream = require('JSONStream')
const split = require('split')

function createBigJson(array) {
  // const arr = [...Array(5).keys()]
  // const arr = [...Array(2).keys()];

  const writeStream = fs.createWriteStream('toDelete.json');
  writeStream.write('[')
  array.forEach((e, index) => {
    let json =  JSON.stringify(e)

    if(array.length - 1 !== index) {
      json+=','
    }
    writeStream.write(json)
  })
  writeStream.write(']')
  writeStream.end();
}


function getStartAndEndIndex(textJSONPart, startAtIndex, queue = []){
  let startIndex;
  let endIndex

  for (let i = startAtIndex; i < textJSONPart.length; i++) {
    const s = textJSONPart[i]
    const lastFound = queue[queue.length -1]

    if(s === '"'){
      const before = textJSONPart[i -1];
      if(before === '\\'){
        // escaped double quotes
      } else {
        if(lastFound === '"') {
          // End of the key or value json definition
          queue.pop();
        } else {
          // start of the key or value json definition
          queue.push(s);
        }
      }
      continue;
    }
    const isKeyOrValue = lastFound === '"';
    if(isKeyOrValue) {
      continue;
    };

    const openSymbols = {
      '{': '}',
    };
    const closeSymbols = {
      '}': '{',
    };
    const isOpenSymbol = openSymbols[s];
    const isCloseSymbol = closeSymbols[s];

    if(isOpenSymbol) { // s is {
      startIndex = i
      queue.push(s);
    } else if(isCloseSymbol) { // s is }
      endIndex = i
      queue.pop();
      return {startIndex, endIndex, queue, allAnalyzed: false}
    }
  }
  return {startIndex, queue, allAnalyzed: true}
}

function readBigJson() {
  return new Promise((resolve, reject) => {
    const array = []
    let queue = [];
    const inputStream = fs.createReadStream(__dirname + '/toDelete.json')
    let buf = '';
    let startIndex, endIndex;
    inputStream.on('data', (chunk) => {
      let indexesInfo;
      while(!indexesInfo?.allAnalyzed) {
        let startAt = 0;
        if(!indexesInfo) { // first iteration on new chunk
          startAt = buf.length;
          buf += chunk.toString(); // when data is read, stash it in a string buffer
        }
        indexesInfo = getStartAndEndIndex(buf, startAt, queue);
        queue = indexesInfo.queue;
        if(Number.isFinite(indexesInfo.startIndex)) {
          startIndex = indexesInfo.startIndex;
        }
        if(Number.isFinite(indexesInfo.endIndex)) {
          endIndex = indexesInfo.endIndex;
        }
        if(Number.isFinite(startIndex) && Number.isFinite(endIndex))  {
          const substring = buf.substring(startIndex, endIndex + 1);
          const json = fromJSON(substring, db)
          array.push(json)
          buf =  buf.substring(endIndex + 1);
          startIndex = undefined;
          endIndex = undefined
        }
      }
    })
    inputStream.on('close' , ()=> {
      inputStream.close();
      resolve(array)
    })
    inputStream.on('error' , (e)=> {
      inputStream.close();
      reject(e);
    });
  })
}



/**
 *
 * @returns {Promise<void>}
 */

async function main() {
  try {
    /*
    string Done

    number
    obj
    array
     */
    createBigJson([{t: 125.54}, {a:'hello'}])
    const array = await readBigJson()
    console.log(array)
  } catch (e) {
    console.error(e)
  }

}

main();

