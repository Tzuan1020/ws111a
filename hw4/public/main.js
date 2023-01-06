async function sqlRun(){
    let command = document.getElementById('command').value
    let result = document.getElementById('resultJson')
    let r = await window.fetch(`/sqlcmd/${command}`)
    console.log(r)
    let obj = await r.json()
    result.innerText = JSON.stringify(obj, null, 2)
}