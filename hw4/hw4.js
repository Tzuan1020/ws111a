import { Application, Router, send } from "https://deno.land/x/oak/mod.ts";
import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("data.db");
const router = new Router();
const app = new Application();

db.query("CREATE TABLE IF NOT EXISTS data (name TEXT, date TEXT)");
let select = db.query("SELECT * FROM data");
console.log("users = ",select);

router.get('/', home)
      .get('/sqlcmd/:cmd',sqlcmd)
      .get('/public/(.*)',pub);

app.use(router.routes());
app.use(router.allowedMethods());

//重新指回主畫面
async function home(ctx){
    ctx.response.redirect('/public/')
}

async function pub(ctx){
    await send(ctx,ctx.request.url.pathname,{
        root: `${Deno.cwd()}/`,
        index: "index.html",
    })
    console.log('path=', ctx.request.url.pathname)
}

async function sqlcmd(ctx){
    try{
        let cmd = ctx.params['cmd'];
        console.log("cmd = ", cmd) //sqlite 指令
        let list = db.query(cmd)
        console.log("list = ", list) //執行完後所取出的東西
        ctx.response.type = 'application/json' //將資料改成JSON形式放在畫面上
        const data = []
        for (const key of list) {
            data.push(key)
        }
        ctx.response.body = data
    }catch(e){
        ctx.response.body = ["Error " + e.message]
    }

}

console.log('Server run at http://127.0.0.1:8001')
await app.listen({ port: 8001 })