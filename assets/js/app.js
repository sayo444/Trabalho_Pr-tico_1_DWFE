const dados = { jogos: [
  { id: 1, nome: "The Last of Us Part 1", descricao: "Sobrevivência emocionante em um mundo pós-apocalíptico.", genero: "Ação", plataforma: "PlayStation, PC", nota: 89, ano: 2022, destaque: true, imagem: "the last of us part 1.jpg",
    fotos: [{ titulo: "Joel e Ellie", imagem: "the last of us part 1 um.jpg" }, { titulo: "Joel, Ellie e Tess", imagem: "the last of us part 1 dois.jpg" }] },
  { id: 2, nome: "The Last of Us Part 2", descricao: "Continuação intensa sobre vingança e perda.", genero: "Ação", plataforma: "PlayStation, PC", nota: 93, ano: 2020, destaque: false, imagem: "the last of us part 2.jpg",
    fotos: [{ titulo: "Ellie", imagem: "the last of us part 2 um.jpg" }, { titulo: "Abby", imagem: "the last of us part 2 dois.jpg" }] },
  { id: 3, nome: "Red Dead Redemption 2", descricao: "Faroeste épico com um mundo aberto cheio de detalhes.", genero: "Aventura", plataforma: "PlayStation, Xbox, PC", nota: 97, ano: 2018, destaque: true, imagem: "red dead redemption 2.jpg",
    fotos: [{ titulo: "Arthur Morgan e John Marston", imagem: "red dead redemption 2 um.jpg" }, { titulo: "Arthur Morgan e um Cavalo", imagem: "red dead redemption 2 dois.jpg" }] },
  { id: 4, nome: "Elden Ring", descricao: "RPG de ação em mundo aberto da FromSoftware.", genero: "RPG", plataforma: "PlayStation, Xbox, PC", nota: 96, ano: 2022, destaque: true, imagem: "elden ring.jpg",
    fotos: [{ titulo: "Térvore", imagem: "elden ring um.jpg" }, { titulo: "Malenia", imagem: "elden ring dois.jpg" }] },
  { id: 5, nome: "Resident Evil 2 Remake", descricao: "Remake do clássico de terror com visual moderno.", genero: "Ação", plataforma: "PlayStation, Xbox, PC", nota: 91, ano: 2019, destaque: false, imagem: "resident evil 2 remake.jpg",
    fotos: [{ titulo: "Leon S. Kennedy", imagem: "resident evil 2 remake um.jpg" }, { titulo: "Claire e Sherry", imagem: "resident evil 2 remake dois.jpg" }] },
  { id: 6, nome: "Cyberpunk 2077", descricao: "RPG futurista em Night City, cheio de escolhas.", genero: "RPG", plataforma: "PlayStation, Xbox, PC", nota: 86, ano: 2020, destaque: false, imagem: "cyberpunk 2077.jpg",
    fotos: [{ titulo: "V em Night City", imagem: "cyberpunk 2077 um.jpg" }, { titulo: "Judy Alvarez", imagem: "cyberpunk 2077 dois.jpg" }] },
  { id: 7, nome: "Zelda Breath of the Wild", descricao: "Aventura de mundo aberto com liberdade total de exploração.", genero: "Aventura", plataforma: "Nintendo", nota: 97, ano: 2017, destaque: true, imagem: "zelda breath of the wild.jpg",
    fotos: [{ titulo: "Link observando Hyrule", imagem: "zelda breath of the wild um.jpg" }, { titulo: "Zelda e Link com a Pedra Sheikah", imagem: "zelda breath of the wild dois.jpg" }] }
] };

const pasta = "assets/img/";

function mostrarCards(lista) {
  document.getElementById("lista-jogos").innerHTML = lista.map(j => `
    <div class="col-12 col-md-6 col-lg-4">
      <article class="catalogo_card h-100">
        <a href="detalhe.html?id=${j.id}"><img src="${pasta + j.imagem}" alt="Capa de ${j.nome}"></a>
        <h3><a href="detalhe.html?id=${j.id}">${j.nome}</a></h3>
        <p>Gênero: ${j.genero}</p>
        <p>Nota Metacritic: ${j.nota}</p>
        <p>Lançamento: ${j.ano}</p>
      </article>
    </div>`).join("") || "<p>Nenhum jogo encontrado.</p>";
}

function filtrar(evento) {
  evento.preventDefault();
  const nome = (document.getElementById("nome").value || document.getElementById("busca").value).toLowerCase();
  const plataforma = document.getElementById("plataforma").value;
  const genero = document.getElementById("genero").value;
  mostrarCards(dados.jogos.filter(j =>
    j.nome.toLowerCase().includes(nome) && j.plataforma.includes(plataforma) && (genero == "" || j.genero == genero)
  ));
}

if (document.getElementById("lista-jogos")) {
  const destaques = dados.jogos.filter(j => j.destaque);
  document.getElementById("slider-botoes").innerHTML = destaques.map((j, i) =>
    `<button type="button" data-bs-target="#slider" data-bs-slide-to="${i}" class="${i == 0 ? "active" : ""}"></button>`).join("");
  document.getElementById("slider-itens").innerHTML = destaques.map((j, i) => `
    <div class="carousel-item ${i == 0 ? "active" : ""}">
      <a href="detalhe.html?id=${j.id}"><img src="${pasta + j.imagem}" class="d-block w-100" alt="Capa de ${j.nome}"></a>
      <div class="carousel-caption"><h3>${j.nome}</h3><p>${j.descricao}</p></div>
    </div>`).join("");

  mostrarCards(dados.jogos);
  document.getElementById("form-acervo").addEventListener("submit", filtrar);
  document.getElementById("form-busca").addEventListener("submit", filtrar);
} else {
  const id = new URLSearchParams(location.search).get("id");
  const j = dados.jogos.find(jogo => jogo.id == id);
  document.getElementById("detalhe").innerHTML = !j ? "<p>Jogo não encontrado.</p>" : `
    <h2>Informações gerais</h2>
    <div class="row g-4 mb-5">
      <div class="col-12 col-md-4"><img src="${pasta + j.imagem}" class="foto" alt="Capa de ${j.nome}"></div>
      <div class="col-12 col-md-8">
        <h1>${j.nome}</h1>
        <p>${j.descricao}</p>
        <p><strong>Gênero:</strong> ${j.genero}</p>
        <p><strong>Plataformas:</strong> ${j.plataforma}</p>
        <p><strong>Lançamento:</strong> ${j.ano}</p>
        <p class="destaque_nota">Nota Metacritic: ${j.nota}</p>
      </div>
    </div>
    <h2>Fotos do jogo</h2>
    <div class="row g-4">${j.fotos.map(f => `
      <div class="col-12 col-md-6"><img src="${pasta + f.imagem}" class="foto" alt="${f.titulo}"><p>${f.titulo}</p></div>`).join("")}
    </div>`;
}