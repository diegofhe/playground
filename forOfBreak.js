async function lsExample() {
    const num = [1,2,3,4];
    const  letters = ['a', 'b', 'c', 'd'];
    numbers:
    for (const n of num) {
        console.log(`n ${n}`)
        letters:
        for(const l of letters) {
            if (n === 2) break letters
            console.log(`l ${l}`)
        }
    }
}
async function main () {
    const resp = await lsExample();
}

main();
