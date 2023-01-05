//引用Application和Router
import { Application, Router } from "https://deno.land/x/oak/mod.ts";
//引用render
import * as render from './render.js'
//引用資料庫
import { DB } from "https://deno.land/x/sqlite/mod.ts";

//建立新資料庫
const db = new DB("blog.db");
//建立新的table
db.query("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, body TEXT)");

//URL
const router = new Router();

//根據"/"後面的值去跑相對應的函式
router.get('/', list)
  .get('/post/new', add)
  .get('/post/:id', show)
  .post('/post', create);


const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

//將資料寫進資料庫
function query(sql) {
  let list = []
  for (const [id, title, body] of db.query(sql)) {
    list.push({id, title, body})
  }
  return list
}

//取出資料庫內的所有資料
async function list(ctx) {
  let posts = query("SELECT id, title, body FROM posts")
  console.log('list:posts=', posts)
  ctx.response.body = await render.list(posts);
}

//建立新資料
async function add(ctx) {
  ctx.response.body = await render.newPost();
}

//將選定Id的資料選取出來，並將其顯示
async function show(ctx) {
  const pid = ctx.params.id;
  let posts = query(`SELECT id, title, body FROM posts WHERE id=${pid}`)
  let post = posts[0]
  console.log('show:post=', post)
  if (!post) ctx.throw(404, 'invalid post id');
  ctx.response.body = await render.show(post);
}

//建立一筆新資料
async function create(ctx) {
  const body = ctx.request.body()
  if (body.type === "form") {
    const pairs = await body.value
    const post = {}
    for (const [key, value] of pairs) {
      post[key] = value
    }
    console.log('create:post=', post)
    db.query("INSERT INTO posts (title, body) VALUES (?, ?)", [post.title, post.body]);
    ctx.response.redirect('/');
  }
}

console.log('Server run at http://127.0.0.1:8000')
await app.listen({ port: 8000 });
