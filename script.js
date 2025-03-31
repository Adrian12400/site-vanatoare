document.getElementById("btn").addEventListener("click", function() {
    let mesaj = document.createElement("div");
    mesaj.innerText = "Produsele vor fi disponibile în curând!";
    mesaj.style.position = "fixed";
    mesaj.style.bottom = "20px";
    mesaj.style.left = "50%";
    mesaj.style.transform = "translateX(-50%)";
    mesaj.style.background = "#ff6600";
    mesaj.style.color = "white";
    mesaj.style.padding = "10px 20px";
    mesaj.style.borderRadius = "5px";
    mesaj.style.boxShadow = "0 0 10px rgba(0,0,0,0.3)";
    document.body.appendChild(mesaj);
    
    setTimeout(() => {
        mesaj.remove();
    }, 3000);
});
