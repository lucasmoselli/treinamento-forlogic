function listagem(){
    perPage = 9;
    const state = {
        page: 1,
        perPage,
        totalPage: Math.ceil(listaCadastrados.length / perPage)
    };

    const html = {
        get(element) {
            return document.querySelector(element);
        }
    };

    const controls = {
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
                update();
            });
            html.get('.last').addEventListener('click', () => {
                controls.goTo(state.totalPage);
                update();
            });
            html.get('.next').addEventListener('click', () => {
                controls.next();
                update();
            });
            html.get('.prev').addEventListener('click', () => {
                controls.prev();
                update();
            });
        }
    };

    const list = {
        create(item) {
            const div = document.createElement('div');

            if(item.ativoCad == 'false'){
                div.innerHTML = `
                <p>${item.nomeCompletoCad}</p>
                <p>${item.emailCad}</p>
                <p class = "status-inativo">Inativo</p>`;
            } else if(item.ativoCad == "true") {
                div.innerHTML = `
                <p>${item.nomeCompletoCad}</p>
                <p>${item.emailCad}</p>
                <p class = "status-ativo">Ativo</p>`;
            }  else {
                div.innerHTML = `
                <p>${item.nomeCompletoCad}</p>
                <p>${item.emailCad}</p>
                <p class = "status-ativo">Ativo</p>`;
            }   

            html.get('.cadastro-lista').appendChild(div);
        },
        update() {
            html.get('.cadastro-lista').innerHTML = "";

            let page = state.page - 1;
            let start = page * state.perPage;
            let end = start + state.perPage;

            const paginatedItems = listaCadastrados.slice(start, end);

            paginatedItems.forEach(list.create);
        }
    }

    function update() {
        list.update();
        console.log(state.page);
        const number = document.querySelector('.numbers');
        number.innerHTML = state.page;
    }

    function init(){
        list.update();
        controls.createListeners();
    }
    init();
}

listagem();
