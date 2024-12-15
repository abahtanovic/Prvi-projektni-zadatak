document.addEventListener("DOMContentLoaded", function() {
    // Datum i vrijeme
    const datumVrijemeElement = document.createElement('div');
    
    function prikaziTrenutniDatumVrijeme() {
        datumVrijemeElement.classList.add('datum-vrijeme');
        document.body.prepend(datumVrijemeElement);

        function azurirajDatumVrijeme() {
            const trenutnoVrijeme = new Date();
            const opcije = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit' 
            };
            datumVrijemeElement.textContent = trenutnoVrijeme.toLocaleDateString('hr-HR', opcije) + ' ' + trenutnoVrijeme.toLocaleTimeString('hr-HR');
        }

        azurirajDatumVrijeme();
        setInterval(azurirajDatumVrijeme, 1000);
    }

    prikaziTrenutniDatumVrijeme();

    const currentPath = window.location.pathname.split('/').filter(Boolean).pop().toLowerCase() || 'pocetna.html';
    if (currentPath === 'pocetna.html') { 
        function prikaziDobrodoslicu() {
            const korisnickoIme = 'Dragi putniče';
            alert(`Dobrodošli, ${korisnickoIme}! Uživajte u pregledu naše stranice.`);
        }
        prikaziDobrodoslicu();
    }

    // Citati
    const citati = [
        "Putovanja su jedini trošak koji vas čini bogatijima.",
        "Svijet je knjiga, a oni koji ne putuju čitaju samo jednu stranu.",
        "Putujte često; doživjeti svijet je najbolji način da upoznate sebe."
    ];

    function prikaziCitat() {
        const randomIndex = Math.floor(Math.random() * citati.length);
        const citat = citati[randomIndex];
        document.getElementById("citat-container").innerHTML = `<div class="citat">${citat}</div>`;
    }

    prikaziCitat();

    // Filtriranje tabele
    document.getElementById('price-filter').addEventListener('change', filterTable);
    document.getElementById('date-filter').addEventListener('change', filterTable);

    function filterTable() {
        const priceFilter = document.getElementById('price-filter').value;
        const dateFilter = document.getElementById('date-filter').value;

        const rows = document.querySelectorAll('.ponude tbody tr');

        rows.forEach(row => {
            const price = parseInt(row.getAttribute('data-price'));
            const date = row.getAttribute('data-date');

            const priceMatch = (priceFilter === 'all') || 
                               (priceFilter === 'cheap' && price < 400) || 
                               (priceFilter === 'mid' && price >= 400 && price <= 600) ||
                               (priceFilter === 'expensive' && price > 600);

            const dateMatch = (dateFilter === 'all') || (dateFilter === date);

            if (priceMatch && dateMatch) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    // Ocjenjivanje zvjezdicama
    const ratings = document.querySelectorAll('.rating');
    ratings.forEach(rating => {
        const stars = rating.querySelectorAll('span');
        stars.forEach((star, index) => {
            star.addEventListener('click', function() {
                setRating(rating, index + 1);
            });
        });
    });

    function setRating(ratingElement, rate) {
        const stars = ratingElement.querySelectorAll('span');
        stars.forEach((star, index) => {
            star.style.color = index < rate ? 'gold' : '#ddd';
        });

        ratingElement.setAttribute('data-rate', rate);
    }

    // Poruka na temelju checkboxa
    const checkboxes = document.querySelectorAll('input[type="checkbox"][name="reason"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            showMessage(this);
        });
    });

    function showMessage(checkbox) {
        var messageDiv = document.getElementById("message");
        var reason = checkbox.value;

        if (checkbox.checked) {
            if (reason === "Praktično iskustvo") {
                messageDiv.innerHTML = "Praktično iskustvo – To možete steći volontiranjem u Parizu u martu!";
            } else if (reason === "Razvoj vještina") {
                messageDiv.innerHTML = "Razvoj vještina – Razvijajte vještine u radu s klijentima i timom!";
            } else if (reason === "Upoznavanje industrije") {
                messageDiv.innerHTML = "Upoznavanje industrije – Steknite uvid u najnovije trendove u turizmu!";
            }
        } else {
            messageDiv.innerHTML = ""; 
        }
    }

    // Validacija forme za volontere
    const volunteerForm = document.getElementById("volunteerForm");
    volunteerForm.addEventListener("submit", function(event) {
        let isValid = true;
        const fields = volunteerForm.querySelectorAll("input, textarea, select"); 
        
        fields.forEach(field => {
            if (field.value.trim() === "") {
                alert(`${field.previousElementSibling.textContent} nije popunjeno!`);
                field.focus(); 
                isValid = false;
                return false; 
            }
        });

        if (!isValid) {
            event.preventDefault(); 
        }
    });

    // Validacija kontakt forme
    const contactForm = document.querySelector("form");
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let isValid = true;
        const errorMessages = [];

        // Ime - provjera da nije prazno
        const ime = document.getElementById("ime").value.trim();
        if (ime === "") {
            isValid = false;
            errorMessages.push("Ime je obavezno.");
        }

        // Prezime - provjera da nije prazno
        const prezime = document.getElementById("prezime").value.trim();
        if (prezime === "") {
            isValid = false;
            errorMessages.push("Prezime je obavezno.");
        }

        // Godište - provjera da je u validnom rasponu
        const godiste = document.getElementById("godiste").value;
        if (godiste < 1900 || godiste > 2024) {
            isValid = false;
            errorMessages.push("Godište mora biti između 1900. i 2024. godine.");
        }

        // Email - provjera da li je u ispravnom formatu
        const email = document.getElementById("email").value.trim();
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            isValid = false;
            errorMessages.push("Email nije ispravan.");
        }

        // Broj telefona - provjera da li je validan broj
        const broj = document.getElementById("broj").value.trim();
        const phonePattern = /^[0-9]{10}$/;
        if (!phonePattern.test(broj)) {
            isValid = false;
            errorMessages.push("Broj telefona nije ispravan.");
        }

        // Pasos - provjera da nije prazno
        const pasos = document.getElementById("pasos").value.trim();
        if (pasos === "") {
            isValid = false;
            errorMessages.push("Broj pasoša je obavezan.");
        }

        if (!isValid) {
            alert("Greške:\n" + errorMessages.join("\n"));
        } else {
            contactForm.style.display = "none";
            const thankYouMessage = document.createElement("div");
            thankYouMessage.classList.add("thank-you-message");
            thankYouMessage.innerHTML = "<h3>Hvala na prijavi!</h3><p>Vaša prijava je uspješno poslana.</p>";
            document.body.appendChild(thankYouMessage);
        }
    });
});
