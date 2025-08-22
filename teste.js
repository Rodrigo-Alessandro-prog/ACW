const endpoint = 'https://68913f6d447ff4f11fbc1b0a.mockapi.io/api/v1/contato';

const form = document.getElementById('depoimentoForm');
const lista = document.getElementById('depFake');

// Carrega todos os depoimentos da API e exibe na lista
async function carregarDepoimentos() {
    lista.innerHTML = '';
    try {
        const res = await fetch(endpoint);
        const depoimentos = await res.json();
        depoimentos.forEach(dep => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${dep.nome}:</strong> ${dep.depoimento} `;
            const btnRemover = document.createElement('button');
            btnRemover.textContent = 'Remover';
            btnRemover.onclick = () => removerDepoimento(dep.id);
            li.appendChild(btnRemover);
            lista.appendChild(li);
        });
    } catch (error) {
        lista.innerHTML = '<li>Erro ao carregar depoimentos.</li>';
    }
}

// Envia um novo depoimento para a API
form.onsubmit = async (e) => {
    e.preventDefault();
    const nome = document.getElementById('nomeDep').value.trim();
    const depoimento = document.getElementById('depoimento').value.trim();
    if (!nome || !depoimento) return;
    try {
        await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, depoimento })
        });
        form.reset();
        carregarDepoimentos();
    } catch (error) {
        alert('Erro ao enviar depoimento.');
    }
};

// Remove um depoimento da API
async function removerDepoimento(id) {
    try {
        await fetch(`${endpoint}/${id}`, { method: 'DELETE' });
        carregarDepoimentos();
    } catch (error) {
        alert('Erro ao remover depoimento.');
    }
}

// Inicializa a lista ao carregar a página
carregarDepoimentos();