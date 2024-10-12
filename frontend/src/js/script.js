const { json } = require("express");

document.addEventListener('DOMContentLoaded', ()=> {
    const modal_form = document.getElementById('modal_form');
    const form = document.getElementById('form_add');

    const button_exit_modal = document.getElementById('button_exit_modal');
    // Fecha modal
    button_exit_modal.addEventListener('click', ()=> {
        modal_form.style.display = 'none'
    })
    // abre modal com add
    const button_adicionar = document.getElementById('button_adicionar');
    button_adicionar.addEventListener('click', ()=> {
        modal_form.style.display = 'flex'
    })

    const button_submit = document.getElementById('button_submit');
    button_submit.addEventListener('click', (event)=> {
        event.preventDefault();
        
        // pegar todos dados do form e cadastrar
    })
});