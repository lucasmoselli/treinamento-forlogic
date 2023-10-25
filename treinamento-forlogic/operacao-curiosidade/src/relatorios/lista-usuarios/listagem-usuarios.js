

function listagem(){
    perPage = 9;
    const state = {
        page: 1,
        perPage,
        totalPage: Math.ceil(listaCadastrados.length / perPage)
    }

    const html = {
        get(element) {
            return document.querySelector(element);
        }
    }

    const controls = {
        currentItem: null,
    
        next() {
            state.page++;

            if(state.page > state.totalPage) {
                state.page--;
            }
        },
        prev() {
            state.page--;

            if(state.page < 1) {
                state.page++;
            }
        },
        goTo(page) {
            if(page < 1) page = 1;

            state.page = page;

            if (page > state.totalPage){
                state.page = state.totalPage;
            }
        },
        createListeners() {
            html.get('.first').addEventListener('click', () => {
                controls.goTo(1);
                const number = document.querySelector('.numbers');
                number.innerHTML = state.page;
                list.update(this.currentItem);
            });
            html.get('.last').addEventListener('click', () => {
                controls.goTo(state.totalPage);
                const number = document.querySelector('.numbers');
                number.innerHTML = state.page;
                list.update(this.currentItem);
            });
            html.get('.next').addEventListener('click', () => {
                controls.next();
                const number = document.querySelector('.numbers');
                number.innerHTML = state.page;
                list.update(this.currentItem);
            });
            html.get('.prev').addEventListener('click', () => {
                controls.prev();
                const number = document.querySelector('.numbers');
                number.innerHTML = state.page;
                list.update(this.currentItem);
            });
        }
    };

    const list = {
        create(item) {
            const div = document.createElement('div');
            div.classList.add('cadastros-value');

            if(item.ativoCad == 'false'){
                div.innerHTML = `
                <p>${item.nomeCompletoCad}</p>
                <p>${item.emailCad}</p>
                <p class = "status-inativo">Inativo</p>
                `;
            } else if(item.ativoCad == "true") {
                div.innerHTML = `
                <p>${item.nomeCompletoCad}</p>
                <p>${item.emailCad}</p>
                <p class = "status-ativo">Ativo</p>
                `;
            }  else {
                div.innerHTML = `
                <p>${item.nomeCompletoCad}</p>
                <p>${item.emailCad}</p>
                <p class = "status-ativo">Ativo</p>

                `;
            }   

            html.get('.cadastro-lista').appendChild(div);
        },
        update(item) {
            html.get('.cadastro-lista').innerHTML = "";

            let page = state.page - 1;
            let start = page * state.perPage;
            let end = start + state.perPage;

            const paginatedItems = item.slice(start, end);

            paginatedItems.forEach((item) =>{
                list.create(item);
            
            });
            controls.currentItem = item;
        }
    }
    function search(texto) {
        return listaCadastrados.filter(item => item.nomeCompletoCad.includes(texto));
    }
    
    const text = document.getElementById('procurarNome');
    const number = document.querySelector('.numbers');

    window.addEventListener("load", () => {
        text.addEventListener('input', () => {
            controls.goTo(1);
            number.innerHTML = state.page;
            const searchTerm = text.value.trim();
            const filteredList = search(searchTerm);
            state.totalPage= Math.ceil(filteredList.length / perPage);

            list.update(filteredList)

        });
    });

    const print = document.querySelector('.cadastro-btn').addEventListener('click', function(){
        const number = document.querySelector('.numbers');
        state.totalPage = 1;
        number.innerHTML = state.page;
        const searchTerm = text.value.trim();
        const filteredList = search(searchTerm);
        state.perPage = filteredList.length;

        list.update(filteredList);
        window.print();
        state.perPage = 9;
        list.update(filteredList);
    });

    function init(){
        list.update(listaCadastrados);
        controls.createListeners();
    }
    init();
}

listagem();
