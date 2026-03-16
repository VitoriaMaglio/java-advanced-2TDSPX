const API_URL = "http://localhost:8080/dragons";

window.tailwind = window.tailwind || {};
window.tailwind.config = {
	theme: {
		extend: {
			fontFamily: {
				crown: ["Cinzel", "serif"],
				scroll: ["Crimson Text", "serif"]
			},
			colors: {
				dragon: {
					coal: "#0b0a0d",
					ash: "#17151b",
					ember: "#7a1010",
					gold: "#c5a15b"
				}
			}
		}
	}
};

function formatNumber(value) {
	if (typeof value !== "number") return "Nao informado";
	return value.toLocaleString("pt-BR");
}

function createDragonCard(dragon) {
	const possuiMontador =
		typeof dragon.possuiMontador === "boolean"
			? dragon.possuiMontador
			: Boolean(dragon["possuiMontador"]);

	const card = document.createElement("article");
	card.className =
		"rounded-2xl border border-amber-700/30 bg-gradient-to-b from-zinc-900 to-zinc-950 p-5 shadow-[0_14px_30px_rgba(0,0,0,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-500/60 hover:shadow-[0_20px_35px_rgba(0,0,0,0.6)]";

	card.innerHTML = `
		<h2 class="mb-3 border-b border-amber-700/40 pb-2 font-crown text-2xl tracking-wide text-amber-300">${dragon.nome ?? "Sem nome"}</h2>
		<div class="grid gap-1.5 font-scroll text-base text-zinc-300">
			<p><strong class="font-semibold text-zinc-100">ID:</strong> ${dragon.id ?? "Nao informado"}</p>
			<p><strong class="font-semibold text-zinc-100">Cor:</strong> ${dragon.cor ?? "Nao informado"}</p>
			<p><strong class="font-semibold text-zinc-100">Poder de fogo:</strong> ${formatNumber(dragon.poderDeFogo)}</p>
			<p><strong class="font-semibold text-zinc-100">Peso:</strong> ${formatNumber(dragon.peso)} kg</p>
			<p><strong class="font-semibold text-zinc-100">Altura:</strong> ${formatNumber(dragon.altura)} m</p>
			<p><strong class="font-semibold text-zinc-100">Possui montador:</strong> ${possuiMontador ? "Sim" : "Nao"}</p>
		</div>
		<div class="mt-4 flex justify-end gap-2">
			<a href="edit.html?id=${encodeURIComponent(dragon.id ?? "")}" class="inline-flex items-center justify-center rounded-lg border border-amber-500/40 bg-amber-800/30 px-3 py-1.5 font-crown text-xs uppercase tracking-[0.14em] text-amber-200 transition hover:border-amber-400 hover:bg-amber-700/50">Editar</a>
			<button type="button" data-action="delete" class="inline-flex items-center justify-center rounded-lg border border-red-500/40 bg-red-900/40 px-3 py-1.5 font-crown text-xs uppercase tracking-[0.14em] text-red-200 transition hover:border-red-400 hover:bg-red-800/50">Apagar</button>
		</div>
	`;

	const deleteButton = card.querySelector('[data-action="delete"]');
	deleteButton?.addEventListener("click", () => deleteDragon(dragon.id));

	return card;
}

async function deleteDragon(dragonId) {
	const status = document.getElementById("status");

	if (!dragonId) {
		status.textContent = "Nao foi possivel apagar: id invalido.";
		return;
	}

	status.textContent = "Apagando dragao...";

	try {
		const response = await fetch(`${API_URL}/${dragonId}`, {
			method: "DELETE"
		});

		if (response.status !== 204) {
			throw new Error(`Status inesperado no DELETE: ${response.status} (esperado: 204)`);
		}

		await loadDragons();
	} catch (error) {
		status.textContent = `Nao foi possivel apagar o dragao. ${error.message}`;
		console.error("Falha ao apagar dragao:", error);
	}
}

