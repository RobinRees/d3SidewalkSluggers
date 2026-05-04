function renderCharacterSelect(participants) {
  const container = document.getElementById("characterSelect");
  const preview = document.getElementById("characterFullP1");

  participants.forEach((p) => {
    const cell = document.createElement("div");
    cell.classList.add("characterCell");

    if (p.profilePicture) {
      const img = document.createElement("img");
      img.src = p.profilePicture;
      cell.appendChild(img);
    }

    cell.addEventListener("mouseenter", () => {
      if (p.fullImage) {
        preview.innerHTML = `
                            <div class="previewWrapper">
                                <img src="${p.fullImage}">
                                <div class="previewName">${p.displayName}</div>
                            </div>
`;
      }
    });

    cell.addEventListener("mouseleave", () => {
      preview.innerHTML = "";
    });

    container.appendChild(cell);
  });
}

renderCharacterSelect(participants);
