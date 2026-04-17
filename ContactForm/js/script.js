async function cadastrarContato(objetoContato) {
console.log(objetoContato);

//cadastrar na API
let resposta = await fetch("http://localhost:3000/contatos", {
method: "POST",
body: JSON.stringify(objetoContato),
headers: {
"Content-Type": "application/json; charset=UTF-8"
    }
});




// Funções auxiliares movidas para o escopo global
function FormError(fieldId) {
    document.getElementById(fieldId).style.border = "1px solid red";
}

function ReiniciaBorda(fieldId) {
    document.getElementById(fieldId).style.border = "3px solid green";
}

function minhaFuncao() {
    // let nome = document.getElementById('nome').value.trim();
    // let sobrenome = document.getElementById('sobrenome').value.trim();
    // let email = document.getElementById('email').value.trim();
    // let telefone = document.getElementById('telefone').value.trim();
    // let cep = document.getElementById('cep').value.trim();
    // let rua = document.getElementById('rua').value.trim();
    // let numero = document.getElementById('numero').value.trim();
    // let apto = document.getElementById('apto').value.trim();
    // let bairro = document.getElementById('bairro').value.trim();
    // let cidade = document.getElementById('cidade').value.trim();
    // let estado = document.getElementById('estado').value.trim();
    // let mensagem = document.getElementById('mensagem').value.trim();

    // 1. Declarando a variável que estava faltando
    let quantidadeErros = 0;

    // console.log para ver o tamanho do nome (opcional)
    // alert(nome.length);

    if (nome.length == 0) {
        FormError("nome");
        quantidadeErros++;
    } else {
        ReiniciaBorda("nome");
    }

    if (sobrenome.length == 0) {
        FormError("sobrenome");
        quantidadeErros++;
    } else {
        ReiniciaBorda("sobrenome");
    }

    let objetoContato = {
        nome: nome,
        sobrenome: sobrenome
    };

    let cadastrado = CadastroContato(objetoContato);
    return false;

    // if (email.length == 0) {
    //     FormError("email");
    //     quantidadeErros++;
    // } else {
    //     ReiniciaBorda("email");
    // }

    // if (telefone.length == 0) {
    //     FormError("telefone");
    //     quantidadeErros++;
    // } else {
    //     ReiniciaBorda("telefone");
    // }

    // if (cep.length == 0) {
    //     FormError("cep");
    //     quantidadeErros++;
    // } else {
    //     ReiniciaBorda("cep");
    // }

    // if (rua.length == 0) {
    //     FormError("rua");
    //     quantidadeErros++;
    // } else {
    //     ReiniciaBorda("rua");
    // }

    // if (numero.length == 0) {
    //     FormError("numero");
    //     quantidadeErros++;
    // } else {
    //     ReiniciaBorda("numero");
    // }

    // if (apto.length == 0) {
    //     FormError("apto");
    //     quantidadeErros++;
    // } else {
    //     ReiniciaBorda("apto");
    // }

    // if (bairro.length == 0) {
    //     FormError("bairro");
    //     quantidadeErros++;
    // } else {
    //     ReiniciaBorda("bairro");
    // }

    // if (cidade.length == 0) {
    //     FormError("cidade");
    //     quantidadeErros++;
    // } else {
    //     ReiniciaBorda("cidade");
    // }

    // if (estado.length == 0) {
    //     FormError("estado");
    //     quantidadeErros++;
    // } else {
    //     ReiniciaBorda("estado");
    // }

    // if (mensagem.length == 0) {
    //     FormError("mensagem");
    //     quantidadeErros++;
    // } else {
    //     ReiniciaBorda("mensagem");
    // }

    if (quantidadeErros !== 0) {
        alert("Existem " + quantidadeErros + " campo(s) não preenchido(s)");
    } else {
        alert("Formulário preenchido com sucesso!");
    }
}

async function buscarEndereco(cep) {
    if (cep.trim().length < 8) {
        alert("CEP inválido. O CEP deve conter 8 dígitos");
        return false;
    }

    try {
        // (template string)
        let retorno = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        let dados = await retorno.json();

        console.log(dados);

        if (dados.erro) {
            alert("CEP não encontrado.");
            return false;
        }

        // Exemplo de como preencher os campos automaticamente:
        document.getElementById('rua').value = dados.logradouro;
        document.getElementById('bairro').value = dados.bairro;
        document.getElementById('cidade').value = dados.localidade;
        document.getElementById('estado').value = dados.uf;

        // 7 e 8. Adicionado o catch e fechado as chaves corretamente
    } catch (erro) {
        alert("Ocorreu um erro ao buscar o CEP.");
        console.error(erro);
    }
}}