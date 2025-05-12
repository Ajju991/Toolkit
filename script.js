function compressImage() {
  const output = document.getElementById("compressOutput");
  output.innerText = "Image compressed successfully! (simulated)";
}

function removeBackground() {
  const output = document.getElementById("bgOutput");
  output.innerText = "Background removed successfully! (simulated)";
}

function editPDF() {
  const output = document.getElementById("pdfOutput");
  output.innerText = "PDF editor opened! (simulated)";
}

function convertFile() {
  const format = document.getElementById("formatSelect").value;
  const output = document.getElementById("convertOutput");
  output.innerText = `File converted to ${format.toUpperCase()}! (simulated)`;
}
