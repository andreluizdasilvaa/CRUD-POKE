document.addEventListener('DOMContentLoaded', ()=> {
    const modal_form = document.getElementById('modal_form');
    const form = document.getElementById('form_add');

    const button_exit_modal = document.getElementById('button_exit_modal');
    // Fecha modal
    button_exit_modal.addEventListener('click', ()=> {
        modal_form.style.display = 'none'
    })
    
    // MOSTRAR TODOS POKEMONS
    fetch("http://localhost:5000/pokefeed",{
        method: 'GET'
    }).then((response)=> response.json())
    .then((item) => {
        const container_poke = document.getElementById("container_poke");
        container_poke.innerHTML = '';

        item.forEach((poke)=> {
            const cardPoke = document.createElement('div');
            const classesToAdd = `flex gap-2 bg-black p-5 rounded-xl border-2 border-white min-w-[500px]`;
            cardPoke.classList.add(...classesToAdd.split(" "));


            cardPoke.innerHTML = `
            <div class="bg-gradient-to-r from-white to-[#7B00FF] p-1 rounded-xl">
                    <div class="bg-white rounded-xl">
                        <img class="w-[400px] h-[400px] rounded-xl"
                            src="${poke.url_image}" alt="">
                    </div>

                </div>

                <div class="flex flex-col min-w-96 text-center justify-center items-center gap-4">
                    <h1 class="text-6xl">${poke.name}</h1>
                    <p class="text-xl">Tipo: ${poke.tipo}</p>
                    <button id="button_delete"
                        class="text-black bg-white rounded-md px-3 py-2 shadow-custom text-2xl hover:bg-[#7B00FF] hover:text-white hover:shadow-customtwo transition-all min-w-48">Deletar</button>
                    <button id="button_atualizar"
                        class="text-black bg-white rounded-md px-3 py-2 shadow-custom text-2xl hover:bg-[#7B00FF] hover:text-white hover:shadow-customtwo transition-all min-w-48">Atualizar</button>
                </div>
            `;
            container_poke.appendChild(cardPoke);
        })
    })


    // abre modal com botão adicionar
    const button_adicionar = document.getElementById('button_adicionar');
    button_adicionar.addEventListener('click', ()=> {
        modal_form.style.display = 'flex'
        
        // ADICIONAR POKEMON
        const button_submit = document.getElementById("button_submit");
        button_submit.addEventListener("click", (event) => {
            event.preventDefault();

            const nome_poke = document.getElementById("nome_poke").value;
            const tipo_poke = document.getElementById("tipo_poke").value;
            const url_img = document.getElementById("url_img").value;

            if(!nome_poke || !tipo_poke || !url_img) {
                alert('Prencha todos os campos do formulario');
                return; // para a leitura do code
            } else {
                // enviar dados do form
                fetch("http://localhost:5000/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nome: nome_poke,
                        tipo: tipo_poke,
                        url_img: url_img,
                    }),
                }).then((response) => {
                    if (response.ok) {
                        window.location.reload();
                    }
                });
            }


            
        });
    })
});