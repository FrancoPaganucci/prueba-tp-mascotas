$(document).ready(function () {
    const CARDS_CONTAINER = $('#cards-container');
    const MAX_MASCOTAS = 6;
    const URL_INPUT = $('#add-url-input');
    const BTN_ADD = $('#btn-add');
    const BTN_DELETE_BY_URL = $('#btn-delete');
    const URL_REGEX = /^(ftp|http|https):\/\/[^ "]+$/;
    const URL_ARRAY = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPfJJPhYddGYQl_KFWpeSdHZiaw7XMP96Eqw&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUGaKQYijLVxRAa8LkWgRnOYGWwQvLB0eV9A&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTng566yvAv4A3sJdZ9TetY5cF4irMXNK86rw&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPfJJPhYddGYQl_KFWpeSdHZiaw7XMP96Eqw&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUGaKQYijLVxRAa8LkWgRnOYGWwQvLB0eV9A&usqp=CAU',
    ]

    const CARD_TEMPLATE = `
    <div class="card mx-2 my-2" style="width: 25rem;">
        <img class="card-img" src={URL}
        class="card-img-top fixed-height" alt="animal image">
        <div class="card-body row-cols-1 align-items-center">
        <a href="#" class="btn btn-danger eliminar">Eliminar</a>
        </div>
    </div>
    `

    URL_ARRAY.forEach(url => {
        const newCard = CARD_TEMPLATE.replace('{URL}',url);
        $(CARDS_CONTAINER).append(newCard);
    });

    checkIfMax();
    // EVENTOS
    BTN_ADD.on('click', () => {
        let urlAdded = URL_INPUT.val();
        addPetByUrl(urlAdded);
    });
    BTN_DELETE_BY_URL.on('click', () => {
        let urltoBeDeleted = URL_INPUT.val();
        deletePetByUrl(urltoBeDeleted);
    });
    $(document).on("click", ".eliminar", function () {
        deleteThisCard($(this));
        checkIfMax();
    });


    // funcion add
    function addPetByUrl(url) {
        //check for url valid format
        if (inputIsEmpty(url)) {
            alert("input is empty!");
            return;
        } else if (urlNotValid(url)) {
            alert("url not valid");
            return;
        } else {
            const newCard = CARD_TEMPLATE.replace('{URL}',url);
            $(CARDS_CONTAINER).append(newCard);
            URL_ARRAY.push(url);
            URL_INPUT.val('');
            checkIfMax();
        }
    }

    // funcion delete
    function deleteThisCard(botonEliminar) {
        //eliminar url del array
        let index = botonEliminar.closest('.card').index();
        URL_ARRAY.splice(index,1);
        //eliminar tarjeta
        botonEliminar.closest('.card').remove();
        //checkIfMax
        checkIfMax();
    }

    // funcion delete by URL
    function deletePetByUrl(url) {
        if (inputIsEmpty(url)) {
            alert("input is empty!");
            return;
        } else if (urlNotValid(url)) {
            alert("url not valid");
            return;
        } else {
            //eliminar url del array
            let index = URL_ARRAY.indexOf(url);
            URL_ARRAY.splice(index,1);
            //eliminar tarjeta
            $('.card-img[src="'+url+'"]').closest('.card').remove();
            alert('Mascota eliminada correctamente');
            //checkifMax
            checkIfMax();
        }
    }

    // funcion para validar maximo permitido de mascotas
    function checkIfMax(){
        let arraySize = URL_ARRAY.length;
        if(arraySize >= MAX_MASCOTAS) {
            $('.form-container').css('display', 'none');
            return false;
        } else {
            $('.form-container').css('display', 'block');
            return true
        }
    }

    // VALIDACIONES
    function inputIsEmpty(inputVal){
        if(inputVal === '') {
            return true;
        } else {
            return false
        }
    }

    function urlNotValid(inputVal){
        if (!URL_REGEX.test(inputVal)) {
            return true;
        } else {
            return false;
        }
    }
});