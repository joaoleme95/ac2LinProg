document.addEventListener("DOMContentLoaded", () => {
    const positionSelect = document.getElementById("position");
    const sectorSelect = document.getElementById("sector");
    const agreementSelect = document.getElementById("agreement");

    const salaryInput = document.getElementById("salary");
    const sectorNameInput = document.getElementById("sectorName");
    const agreementValueHolderInput = document.getElementById("agreementValueHolder");
    const agreementValueDependentInput = document.getElementById("agreementValueDependent");

    Promise.all([
        fetch('https://aulalp2024.free.beeceptor.com/setor').then(response => response.json()),
        fetch('https://aulalp2024.free.beeceptor.com/cargo').then(response => response.json()),
        fetch('https://aulalp2024.free.beeceptor.com/convenio').then(response => response.json())
    ]).then(([sectors, positions, agreements]) => {
        sectors.forEach(sector => {
            const option = document.createElement("option");
            option.value = sector.sigla;
            option.textContent = sector.sigla;
            option.dataset.name = sector.nome;
            sectorSelect.appendChild(option);
        });

        positions.forEach(position => {
            const option = document.createElement("option");
            option.value = position.nome;
            option.textContent = position.nome;
            option.dataset.salary = position.salario;
            positionSelect.appendChild(option);
        });

        agreements.forEach(agreement => {
            const option = document.createElement("option");
            option.value = agreement.nome;
            option.textContent = agreement.nome;
            option.dataset.valueHolder = agreement.valor_titular;
            option.dataset.valueDependent = agreement.valor_dependente;
            agreementSelect.appendChild(option);
        });

        sectorSelect.addEventListener("change", () => {
            const selectedOption = sectorSelect.selectedOptions[0];
            sectorNameInput.value = selectedOption ? selectedOption.dataset.name : '';
        });

        positionSelect.addEventListener("change", () => {
            const selectedOption = positionSelect.selectedOptions[0];
            salaryInput.value = selectedOption ? selectedOption.dataset.salary : '';
        });

        agreementSelect.addEventListener("change", () => {
            const selectedOption = agreementSelect.selectedOptions[0];
            agreementValueHolderInput.value = selectedOption ? selectedOption.dataset.valueHolder : '';
            agreementValueDependentInput.value = selectedOption ? selectedOption.dataset.valueDependent : '';
        });
    }).catch(error => {
        console.error("Erro ao carregar dados:", error);
    });

    document.getElementById("employeeForm").addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = {
            nome: document.getElementById("name").value,
            telefone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            cpf: document.getElementById("cpf").value,
            rg: document.getElementById("rg").value,
            cargo: document.getElementById("position").value,
            salario: document.getElementById("salary").value,
            setor: document.getElementById("sector").value,
            setor_nome: document.getElementById("sectorName").value,
            convenio: document.getElementById("agreement").value,
            valor_titular: document.getElementById("agreementValueHolder").value,
            valor_dependente: document.getElementById("agreementValueDependent").value
        };

        fetch('https://66266bc2052332d55322d1f0.mockapi.io/funcionario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                alert('Funcionário cadastrado com sucesso!');
                document.getElementById("employeeForm").reset();
            })
            .catch(error => {
                console.error("Erro ao salvar funcionário:", error);
                alert('Erro ao cadastrar funcionário.');
            });
    });
});
