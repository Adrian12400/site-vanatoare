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
    // Căutăm produsul în funcție de ID-ul lui
    const produsDetalii = {
        produs1: {
            titlu: "Husă Tactică Impermeabilă pentru Pușcă – 135 cm",
            descriere: `
                Această husă tactică este ideală pentru transportul și protecția puștii tale, oferind siguranță și durabilitate în orice condiții. Cu o lungime de 135 cm, este potrivită pentru majoritatea modelelor de puști de vânătoare sau sport.
                <br><br>
                <strong>Caracteristici principale:</strong>
                <ul>
                    <li><strong>Dimensiune optimă:</strong> Lungime de 135 cm, compatibilă cu diverse tipuri de puști.</li>
                    <li><strong>Material rezistent și impermeabil:</strong> Fabricată din țesătură Oxford durabilă, protejează împotriva apei, prafului și uzurii.</li>
                    <li><strong>Transport confortabil:</strong> Dotată cu mânere solide și o curea reglabilă, oferind mai multe opțiuni de purtare.</li>
                    <li><strong>Protecție interioară:</strong> Căptușeală moale pentru prevenirea zgârieturilor și a deteriorării armei.</li>
                    <li><strong>Compartimente suplimentare:</strong> Spațiu special pentru accesorii precum muniție sau echipamente necesare.</li>
                </ul>
                <br>
                O husă robustă și practică, perfectă pentru vânători și pasionați de arme!
            `,
            imagini: ['produs1.jpg', 'produs1-detaliu.jpg']
        },
        produs2: {
            titlu: "Produs 2",
            descriere: "Descriere detaliată pentru produsul 2.",
            imagini: ['produs2.jpg', 'produs2-detaliu.jpg']
        }
        // Poți adăuga aici și alte produse
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

// Funcționalitatea pentru a arăta câmpul "Alt produs"
document.getElementById("produs").addEventListener("change", function() {
    let altProdusContainer = document.getElementById("alt-produs-container");
    if (this.value === "Altceva") {
        altProdusContainer.style.display = "block";
    } else {
        altProdusContainer.style.display = "none";
    }
});

// Formularul de comandă
document.getElementById("formular-comanda").addEventListener("submit", function(event) {
    event.preventDefault();

    let produs = document.getElementById("produs").value;
    let altProdus = document.getElementById("alt-produs").value.trim();
    let nume = document.getElementById("nume").value;
    let telefon = document.getElementById("telefon").value;
    let adresa = document.getElementById("adresa").value;

    // Construim mesajul pentru email
    let body = `Produs: ${produs}%0D%0A Nume: ${nume}%0D%0A Telefon: ${telefon}%0D%0A Adresa: ${adresa}`;
    
    // Dacă utilizatorul a selectat "Altceva" și a completat un produs, îl adăugăm la email
    if (produs === "Altceva" && altProdus !== "") {
        body += `%0D%0A Alt produs dorit: ${altProdus}`;
    }

    let mailtoLink = `mailto:comenzi@magazin.com?subject=Comanda%20Noua&body=${body}`;
    window.location.href = mailtoLink;
});
