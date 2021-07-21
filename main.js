const contactlist = document.querySelector('.post-list');
const addContactForm  = document.querySelector('.add-post-form');

const nombreValue = document.getElementById('nombre_value');
const telefonoValue = document.getElementById('telefono_value');
const emailValue = document.getElementById('email_value');
let btnSubmit = document.querySelector('.btn');

let output = ``;

const renderContacts = (contacts) => {
    contacts.forEach(contact => {
        output += `
        <div class="card mt-4 col-md-6 bg-ligt">
            <div class="card-body" data-id=${contact.Id}>
            <h5 class="card-title">${contact.nombre}</h5>
            Telefono : <h6 class="card-subtitle1 mb-2 text-muted" data-id="telefono_">${contact.telefono}</h6>
            E-Mail : <h6 class="card-subtitle2 mb-2 text-muted" data-id="email_">${contact.email}</h6>
            <a href="#" class="card-link" id="edit_contact">Editar</a>
            <a href="#" class="card-link" id="delete_contact">Eliminar</a>
            </div>
        </div>`;
    });
    contactlist.innerHTML = output;
}
const vaciarControles = () => {
    nombreValue.value = "";
    telefonoValue.value = "";
    emailValue.value = "";
}

const url = "http://localhost/ws/index.php";

// Get - Leer los contactos
fetch(url)
    .then(res => res.json())
    .then(data => renderContacts(data))
    .then(() => vaciarControles())


// ELIMINAR Y EDITAR
contactlist.addEventListener('click', (e) => {
    let delButtonIsPressed = e.target.id == 'delete_contact';
    let editButtonIsPressed = e.target.id == 'edit_contact';
    
    let id = e.target.parentElement.dataset.id;

    //DELETE
    if(delButtonIsPressed){
        fetch(`${url}?id=${id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(() => alert('Un Contacto se ha eliminado'))
        .then(() => location.reload())
        .then(() => console.log('Contacto Eliminado'))
    }
    //     editar...
    if(editButtonIsPressed){
        const parent = e.target.parentElement;
        let nombreContent = parent.querySelector('.card-title').textContent;
        let telefonoContent = parent.querySelector('.card-subtitle1').textContent;
        let emailContent = parent.querySelector('.card-subtitle2').textContent;

        nombreValue.value = nombreContent;
        telefonoValue.value = telefonoContent;
        emailValue.value = emailContent;

        btnSubmit.innerText = "Editar Contacto";
       
    }

    // UPDATE   // PUT
    btnSubmit.addEventListener('click', (e) => {
        e.preventDefault();
        fetch(`${url}?id=${id}&nombre=${nombreValue.value}&telefono=${telefonoValue.value}&email=${emailValue.value}`, {
            method: 'PUT',
        })
        .then(res => res.json())
        .then(() => alert('Contacto Modificado'))
        .then(() => location.reload())
        .then(() => console.log('Contacto Modificado'))
    })
})

// Crear - Insertar nuevo contacto   POST
addContactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(nombreValue.value == "" || telefonoValue.value == "" || emailValue.value == "")
    {
        alert('Por favor llenar todos los datos');
    }else{
        fetch(`${url}?nombre=${nombreValue.value}&telefono=${telefonoValue.value}&email=${emailValue.value}`, {
            method: 'POST'
        })
        .then(res => res.json())
        .then(() => alert('Agrego un nuevo Contacto'))
        .then(() => location.reload())
        .then(() => console.log('Un Contacto Agregado'))
    }
})



