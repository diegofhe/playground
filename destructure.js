async function promise(resp) {
    return new Promise((resolve, reject)=>{
        console.log('start ' + resp)
        setTimeout(()=>{
            console.log('resolve ' + resp)
            resolve(resp)
        }, 2000)
    })
}

async function main () {

    // const resp = (await Promise.all([
    //     {data: 'data1'},
    //     (async () => ({property1: await promise(1)}))(),
    //     (async () => ({property2: await promise(2)}))()
    // ])).reduce((p,c)=> ({...p,...c}), {})

    const resp = (await Promise.all([
        {data: 'data1'},
        promise(1).then(r => ({property1: r})),
        promise(2).then(r => ({property2: r})),
        promise(3).then(r => ({property3: r})),
    ])).reduce((p,c)=> ({...p,...c}), {})
    console.log('resp', resp)
}

main();
