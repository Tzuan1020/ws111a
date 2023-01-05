export function layout(title, content) {
  return `
  <html>
  <head>
    <title>${title}</title>
    <style>
    body {
      padding: 50px;
      font: 16px Helvetica, Arial;
      background-color: burlywood;
  
    }
  
    h1 {
      font-size: 5em;
      margin-top: 5px;
      margin-bottom: 10px;
    }
  
    h2 {
      font-size: 1.2em;
    }
  
    #posts {
      margin: 0;
      padding: 0;
    }
  
    #posts li {
      margin: 40px 0;
      padding: 0;
      padding-bottom: 20px;
      border-bottom: 1px solid #eee;
      list-style: none;
    }
  
    #posts li:last-child {
      border-bottom: none;
    }
  
    textarea {
      width: 500px;
      height: 300px;
    }
  
    input[type=text],
    textarea {
      border: 1px solid #eee;
      border-top-color: #ddd;
      border-left-color: #ddd;
      border-radius: 10px;
      padding: 15px;
      font-size: .8em;
    }
  
    input[type=text] {
      width: 500px;
    }
  .container{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
  }
  .date{
      width: 500px;
      padding: 15px;
      border-radius: 10px;
  }  
  .create{
      display: flex;
      align-items: center;
      justify-content: right;
  }
  
  .btn
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
  .btn:hover
  {
      background-color:#5cbf2a;
  }
    </style>
  </head>
  <body>
    <section id="content">
      ${content}
    </section>
  </body>
  </html>
  `
}

export function list(posts) {
  let list = []
  for (let post of posts) {
    list.push(`
    <li>
      <h2>${ post.title }</h2>
      <p><a href="/post/${post.id}">Read post</a></p>
    </li>
    `)
  }
  let content = `
      <h1>Posts</h1>
      <p>You have <strong>${posts.length}</strong> posts!</p>
      <p><a href="/post/new">Create a Post</a></p>
      <ul id="posts">
        ${list.join('\n')}
      </ul>
  `
  return layout('Posts', content)
}

export function newPost() {
  return layout('New Post', `
  <section id="content">
  <div class="container">
      <h1>New Post</h1>
      <p>Create a new post.</p>
      <form action="/post" method="post">
      <p><input type="text" placeholder="Title" name="title"></p>
      <p><input type="date" placeholder="date" name="date" class="date"></p>
      <p><textarea placeholder="Contents" name="body"></textarea></p>
      <div class="create"><p><input type="submit" value="Create" class="btn"></p></div>
      </form>
  </div>
</section>
  `)
}

export function show(post) {
  return layout(post.title, `
    <h1>${post.title}</h1>
    <p>${post.date}</h1>
    <p>${post.body}</p>
  `)
}
