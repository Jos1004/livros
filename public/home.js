const http = require('http')
const fs = require('fs')
const port = process.env.port || 3000

function serveStatic(res, path, content, responseCode=200){
    fs.readFile(__dirname + path, (err, data) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/plain'})
            return res.end('500 - Internal Error')
        }
        res.writeHead(responseCode, {'Content-Type': content})
        res.end(data)
    })
}

const server = http.createServer((req, res) =>{
    //normaliza a url removendo a query string e a barra final
    //opcional e usando letras minusculas
    const path = req.url.replace(/\/?(?:\?.*)?$/,'').toLowerCase()
    switch(path){
        case '':
            serveStatic(res, '/home.html', 'text/html')
            break
        case '/stylesheet/style.css':
            serveStatic(res, '/stylesheet/style.css', 'text/css')
            break
        case '/about':
            serveStatic(res, '/about.html', 'text/html')
            break
        case '/img/logo.png':
            serveStatic(res, '/img/logo.png', 'image/png')
            break
        case '/img/error.jpeg':
            serveStatic(res, '/img/error.jpeg', 'image/jpeg')
            break
        case '/img/books.png':
            serveStatic(res, '/img/books.png', 'image/png')
            break
        default:
            serveStatic(res, '/erro404.html', 'text/html', 404)
            break
    }
})

server.listen(port, () => console.log(`Servidor iniciado na porta ${port};` + 'Aperte Ctrl-C para terminar.'))