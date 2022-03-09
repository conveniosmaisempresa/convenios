let listaConvenios = [];

fetch(getJsonUrl())
  .then(response => response.json())
  .then(json => {
    listaConvenios = json;
    return listaConvenios;
  })
  .then(convenios => montarTabela(convenios));

function getJsonUrl() {
  let jsonUrl = window.location.href;

  if (jsonUrl.indexOf('localhost') >= 0 || jsonUrl.indexOf('127.0.0.1') >= 0) {
    return "../../convenios.json";
  }

  return jsonUrl + '/convenios.json';
}

function montarTabela(convenios) {
  const table = document.getElementById('convenios');
  table.removeChild(table.tBodies[0]);
  const tBody = document.createElement('tbody');

  convenios.forEach(convenio => {
    const tr = document.createElement('tr');

    const tdLocal = document.createElement('td');
    tdLocal.innerText = convenio.local;
    tr.appendChild(tdLocal);

    const tdNome = document.createElement('td');
    tdNome.innerText = convenio.nome;
    tr.appendChild(tdNome);

    const tdEndereco = document.createElement('td');
    tdEndereco.innerText = convenio.endereco;
    tr.appendChild(tdEndereco); 

    const tdTelefone = document.createElement('td');
    tdTelefone.innerText = convenio.telefone;
    tr.appendChild(tdTelefone);
    
    const tdPix = document.createElement('td');
    tdPix.innerText = convenio.pix;
    tr.appendChild(tdPix);

    const aPicpay = document.createElement('a');
    aPicpay.innerText = convenio.picpay;  
    aPicpay.setAttribute('href', convenio.picpay);

    const tdPicpay = document.createElement('td');
    tdPicpay.appendChild(aPicpay);
    tr.appendChild(tdPicpay);
    
    const tdIncentivo = document.createElement('td');
    tdIncentivo.innerText = convenio.incentivo;
    tr.appendChild(tdIncentivo);
    
    const tdMRC = document.createElement('td');
    tdMRC.innerText = convenio.motoristaResponsavelConvenio;
    tr.appendChild(tdMRC);

    tBody.appendChild(tr);

    table.appendChild(tBody);
  });
}

document.getElementById('buscar').addEventListener('click', function() {
  const filtro = document.getElementById('filtro').value;
  const listaFiltrada = listaConvenios.filter(convenio => {
    const achouNome = convenio.nome.toLowerCase().indexOf(filtro.toLowerCase()) >= 0;
    const achouLocal = convenio.local.toLowerCase().indexOf(filtro.toLowerCase()) >= 0;
    const achouTelefone = convenio.telefone.indexOf(filtro) >= 0;

    if (achouNome || achouLocal || achouTelefone) {
      return true;
    } 

    return false;
  });

  montarTabela(listaFiltrada);
});

const textbox = document.getElementById("filtro");
  textbox.addEventListener("keypress", function onEvent(event) {
    if (event.keyCode === 13) {
      document.getElementById("buscar").click();
    }
});