async function loadDragons() {
	const list = document.getElementById("dragons-list");
	const status = document.getElementById("status");

	try {
		const response = await fetch(API_URL);

		if (!response.ok) {
			throw new Error(`Erro HTTP: ${response.status}`);
		}

		const dragons = await response.json();

		if (!Array.isArray(dragons) || dragons.length === 0) {
			status.textContent = "Nenhum dragão encontrado.";
			return;
		}

		list.innerHTML = "";
		dragons.forEach((dragon) => {
			list.appendChild(createDragonCard(dragon));
		});
		status.textContent = `${dragons.length} dragões carregados.`;
	} catch (error) {
		status.textContent = "Nao foi possivel carregar os dragões da API.";
		console.error("Falha ao buscar dragões:", error);
	}
}

function initFormPage() {
	const form = document.getElementById("dragon-form");
	if (!form) return;

	const formStatus = document.getElementById("form-status");

	form.addEventListener("submit", async (event) => {
		event.preventDefault();
		formStatus.textContent = "Enviando cadastro...";

		const payload = {
			nome: form.nome.value.trim(),
			cor: form.cor.value.trim(),
			poderDeFogo: Number(form.poderDeFogo.value),
			peso: Number(form.peso.value),
			altura: Number(form.altura.value),
			possuiMontador: form.possuiMontador.checked
		};

		try {
			const response = await fetch(API_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(payload)
			});

			if (response.status !== 201) {
				throw new Error(`Status inesperado no POST: ${response.status} (esperado: 201)`);
			}

			window.location.href = "index.html";
		} catch (error) {
			console.error("Falha ao cadastrar dragao:", error);
			formStatus.textContent = `Nao foi possivel cadastrar o dragao. ${error.message}`;
		}
	});
}

function fillDragonForm(form, dragon) {
	form.nome.value = dragon.nome ?? "";
	form.cor.value = dragon.cor ?? "";
	form.poderDeFogo.value = dragon.poderDeFogo ?? "";
	form.peso.value = dragon.peso ?? "";
	form.altura.value = dragon.altura ?? "";
	form.possuiMontador.checked =
		typeof dragon.possuiMontador === "boolean"
			? dragon.possuiMontador
			: Boolean(dragon["possuiMontador"]);
}

function getDragonPayloadFromForm(form) {
	return {
		nome: form.nome.value.trim(),
		cor: form.cor.value.trim(),
		poderDeFogo: Number(form.poderDeFogo.value),
		peso: Number(form.peso.value),
		altura: Number(form.altura.value),
		possuiMontador: form.possuiMontador.checked
	};
}

async function initEditPage() {
	const form = document.getElementById("edit-dragon-form");
	if (!form) return;

	const status = document.getElementById("edit-status");
	const dragonIdLabel = document.getElementById("dragon-id-label");
	const dragonId = new URLSearchParams(window.location.search).get("id");

	if (!dragonId) {
		status.textContent = "ID do dragao nao informado.";
		form.querySelector("button[type='submit']")?.setAttribute("disabled", "true");
		return;
	}

	dragonIdLabel.textContent = `ID: ${dragonId}`;
	status.textContent = "Carregando dados do dragao...";

	try {
		const response = await fetch(`${API_URL}/${dragonId}`);
		if (!response.ok) {
			throw new Error(`Erro HTTP: ${response.status}`);
		}

		const dragon = await response.json();
		fillDragonForm(form, dragon);
		status.textContent = "Dados carregados.";
	} catch (error) {
		status.textContent = "Nao foi possivel carregar os dados do dragao.";
		console.error("Falha ao buscar dragao para edicao:", error);
		return;
	}

	form.addEventListener("submit", async (event) => {
		event.preventDefault();
		status.textContent = "Salvando alteracoes...";

		try {
			const response = await fetch(`${API_URL}/${dragonId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(getDragonPayloadFromForm(form))
			});

			if (!response.ok) {
				throw new Error(`Erro HTTP: ${response.status}`);
			}

			window.location.href = "index.html";
		} catch (error) {
			status.textContent = "Nao foi possivel salvar as alteracoes.";
			console.error("Falha ao editar dragao:", error);
		}
	});
}

document.addEventListener("DOMContentLoaded", () => {
	if (document.getElementById("dragons-list")) {
		loadDragons();
	}

	initFormPage();
	initEditPage();
});
