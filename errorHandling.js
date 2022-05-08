async function p1(){
    try {
        console.log('bb')
        throw 'a'
    } catch (e) {
        console.log('THERE')
        throw e
    }
}

async function p2(){
    try {
        return p1();
    } catch (e) {
        console.log('HERE')
        throw e
    }
}
async function main(){
    try {
        await p2();
    } catch (e) {
        console.log('TT')
        throw e
    }
}

main()
    .catch(e => console.log('aaaa'));
