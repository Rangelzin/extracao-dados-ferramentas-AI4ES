const API_URL = 'http://localhost:8080/api/quartos';

// DOM Elements
const form = document.getElementById('quartoForm');
const quartosGrid = document.getElementById('quartosGrid');
const loading = document.getElementById('loading');
const toast = document.getElementById('toast');
const btnAtualizar = document.getElementById('btnAtualizar');

// Config
const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

// --- Actions ---

/**
 * Fetch and display rooms
 */
async function fetchQuartos() {
    showLoading(true);
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Falha ao buscar quartos');
        
        const quartos = await response.json();
        renderQuartos(quartos);
    } catch (error) {
        showToast('Erro ao carregar quartos: ' + error.message, true);
    } finally {
        showLoading(false);
    }
}

/**
 * Create a new room
 */
async function createQuarto(event) {
    event.preventDefault();
    
    // Gather form data
    const numero = parseInt(document.getElementById('numero').value);
    const capacidade = parseInt(document.getElementById('capacidade').value);
    const tipo = document.getElementById('tipo').value;
    const precoPorHora = parseFloat(document.getElementById('preco').value);
    
    // Build camas array (simple version for now: reads the first cama inputs)
    // To support multiple dynamic beds, we would loop through .cama-item elements
    const camasElements = document.querySelectorAll('.cama-item');
    const camas = Array.from(camasElements).map(el => ({
        tipo: el.querySelector('.cama-tipo').value,
        quantidade: parseInt(el.querySelector('.cama-qtd').value)
    }));

    const payload = {
        numero,
        capacidade,
        tipo,
        precoPorHora,
        camas
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text(); // Backend might return error message
            throw new Error(errorText || 'Erro ao criar quarto');
        }

        showToast('Quarto criado com sucesso!');
        form.reset();
        fetchQuartos(); // Refresh list
    } catch (error) {
        showToast('Erro: ' + error.message, true);
        console.error(error);
    }
}

// --- Rendering ---

function renderQuartos(quartos) {
    quartosGrid.innerHTML = '';
    
    if (quartos.length === 0) {
        quartosGrid.innerHTML = '<p style="color: var(--text-muted)">Nenhum quarto cadastrado.</p>';
        return;
    }

    quartos.forEach(q => {
        const card = document.createElement('div');
        card.className = 'quarto-card';
        
        // Summary of beds
        const camasResumo = q.camas 
            ? q.camas.map(c => `${c.tipo}`).join(', ') 
            : 'Sem camas definidas';

        card.innerHTML = `
            <div class="quarto-header">
                <span class="quarto-number">Nº ${q.numero}</span>
                <span class="quarto-status status-${q.status}">${q.status}</span>
            </div>
            <div class="quarto-details">
                <p><strong>Tipo:</strong> ${q.tipo}</p>
                <p><strong>Capacidade:</strong> ${q.capacidade} pessoas</p>
                <p><strong>Camas:</strong> ${camasResumo}</p>
                <span class="price-tag">${formatCurrency(q.precoPorHora)} / hora</span>
            </div>
        `;
        quartosGrid.appendChild(card);
    });
}

// --- UI Helpers ---

function showLoading(show) {
    if (show) loading.classList.remove('hidden');
    else loading.classList.add('hidden');
}

function showToast(message, isError = false) {
    toast.textContent = message;
    toast.style.backgroundColor = isError ? 'var(--danger-color)' : 'var(--text-color)';
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// --- Listeners ---

form.addEventListener('submit', createQuarto);
btnAtualizar.addEventListener('click', fetchQuartos);

// Init
document.addEventListener('DOMContentLoaded', fetchQuartos);
