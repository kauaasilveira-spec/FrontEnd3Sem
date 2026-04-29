function calcular(params) {
    // alert("Função Calcular rodando!! :)");

    const nome = document.getElementById("nome").value;
    const altura = parseFloat(document.getElementById("altura").value);
    const peso = parseFloat(document.getElementById("peso").value);
    const listar = document.getElementById("cadastro");

    //deixou de preencher um campo
    if (nome.trim().length == 0 || isNaN(altura) || isNaN(peso)) {
        alert("Preencha todos os campos: Nome, Altura e Peso");
        return false;
    }

    const IMC = calcularImc(altura, peso);
    const textoSituacao = gerarTextoIMC(IMC);

    console.log(nome);
    console.log(altura);
    console.log(peso);
    console.log(IMC);
    console.log(textoSituacao);


    const objIMC = {
        nome: nome,
        altura: altura,
        peso: peso,
        IMC: IMC,
        textoSituacao: textoSituacao
    };

    //chamar a função cadastrarNaAPI(objIMC)
    const retorno = cadastrarNaAPI(objIMC);

    if (retorno) {
        buscarIMCs(); //faz um get e coloca todo mundo no html (tabela)

        //limpar os campos do formulário

        document.getElementById("nome").value = "";
        document.getElementById("altura").value = "";
        document.getElementById("peso").value = "";

        alert(`${nome} foi cadastrado no banco
            Nome: ${nome}
            IMC: ${IMC}
            Situação: ${textoSituacao}`);

    } else {
        alert("Não foi possivel cadastrar");
    }



}//fim da função calcular

async function cadastrarNaAPI(objetoIMC) {
    //chamar o fetch e fazer o POST

    try {
        console.log(objetoIMC);

        const resposta = await fetch("http://localhost:3000/imc", {

            method: "POST",
            body: JSON.stringify(objetoIMC),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        });
        return true;


    } catch (error) {
        console.log(error);
        return false;
    }
}

//Recebe o peso e a altura e devolve o IMC calculado
function calcularImc(altura, peso) {
    return peso / (altura * altura);
}

function gerarTextoIMC(IMC) {
    if (IMC < 16) {
        return "Magreza grave"
    } else if (IMC < 17) {
        return "Magreza moderada"
    } else if (IMC < 18.5) {
        return "Magreza leve"
    } else if (IMC < 25) {
        return "Saudável"
    } else if (IMC < 30) {
        return "Sobrepeso"
    } else if (IMC < 35) {
        return "Obesidade Grau I"
    } else if (IMC < 40) {
        return "Obesidade Grau II"
    } else {
        return "Obesidade Grau III"
    }


} //fim da função 


async function buscarIMCs() {
    try {
        const retorno = await fetch("http://localhost:3000/imc")
        const dadosRetornados = await retorno.json();

        dadosRetornados.sort( (a,b) => {
        return a.nome.localeCompare(b.nome);
        });

        await console.log(dadosRetornados); //dados do cadastro


        const tabela = document.getElementById("cadastro");
        let template = ""; //variavel auxiliar de texto, guarda várias linhas da tabela

        for (let i = 0; i < dadosRetornados.length; i++) {

            template +=
                `<tr>
        <td>${dadosRetornados[i].nome}</td>
        <td>${dadosRetornados[i].altura}</td>
        <td>${dadosRetornados[i].peso}</td>
        <td>${dadosRetornados[i].IMC.toFixed(2)}</td> 
        <td>${dadosRetornados[i].textoSituacao}</td>
        </tr>`;
        }

        tabela.innerHTML = template; //só é acionado o html uma vez

    } catch (error) {
        console.log(error);
    }
}

