async function promise(resp) {
    return new Promise((resolve, reject)=>{
        console.log('start ' + resp)
        setTimeout(()=>{
            console.log('resolve ' + resp)
            resolve(resp)
        }, 2000)
    })
}

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

async function main () {
    const notes = ['A', 'B', 'C', 'D', 'F', 'G'];
    const arr = [...Array(100).keys()].map(n => {
        const num = randomIntFromInterval(0, notes.length - 1)
        return notes[num]
    });
    console.log(arr)
}
main();
