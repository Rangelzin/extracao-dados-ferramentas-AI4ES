const API_URL = 'http://localhost:8080/api/quartos';

// Elementos DOM
const btnNovoQuarto = document.getElementById('btnNovoQuarto');
const btnCancelar = document.getElementById('btnCancelar');
const formQuartoSection = document.getElementById('formQuartoSection');
const quartoForm = document.getElementById('quartoForm');
const listaQuartosBody = document.getElementById('listaQuartosBody');
const formTitle = document.getElementById('formTitle');
const editOriginalNumero = document.getElementById('editOriginalNumero');

// Event Listeners
btnNovoQuarto.addEventListener('click', () => {
    resetForm();
    formTitle.innerText = "Cadastrar Novo Quarto";
    formQuartoSection.classList.remove('hidden');
});

btnCancelar.addEventListener('click', () => {
    formQuartoSection.classList.add('hidden');
});

quartoForm.addEventListener('submit', handleFormSubmit);

// Funções Principais
async function listarQuartos() {
    try {
        const response = await fetch(API_URL);
        const quartos = await response.json();
        renderQuartos(quartos);
    } catch (error) {
        console.error("Erro ao listar quartos:", error);
    }
}

function renderQuartos(quartos) {
    listaQuartosBody.innerHTML = '';
    quartos.forEach(q => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>#${q.numero}</strong></td>
            <td>${q.tipo}</td>
            <td>R$ ${q.precoDiaria.toFixed(2)}</td>
            <td><span class="badge badge-${q.disponibilidade}">${q.disponibilidade}</span></td>
            <td>
                <button onclick="prepararEdicao('${q.numero}')" class="btn btn-outline" style="padding: 0.5rem 1rem;">✏️ Editar</button>
            </td>
        `;
        listaQuartosBody.appendChild(tr);
    });
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const selectedCamas = Array.from(document.querySelectorAll('input[name="tiposCama"]:checked'))
        .map(cb => cb.value);

    const quartoData = {
        numero: document.getElementById('numero').value,
        capacidade: parseInt(document.getElementById('capacidade').value),
        tipo: document.getElementById('tipo').value,
        precoDiaria: parseFloat(document.getElementById('precoDiaria').value),
        temFrigobar: document.getElementById('temFrigobar').checked,
        temCafeIncluso: document.getElementById('temCafeIncluso').checked,
        temArCondicionado: document.getElementById('temArCondicionado').checked,
        temTV: document.getElementById('temTV').checked,
        tiposCama: selectedCamas
    };

    const isEdit = editOriginalNumero.value !== "";
    const url = isEdit ? `${API_URL}/${editOriginalNumero.value}` : API_URL;
    const method = isEdit ? 'PUT' : 'POST';

    try {
        const response = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quartoData)
        });

        if (response.ok) {
            formQuartoSection.classList.add('hidden');
            listarQuartos();
            resetForm();
        } else {
            const error = await response.json();
            alert("Erro: " + (error.message || "Falha ao salvar quarto"));
        }
    } catch (error) {
        console.error("Erro ao salvar:", error);
        alert("Erro de conexão com o servidor");
    }
}

async function prepararEdicao(numero) {
    try {
        // Como o backend atualmente não tem um GET /numero (vamos listar tudo e achar o objeto localmente para simplificar ou adaptar o fetch)
        const response = await fetch(API_URL);
        const quartos = await response.json();
        const q = quartos.find(item => item.numero === numero);

        if (q) {
            formTitle.innerText = "Editar Quarto #" + q.numero;
            editOriginalNumero.value = q.numero;
            
            document.getElementById('numero').value = q.numero;
            document.getElementById('capacidade').value = q.capacidade;
            document.getElementById('tipo').value = q.tipo;
            document.getElementById('precoDiaria').value = q.precoDiaria;
            document.getElementById('temFrigobar').checked = q.temFrigobar;
            document.getElementById('temCafeIncluso').checked = q.temCafeIncluso;
            document.getElementById('temArCondicionado').checked = q.temArCondicionado;
            document.getElementById('temTV').checked = q.temTV;

            // Limpar e marcar camas
            document.querySelectorAll('input[name="tiposCama"]').forEach(cb => {
                cb.checked = q.tiposCama.includes(cb.value);
            });

            formQuartoSection.classList.remove('hidden');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    } catch (error) {
        console.error("Erro ao carregar dados para edição:", error);
    }
}

function resetForm() {
    quartoForm.reset();
    editOriginalNumero.value = "";
    document.querySelectorAll('input[name="tiposCama"]').forEach(cb => cb.checked = false);
}

// Inicialização
listarQuartos();
