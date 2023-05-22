const url = 'https://jsonplaceholder.typicode.com/comments'

fetch(url)
    .then(response => response.json())
    .then(data => mostrarData(data))
    .catch(error => console.log(error))

    const mostrarData = (data) => {
        console.log(data)
        let body = ''
        for (let i=0; i<15; i++){
            body += `<tr><td class="cuerpo">Tema:</td><td class="cuerpo">${data[i].name}</td></tr>
            <tr><td>Usuario:</td><td>${data[i].email}</td></tr>
            <tr><td>Comentario:</td><td>${data[i].body}</td></tr>`
        }
        document.getElementById('data').innerHTML = body
    }
