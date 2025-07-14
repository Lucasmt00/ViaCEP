// Restaurar dados do localStorage ao abrir a página
window.addEventListener('DOMContentLoaded', () => {
    const campos = ['nome', 'cep', 'rua', 'bairro', 'cidade', 'estado'];
    campos.forEach(campo => {
        const valor = localStorage.getItem(campo);
        if (valor) {
            document.getElementById(campo).value = valor;
        }
    });
});

// Buscar endereço pelo CEP
document.getElementById("cep").addEventListener("blur", function() {
    const cep = this.value.replace(/\D/g, '');

    if (cep.length !== 8) {
        alert("CEP inválido!");
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert("CEP não encontrado!");
                return;
            }

            document.getElementById("rua").value = data.logradouro;
            document.getElementById("bairro").value = data.bairro;
            document.getElementById("cidade").value = data.localidade;
            document.getElementById("estado").value = data.uf;

            salvarNoLocalStorage();
        })
        .catch(() => alert("Erro ao buscar o CEP."));
});

// Salvar dados ao digitar
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", salvarNoLocalStorage);
});

// Função para salvar no localStorage
function salvarNoLocalStorage() {
    const campos = ['nome', 'cep', 'rua', 'bairro', 'cidade', 'estado'];
    campos.forEach(campo => {
        const valor = document.getElementById(campo).value;
        localStorage.setItem(campo, valor);
    });
}
