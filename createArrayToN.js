
async function main () {
    const arr = [...Array(2).keys()]
    for(const [indexStr, value] of Object.entries(arr)) {
        const index = parseInt(indexStr, 10)
        console.log(index);
        console.log(typeof index);
    }
}

main();
