document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Obter valores dos campos
    var nameInput = document.querySelector("#contactForm input[name='name']");
    var emailInput = document.querySelector("#contactForm input[name='email']");
    var subjectInput = document.getElementById("subject");

    // Capitalizar a primeira letra de cada palavra no campo "name"
    nameInput.value = capitalizeEachWord(nameInput.value);

    // Construir a string de texto do WhatsApp
    var whatsappText = "Ei, psiu. Me chamo: " + (nameInput.value ? nameInput.value : "N/A") + "\n";
    whatsappText += "Email: " + (emailInput.value ? emailInput.value : "N/A") + "\n";
    whatsappText += "Assunto: " + (subjectInput.value ? subjectInput.value : "N/A");

    // Codificar a string para uso na URL
    var whatsappUrl = "https://wa.me/5574998154643?text=" + encodeURIComponent(whatsappText);

    // Abre a URL do WhatsApp em uma nova guia
    window.open(whatsappUrl, "_blank");
  });

  // Função para capitalizar a primeira letra de cada palavra
  function capitalizeEachWord(str) {
    return str.replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  }
});
