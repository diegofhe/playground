const throttledQueue = require('throttled-queue');


const throttle = throttledQueue(2, 1000); // at most 5 requests per second.
async function throttlePromise(fn) {
    return new Promise((resolve, reject) => {
        throttle(() => {
            fn().then(resolve, reject);
        })
    });
}

function write(msg) {
    return new Promise((resolve, reject) => {
        console.log(msg)
        resolve();
    })
}

async function mainExample() {
    const msgs = [
        1,
        2,
        3,
        4,
        5,
        6
    ];
    const promises = msgs.map(m => throttle(() => write(m)))
    await Promise.all(promises)
}
async function main() {
   const msgs = [
       1,
       2,

   ];
   const promises = msgs.map(m => throttlePromise(()=> write(m)))
   await Promise.all(promises)
}

main();
//mainExample();
