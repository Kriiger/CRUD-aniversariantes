const formulario = document.querySelector('#formulario');
const botao = document.querySelector('[data-botaoSalvar]');
const inputNome = document.getElementById('name');
const inputData = document.getElementById('data');
const tabelaDeItens = document.querySelector('[data-tabelaDeItens]');

const recuperaLista = localStorage.getItem('arrayDeItens');

let arrayDeItens = [];
let editarNome;
let editarData;

function atualizaLocalStorage(){
    localStorage.setItem('arrayDeItens', JSON.stringify(arrayDeItens));
}
if(recuperaLista){
    arrayDeItens = JSON.parse(recuperaLista);
}else{
    arrayDeItens = [];
}

formulario.addEventListener('submit', e => {
    e.preventDefault();
    salvarItem();
    mostrarItem();
    inputNome.value = '';
    inputData.value = '';
})

function salvarItem(){
    const nomePessoa = inputNome.value
    const checarDuplicado = arrayDeItens.some((elemento) => elemento.nome == nomePessoa)

    if (checarDuplicado) {
        alert("Item já existe")
    }else{
        arrayDeItens.push({
            nome: inputNome.value,
            dataDeNascimento: inputData.value
        });
    }
}

function mostrarItem(){
    tabelaDeItens.innerHTML = `
    <tr>
        <td class="tableTitle">Nome</td>
        <td class="tableTitle">Data de nascimento</td>
        <td class="tableTitle">Ações</td>
    </tr>
    `;
    
    arrayDeItens.forEach((e, i) => {
        tabelaDeItens.innerHTML += `
        <tr data-value="${i}">
            <td class="nome" data-value="${i}">${e.nome}</td>
            <td class="data" data-value="${i}">${e.dataDeNascimento}</td>
            <td><button class="botaoEditar">Editar</button><button class="botaoExcluir">Excluir</button></td>
        </tr>
    `;
    })

    const excluir = document.querySelectorAll(".botaoExcluir");
    excluir.forEach((e) => {
        e.addEventListener('click', (i) => {
            const elemento = i.target.parentElement.parentElement.getAttribute('data-value');
            arrayDeItens.splice(elemento, 1);
            mostrarItem()
        })
    })
    
    const editar = document.querySelectorAll(".botaoEditar");
    editar.forEach((e) => {
        e.addEventListener('click', (i) => {
            const elementoPai = i.target.parentElement.parentElement;

            const filhoNome = elementoPai.firstChild.nextElementSibling;
            editarNome = filhoNome.getAttribute('data-value');
            filhoNome.innerHTML = `<td><input type="text" class="novoNome"></td>`;

            const filhoData = elementoPai.childNodes[3]
            editarData = filhoData.getAttribute('data-value');
            filhoData.innerHTML = `<td><input type="date" class="novaData"></td>`;
            
            const pegaNovoNome = document.querySelector(".novoNome");
            const pegaNovaData = document.querySelector(".novaData");

            pegaNovoNome.value = arrayDeItens[editarNome].nome;
            pegaNovaData.value = arrayDeItens[editarData].dataDeNascimento;

            const elementoFilho = i.target.parentElement;
            elementoFilho.innerHTML = `<td><button class="botaoSalvarTabela">Salvar</button></td>`

            const pegaBotaoSalvar = document.querySelector('.botaoSalvarTabela');
            pegaBotaoSalvar.addEventListener('click', (e) => {
                const novoNome = pegaNovoNome.value;
                arrayDeItens[editarNome].nome = novoNome;
                filhoNome.innerHTML = novoNome;

                const novaData = pegaNovaData.value;
                arrayDeItens[editarData].dataDeNascimento = novaData;
                filhoData.innerHTML = novaData;
                mostrarItem()
            });
        });
    });
    atualizaLocalStorage();
}

mostrarItem();

/*

VALIDAÇÃO DO INPUT DE EDIÇÃO

if(novoNome.lentgh >= 3 && novoNome == exp){
    positivo
}else{
    monta um alert na tela
}

*/