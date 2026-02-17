/**
 * Gestão de Interface do Usuário - Sistema de Hotel.
 * Decisão: Uso de Vanilla JS para evitar dependências pesadas e manter o código portável.
 * Princípios: Separação de Preocupações (SoC) entre manipulação de DOM e chamadas de API.
 */

const API_URL = 'http://localhost:8080/api/quartos';

// Elementos DOM (Cache para performance)
const DOM = {
    btnNovoQuarto: document.getElementById('btnNovoQuarto'),
    btnCancelar: document.getElementById('btnCancelar'),
    formSection: document.getElementById('formQuartoSection'),
    form: document.getElementById('quartoForm'),
    tableBody: document.getElementById('listaQuartosBody'),
    formTitle: document.getElementById('formTitle'),
    editId: document.getElementById('editOriginalNumero'),
    inputs: {
        numero: document.getElementById('numero'),
        capacidade: document.getElementById('capacidade'),
        tipo: document.getElementById('tipo'),
        preco: document.getElementById('precoDiaria'),
        frigobar: document.getElementById('temFrigobar'),
        cafe: document.getElementById('temCafeIncluso'),
        ar: document.getElementById('temArCondicionado'),
        tv: document.getElementById('temTV'),
        camas: () => document.querySelectorAll('input[name="tiposCama"]')
    }
};

// Event Listeners
DOM.btnNovoQuarto.addEventListener('click', () => toggleForm(true));
DOM.btnCancelar.addEventListener('click', () => toggleForm(false));
DOM.form.addEventListener('submit', handleFormSubmit);

/**
 * Controla a exibição do formulário.
 * @param {boolean} show 
 */
function toggleForm(show) {
    if (show) {
        resetForm();
        DOM.formTitle.innerText = "Cadastrar Novo Quarto";
        DOM.formSection.classList.remove('hidden');
    } else {
        DOM.formSection.classList.add('hidden');
    }
}

/**
 * Busca e renderiza a lista de quartos.
 * SRP: Foca apenas na orquestração da listagem.
 */
async function listarQuartos() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Erro ao buscar dados do servidor");
        const quartos = await response.json();
        renderQuartos(quartos);
    } catch (error) {
        showError("Falha na conexão: " + error.message);
    }
}

/**
 * Manipula a renderização da tabela.
 * @param {Array} quartos 
 */
function renderQuartos(quartos) {
    DOM.tableBody.innerHTML = '';
    quartos.forEach(q => {
        const tr = document.createElement('tr');
        tr.className = 'hover-row';
        tr.innerHTML = `
            <td><strong>#${q.numero}</strong></td>
            <td>${q.tipo}</td>
            <td>R$ ${q.precoDiaria.toFixed(2)}</td>
            <td><span class="badge badge-${q.disponibilidade}">${q.disponibilidade}</span></td>
            <td>
                <button onclick="prepararEdicao('${q.numero}')" class="btn btn-outline">✏️ Editar</button>
            </td>
        `;
        DOM.tableBody.appendChild(tr);
    });
}

/**
 * Processa o envio do formulário (Create/Update).
 */
async function handleFormSubmit(e) {
    e.preventDefault();

    const selectedCamas = Array.from(DOM.inputs.camas())
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    const quartoData = {
        numero: DOM.inputs.numero.value,
        capacidade: parseInt(DOM.inputs.capacidade.value),
        tipo: DOM.inputs.tipo.value,
        precoDiaria: parseFloat(DOM.inputs.preco.value),
        temFrigobar: DOM.inputs.frigobar.checked,
        temCafeIncluso: DOM.inputs.cafe.checked,
        temArCondicionado: DOM.inputs.ar.checked,
        temTV: DOM.inputs.tv.checked,
        tiposCama: selectedCamas
    };

    const isEdit = DOM.editId.value !== "";
    const url = isEdit ? `${API_URL}/${DOM.editId.value}` : API_URL;
    const method = isEdit ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quartoData)
        });

        if (response.ok) {
            toggleForm(false);
            listarQuartos();
        } else {
            const error = await response.json();
            showError(error.message || "Erro ao salvar dados");
        }
    } catch (error) {
        showError("Erro de comunicação com a API");
    }
}

/**
 * Preenche o formulário para edição.
 * @param {string} numero 
 */
async function prepararEdicao(numero) {
    try {
        const response = await fetch(API_URL);
        const quartos = await response.json();
        const q = quartos.find(item => item.numero === numero);

        if (q) {
            DOM.formTitle.innerText = "Editar Quarto #" + q.numero;
            DOM.editId.value = q.numero;
            
            DOM.inputs.numero.value = q.numero;
            DOM.inputs.capacidade.value = q.capacidade;
            DOM.inputs.tipo.value = q.tipo;
            DOM.inputs.preco.value = q.precoDiaria;
            DOM.inputs.frigobar.checked = q.temFrigobar;
            DOM.inputs.cafe.checked = q.temCafeIncluso;
            DOM.inputs.ar.checked = q.temArCondicionado;
            DOM.inputs.tv.checked = q.temTV;

            DOM.inputs.camas().forEach(cb => {
                cb.checked = q.tiposCama.includes(cb.value);
            });

            DOM.formSection.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } catch (error) {
        showError("Erro ao carregar quarto para edição");
    }
}

function resetForm() {
    DOM.form.reset();
    DOM.editId.value = "";
}

function showError(msg) {
    console.error(msg);
    alert(msg);
}

// Inicialização
document.addEventListener('DOMContentLoaded', listarQuartos);
