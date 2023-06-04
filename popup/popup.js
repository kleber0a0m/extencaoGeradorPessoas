function copiarTexto(id) {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.select();
        document.execCommand('copy');
    }
}

function gerarPessoa() {
    fetch('https://geradorbrasileiro.com/api/faker/pessoa', {
        method: 'GET',
        headers: {
            'accept': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            const pessoa = data.values[0];
            pessoa.email = gerarEmail(pessoa.nome);
            nomeEstado = pessoa.endereco.estado;
            siglaEstado = pessoa.endereco.estadoSigla;

            gerarEndereco(pessoa.endereco.estadoSigla, pessoa.endereco.cidade)
                .then(endereco => {
                    pessoa.endereco = endereco;
                    pessoa.endereco.estado = nomeEstado;
                    pessoa.endereco.estadoSigla = siglaEstado;
                    chrome.storage.local.set({ pessoa }, () => {
                        mostrarDados();
                    });
                })
                .catch(error => console.log(error));

        })
        .catch(error => console.log(error));
}


function gerarEndereco(siglaEstado, nomeCidade) {
    return new Promise((resolve, reject) => {
        const url = `https://viacep.com.br/ws/${siglaEstado}/${nomeCidade}/Rua/json/`;
        fetch(url)
            .then(response => response.json())
            .then(enderecos => {
                if (enderecos.length > 0) {
                    const endereco = enderecos[Math.floor(Math.random() * enderecos.length)];
                    console.log(endereco);
                    resolve({
                        cep: endereco.cep,
                        logradouro: endereco.logradouro,
                        complemento: endereco.complemento,
                        bairro: endereco.bairro,
                        localidade: endereco.localidade,
                        uf: endereco.uf,
                        ibge: endereco.ibge,
                        gia: endereco.gia,
                        ddd: endereco.ddd,
                        siafi: endereco.siafi,
                        numero: Math.floor(Math.random() * 1000) + 1,
                        cidade: nomeCidade,
                        estadoSigla: siglaEstado,
                    });
                } else {
                    reject(new Error('Endereço não encontrado'));
                }
            })
            .catch(error => reject(error));
    });
}

function mostrarDados() {
    chrome.storage.local.get('pessoa', (result) => {
        const pessoa = result.pessoa;
        if (pessoa) {
            document.getElementById('nomeInput').value = pessoa.nome;
            document.getElementById('maeInput').value = pessoa.mae;
            document.getElementById('paiInput').value = pessoa.pai;
            document.getElementById('siteInput').value = pessoa.site;
            document.getElementById('emailInput').value = pessoa.email;
            document.getElementById('senhaInput').value = pessoa.senha;
            document.getElementById('rgInput').value = pessoa.rg;
            document.getElementById('cpfInput').value = pessoa.cpf;
            document.getElementById('telefoneInput').value = pessoa.telefone;
            document.getElementById('celularInput').value = pessoa.celular;
            document.getElementById('dataNascimentoInput').value = pessoa.dataNascimento;
            document.getElementById('cepInput').value = pessoa.endereco.cep;
            document.getElementById('logradouroInput').value = pessoa.endereco.logradouro;
            document.getElementById('complementoInput').value = pessoa.endereco.complemento;
            document.getElementById('numeroInput').value = pessoa.endereco.numero;
            document.getElementById('bairroInput').value = pessoa.endereco.bairro;
            document.getElementById('cidadeInput').value = pessoa.endereco.cidade;
            document.getElementById('estadoInput').value = pessoa.endereco.estado;
            document.getElementById('estadoSiglaInput').value = pessoa.endereco.estadoSigla;
            document.getElementById('usuarioInput').value = pessoa.usuario;
            document.getElementById('signoInput').value = pessoa.signo;
            document.getElementById('tipoSanguineoInput').value = pessoa.tipoSanguineo;
            document.getElementById('alturaInput').value = pessoa.altura;
            document.getElementById('pesoInput').value = pessoa.peso;
        }
    });
}

function gerarEmail(nomeCompleto) {
    const nomeSobrenome = nomeCompleto.split(' ');
    const nome = nomeSobrenome[0].toLowerCase();
    const sobrenome = nomeSobrenome[nomeSobrenome.length - 1].toLowerCase();
    const dominios = ['gmail.com', 'hotmail.com', 'yahoo.com', 'outlook.com', 'aol.com', 'icloud.com', 'email.com'];
    const dominioAleatorio = dominios[Math.floor(Math.random() * dominios.length)];
    return `${nome}.${sobrenome}@${dominioAleatorio}`;
}


document.addEventListener('DOMContentLoaded', function() {
    mostrarDados();
});

document.getElementById('btnGerar').addEventListener('click', function() {
    gerarPessoa();
});

document.getElementById('btnCopiarNome').addEventListener('click', function() {
    copiarTexto('nomeInput');
});

document.getElementById('btnCopiarMae').addEventListener('click', function() {
    copiarTexto('maeInput');
});

document.getElementById('btnCopiarPai').addEventListener('click', function() {
    copiarTexto('paiInput');
});

document.getElementById('btnCopiarSite').addEventListener('click', function() {
    copiarTexto('siteInput');
});

document.getElementById('btnCopiarEmail').addEventListener('click', function() {
    copiarTexto('emailInput');
});

document.getElementById('btnCopiarSenha').addEventListener('click', function() {
    copiarTexto('senhaInput');
});

document.getElementById('btnCopiarRG').addEventListener('click', function() {
    copiarTexto('rgInput');
});

document.getElementById('btnCopiarCPF').addEventListener('click', function() {
    copiarTexto('cpfInput');
});

document.getElementById('btnCopiarTelefone').addEventListener('click', function() {
    copiarTexto('telefoneInput');
});

document.getElementById('btnCopiarCelular').addEventListener('click', function() {
    copiarTexto('celularInput');
});

document.getElementById('btnCopiarDataNascimento').addEventListener('click', function() {
    copiarTexto('dataNascimentoInput');
});

document.getElementById('btnCopiarCep').addEventListener('click', function() {
    copiarTexto('cepInput');
});

document.getElementById('btnCopiarLogradouro').addEventListener('click', function() {
    copiarTexto('logradouroInput');
});

document.getElementById('btnCopiarComplemento').addEventListener('click', function() {
    copiarTexto('complementoInput');
});

document.getElementById('btnCopiarNumero').addEventListener('click', function() {
    copiarTexto('numeroInput');
});

document.getElementById('btnCopiarBairro').addEventListener('click', function() {
    copiarTexto('bairroInput');
});

document.getElementById('btnCopiarCidade').addEventListener('click', function() {
    copiarTexto('cidadeInput');
});

document.getElementById('btnCopiarEstado').addEventListener('click', function() {
    copiarTexto('estadoInput');
});

document.getElementById('btnCopiarEstadoSigla').addEventListener('click', function() {
    copiarTexto('estadoSiglaInput');
});

document.getElementById('btnCopiarUsuario').addEventListener('click', function() {
    copiarTexto('usuarioInput');
});

document.getElementById('btnCopiarSigno').addEventListener('click', function() {
    copiarTexto('signoInput');
});

document.getElementById('btnCopiarTipoSanguineo').addEventListener('click', function() {
    copiarTexto('tipoSanguineoInput');
});

document.getElementById('btnCopiarAltura').addEventListener('click', function() {
    copiarTexto('alturaInput');
});

document.getElementById('btnCopiarPeso').addEventListener('click', function() {
    copiarTexto('pesoInput');
});


