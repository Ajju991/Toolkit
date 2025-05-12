function showScreen(id) {
  document.querySelectorAll('.popup').forEach(div => div.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

function goBack() {
  document.querySelectorAll('.popup').forEach(div => div.style.display = 'none');
}

function compressImage() {
  const result = document.getElementById("compressResult");
  const link = document.getElementById("downloadCompressed");
  result.innerText = "Image compressed successfully! (simulated)";
  link.href = "#"; link.style.display = "inline";
}

function removeBackground() {
  const result = document.getElementById("bgResult");
  const link = document.getElementById("downloadBG");
  result.innerText = "Background removed successfully! (simulated)";
  link.href = "#"; link.style.display = "inline";
}

function editPDF() {
  const result = document.getElementById("pdfResult");
  const link = document.getElementById("downloadPDF");
  result.innerText = "PDF edited successfully! (simulated)";
  link.href = "#"; link.style.display = "inline";
}
