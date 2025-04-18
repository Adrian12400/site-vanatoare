// Funcție pentru a schimba imaginea pe hover
document.querySelectorAll('.produs-card').forEach(function(produs) {
    let images = produs.querySelectorAll('img');
    produs.addEventListener('mouseover', function() {
        images[0].style.display = 'none'; // Ascunde prima imagine
        images[1].style.display = 'block'; // Arată a doua imagine
    });
    produs.addEventListener('mouseout', function() {
        images[0].style.display = 'block'; // Arată prima imagine
        images[1].style.display = 'none'; // Ascunde a doua imagine
    });
});

// Funcție pentru a deschide detalii despre produs într-o fereastră pop-up
function showProductDetails(productId) {
    const produsDetalii = {
        produs1: {
            titlu: "Husă Tactică Impermeabilă pentru Pușcă – 135 cm",
            descriere: `
                Această husă tactică este ideală pentru transportul și protecția puștii tale, oferind siguranță și durabilitate în orice condiții.
                <br><br>
                <strong>Caracteristici principale:</strong>
                <ul>
                    <li><strong>Dimensiune optimă:</strong> Lungime de 135 cm, compatibilă cu diverse tipuri de puști.</li>
                    <li><strong>Material rezistent și impermeabil:</strong> Fabricată din țesătură Oxford durabilă.</li>
                    <li><strong>Transport confortabil:</strong> Dotată cu mânere solide și o curea reglabilă.</li>
                    <li><strong>Protecție interioară:</strong> Căptușeală moale pentru prevenirea zgârieturilor.</li>
                    <li><strong>Compartimente suplimentare:</strong> Spațiu special pentru accesorii.</li>
                </ul>
            `,
            imagini: ['produs1.jpg', 'produs1-detaliu.jpg']
        },
        produs2: {
            titlu: "Produs 2",
            descriere: "Descriere detaliată pentru produsul 2.",
            imagini: ['produs2.jpg', 'produs2-detaliu.jpg']
        }
    };

    const produs = produsDetalii[productId];

    // Crearea unui pop-up cu detalii despre produs
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${produs.titlu}</h2>
            <p>${produs.descriere}</p>
            <div class="modal-images">
                <img src="${produs.imagini[0]}" alt="${produs.titlu}">
                <img src="${produs.imagini[1]}" alt="${produs.titlu}" class="produs-detalie">
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Afișează modal-ul
    modal.style.display = 'flex';

    // Funcție pentru a închide modal-ul
    const closeBtn = modal.querySelector('.close');
    closeBtn.addEventListener('click', function() {
        modal.remove();
    });

    // Închide modal-ul când se face click în afară
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.remove();
        }
    });
}

// Funcție pentru a crea un pop-up cu imagini mari
function openPopup(imageSrc) {
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '0';
    popup.style.width = '100%';
    popup.style.height = '100%';
    popup.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    popup.style.display = 'flex';
    popup.style.alignItems = 'center';
    popup.style.justifyContent = 'center';
    popup.style.zIndex = '9999';

    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '80%';
    img.style.borderRadius = '10px';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = 'Închide';
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '10px';
    closeBtn.style.backgroundColor = '#ff6600';
    closeBtn.style.color = 'white';
    closeBtn.style.padding = '10px 20px';
    closeBtn.style.border = 'none';
    closeBtn.style.borderRadius = '5px';
    closeBtn.style.cursor = 'pointer';

    closeBtn.addEventListener('click', function() {
        popup.remove();
    });

    popup.appendChild(img);
    popup.appendChild(closeBtn);
    document.body.appendChild(popup);
}

// Exemplu de deschidere a pop-up-ului cu imaginea mare la click pe imagine
document.querySelectorAll('.produs-card img').forEach(function(img) {
    img.addEventListener('click', function() {
        openPopup(img.src);
    });
});

// Afișare câmp „Alt produs” când utilizatorul alege „Altceva”
document.getElementById("produs").addEventListener("change", function() {
    let altProdusContainer = document.getElementById("alt-produs-container");
    if (this.value === "Altceva") {
        altProdusContainer.style.display = "block";
    } else {
        altProdusContainer.style.display = "none";
    }
});

// Formularul de comandă - Trimitere prin EmailJS
document.getElementById("formular-comanda").addEventListener("submit", function(event) {
    event.preventDefault();

    let produs = document.getElementById("produs").value;
    let altProdus = document.getElementById("alt-produs").value.trim();
    let nume = document.getElementById("nume").value;
    let telefon = document.getElementById("telefon").value;
    let adresa = document.getElementById("adresa").value;

    let params = {
        produs: produs === "Altceva" ? altProdus : produs,
        nume: nume,
        telefon: telefon,
        adresa: adresa
    };

    emailjs.send("service_taulDemailjs", "template_taulDemailjs", params)
        .then(function(response) {
            alert("Comanda a fost trimisă cu succes!");
            document.getElementById("formular-comanda").reset(); // Șterge formularul după trimitere
        }, function(error) {
            alert("Eroare la trimitere. Încearcă din nou.");
        });
});
