const Service = require('node-windows').Service;

const svc = new Service({
    name : 'nodeBasicService',
    description : 'Tryin to host a nodejs application on Windows',
    script : "C:\\Users\\User\\Desktop\\Server\\index.js"
})

svc.on('install' , function(){
    svc.start()
})

svc.install();