function UsuariosController() { }

let url = "https://cwi-nodejs-test.herokuapp.com";

UsuariosController.prototype.getUsuarios = function (req, res) {
    return new Promise(function (resolve, reject) {
        const objRequest = {
            uri: url,
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            json: true,
        };
        request(objRequest, (error, response) => {
            if (error) {
                console.error("ERRO - UsuariosController.prototype.getUsuarios", error)
                reject(error)
            } else if (response.statusCode != 200) {
                console.warn("WARN - UsuariosController.prototype.getUsuarios", response.body)
                reject(response.body)
            } else {
                res.json("response.body")
                array = response.body;
                recursive(0)
            }
        })
    })
}


let array = []
function recursive(index) {
    let element = array[index]
    const objRequest = {
        uri: "https://cwi-nodejs-test.herokuapp.com/" + element.id + "/address",
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        json: true,
    };
    request(objRequest, (error, response) => {
        if (error) {
            console.error(error)
            recursive(index)
        } else if (response.statusCode == 404) {
            console.warn("WARN 404 pula a requisição - UsuariosController.prototype.getUsuarios", response.body)
            element.address = {}
            recursive(index + 1)
        } else if (response.statusCode != 200) {
            console.warn("WARN - UsuariosController.prototype.getUsuarios", response.body)
            recursive(index)
        } else {
            element.address = response.body
            if (index == element.lenght - 1) {
                fs = require('fs')
                fs.writeFileSync('./Integracao.json', JSON.stringify(array))
                console.log("Acabou")
            } else {
                console.log(index)
                recursive(index + 1) 
            }
        }
    })
}

module.exports = new UsuariosController();