import { Application, } from "https://deno.land/x/oak/mod.ts";
const app = new Application();

function page(title,body) {
    return `<html>
    <head>
    <title>
    ${title}
    </title>
    <style>
        body
        {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: rgb(228, 228, 139);
        }
        .button
        {
            background-color: limegreen;
            padding:15px 30px;
            font-size:20px;
            border-radius:30px;
            cursor:pointer;
            border:3px solid darkgreen;
            color: white; 
            text-align: center;
        }
        .button:hover
        {
            background-color:#5cbf2a;
        }
        .button:active 
        {
            position:relative;
            top:1px;
        }
        input[type=text], input[type=password], input[type=date], input[type=text],input[type=email]
        {
            padding:10px 15px;
            width:200px;
            border-radius:10px;
            border: 1px black solid;
            align-items: center;
        }
        .grid {
            border: none;
            background-color: pink;
            border-radius: 20px;
            padding: 15px 25px 15px 25px;
            width: 250px;
            display: inline-block;
            margin-top: 10px;
            align-items: center;
        }
        .checkmsg{
            color: red;
        } 
    </style>
    </head>
    <body>
    ${body}
    </body>
    </html>`
  }
app.use((ctx) => {
   console.log('ctx.request.url=', ctx.request.url)
   let pathname = ctx.request.url.pathname
   if (pathname.startsWith("/login")) {
   ctx.response.body = page('login',`
        <form action="" method="post">
            <div class="grid">
                <h1 style="text-align:center">Sign in</h1>
                <p><input type="text" placeholder="Your name"/></p>
                <p><input type="date" placeholder="Your birthday"/></p>
                <p><input type="text" placeholder="Your Phone number" name="phone" /></p>
                <td><div class="checkmsg" id="phonemsg4"></div></td>
                <p><input type="email" placeholder="Your email" name="email"/></p>
                <p><input type="password" placeholder="Your password" name="Password" /></p>
                <td><div class="checkmsg" id="phonemsg"></div></td>
                <p><input type="password" placeholder="Repeat your password" name="repeat password" /></p>
                <td><div class="checkmsg" id="phonemsg2"></div></td>
                <p><input type="checkbox" name="agree" /> I agree all statements in <a href="#">Terms of service</a></p>
                <td><div class="checkmsg" id="phonemsg3" ></div></td>
                <input type="button" href="/home" name = "submit" value = "Login" id="btn" class='button' />
            </div>
        </form>
`)
} else {
ctx.response.body = page('home',`
  <h1>蘇子安的網站</h1>
  <p><input type="button" onclick="location.href = '/login'" name = "submit" value = "Login" id="btn" class='button' /></p>
`)
}
// searchParams.get('name')=${ctx.request.url.searchParams.get('name')}
});

console.log('start at : http://127.0.0.1:8000')
await app.listen({ port: 8000 });

