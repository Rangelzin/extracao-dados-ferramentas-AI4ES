document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("room-form");
    const roomList = document.getElementById("room-list");
    const fetchRoomsButton = document.getElementById("fetch-rooms");
    const formFeedback = document.getElementById("form-feedback");

    const API_URL = "http://localhost:8080/quartos";

    const showError = (elementId, message) => {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = "block";
    };

    const clearErrors = () => {
        document.querySelectorAll(".error-message").forEach(el => {
            el.style.display = "none";
        });
    };

    const showFeedback = (message, isSuccess = true) => {
        formFeedback.textContent = message;
        formFeedback.className = `feedback ${isSuccess ? "success" : "error"}`;
        formFeedback.style.display = "block";
    };

    const fetchRooms = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error("Erro ao buscar quartos: " + response.statusText);
            }
            const rooms = await response.json();

            roomList.innerHTML = "";
            rooms.forEach(room => {
                const li = document.createElement("li");
                li.textContent = `ID: ${room.id}, Tipo: ${room.tipo}, Preço: R$${room.preco.toFixed(2)}, Camas: ${room.camas.join(", ")}, Disponibilidade: ${room.disponibilidade}`;
                roomList.appendChild(li);
            });
        } catch (error) {
            console.error("Erro ao buscar quartos:", error);
            showFeedback("Não foi possível carregar a lista de quartos. Tente novamente mais tarde.", false);
        }
    };

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        clearErrors();

        const formData = new FormData(form);
        const roomData = {
            id: parseInt(formData.get("id")),
            tipo: formData.get("tipo"),
            preco: parseFloat(formData.get("preco")),
            camas: formData.get("camas").split(",").map(cama => cama.trim()),
            disponibilidade: formData.get("disponibilidade")
        };

        if (isNaN(roomData.id) || roomData.id <= 0) {
            showError("error-id", "ID deve ser um número positivo.");
            return;
        }
        if (!roomData.tipo) {
            showError("error-type", "Tipo é obrigatório.");
            return;
        }
        if (isNaN(roomData.preco) || roomData.preco <= 0) {
            showError("error-price", "Preço deve ser um número positivo.");
            return;
        }
        if (!roomData.camas.length) {
            showError("error-beds", "Camas devem ser especificadas.");
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(roomData)
            });

            if (response.ok) {
                showFeedback("Quarto cadastrado com sucesso!");
                form.reset();
                fetchRooms();
            } else {
                const errorData = await response.json();
                showFeedback("Erro ao cadastrar quarto: " + (errorData.message || "Erro desconhecido"), false);
            }
        } catch (error) {
            console.error("Erro ao cadastrar quarto:", error);
            showFeedback("Não foi possível cadastrar o quarto. Verifique sua conexão e tente novamente.", false);
        }
    });

    fetchRoomsButton.addEventListener("click", fetchRooms);
    fetchRooms();
});