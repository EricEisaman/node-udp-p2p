
/*
 Simple Rendevous Server
 =======================
 Notes:
  1) 3rd party data shared with secret key
  2) match mappings not stored to server
  3) simple object data storage
*/

const Koa = require('koa'),
      Router = require('koa-router')

const app = new Koa(),
    router = new Router()

let users = []

// Clear console
process.stdout.write('\033c')

router.get('/:secret_key/:ip/:port',ctx=>{
  let user = {}
  user.ip = ctx.params.ip
  user.port = ctx.params.port
  users[ctx.params.secret_key] = user
  ctx.body = {"result":"success"}
  console.log('User Data Saved:')
  console.log(`Secret Key: ${ctx.params.secret_key}`)
  //console.log(`IP: ${user.ip}`)
  console.log(`IP: XXX.XXX.XXX.XXX`)
  console.log(`Port: ${user.port} \n`)
})

router.get('/get/:secret_key',ctx=>{
  if(users[ctx.params.secret_key]){
    let user = users[ctx.params.secret_key]
    ctx.body = {"result":user}
    console.log('User Data Shared:')
    console.log(`Secret Key: ${ctx.params.secret_key}`)
    //console.log(`IP: ${user.ip}`)
    console.log(`IP: XXX.XXX.XXX.XXX`)
    console.log(`Port: ${user.port} \n`)
  }else{
    ctx.body = {"result":"access denied"}
    console.log(`Access Denied for key request ${ctx.params.secret_key}.`)
    console.log(`key given was type ${typeof ctx.params.secret_key}`)
    console.log(`Users Array: \n ${users}`)
  }

})

app
  .use(router.allowedMethods())
  .use(router.routes())
  .use(require('koa-body')())

app.listen(3000)
console.log('Rendevous server \nlistening on port 3000. \n \n')
