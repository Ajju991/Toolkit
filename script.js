const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const upload = document.getElementById("upload");
const download = document.getElementById("download");
const settingsPanel = document.getElementById("toolSettings");

let currentTool = null;
let originalImage = null;
let brushSize = 10;

upload.addEventListener("change", function () {
  const file = this.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      originalImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
});

function selectTool(tool) {
  if (!originalImage) {
    alert("Please upload an image first.");
    return;
  }
  currentTool = tool;
  settingsPanel.innerHTML = "";

  if (tool === "sponge") {
    settingsPanel.innerHTML = "<p>Sponge effect reduces saturation and enhances blue.</p><button onclick='applySponge()'>Apply Sponge</button>";
  } else if (tool === "background") {
    settingsPanel.innerHTML = "<p>Background Remover:</p><button onclick='autoRemoveBg()'>Auto Remove</button>";
  } else if (tool === "brush") {
    settingsPanel.innerHTML = "<p>Brush Size: <input type='range' min='1' max='50' value='10' oninput='brushSize=this.value'></p>";
  } else if (tool === "brightness") {
    settingsPanel.innerHTML = "<p>Brightness: <input type='range' min='-100' max='100' value='0' oninput='adjustBrightness(this.value)'></p>";
  } else if (tool === "contrast") {
    settingsPanel.innerHTML = "<p>Contrast: <input type='range' min='-100' max='100' value='0' oninput='adjustContrast(this.value)'></p>";
  }
}

canvas.addEventListener("mousedown", function (e) {
  if (currentTool === "brush") {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.clearRect(x - brushSize / 2, y - brushSize / 2, brushSize, brushSize);
  }
});

function applySponge() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] *= 0.8;     // R
    data[i+1] *= 0.8;   // G
    data[i+2] *= 1.2;   // B
  }
  ctx.putImageData(imageData, 0, 0);
}

function autoRemoveBg() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] > 200 && data[i+1] > 200 && data[i+2] > 200) {
      data[i+3] = 0; // make white transparent
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

function adjustBrightness(value) {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  value = parseInt(value);
  for (let i = 0; i < data.length; i += 4) {
    data[i] += value;
    data[i+1] += value;
    data[i+2] += value;
  }
  ctx.putImageData(imageData, 0, 0);
}

function adjustContrast(value) {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const factor = (259 * (parseInt(value) + 255)) / (255 * (259 - parseInt(value)));
  for (let i = 0; i < data.length; i += 4) {
    data[i] = factor * (data[i] - 128) + 128;
    data[i+1] = factor * (data[i+1] - 128) + 128;
    data[i+2] = factor * (data[i+2] - 128) + 128;
  }
  ctx.putImageData(imageData, 0, 0);
}

function resetImage() {
  if (originalImage) ctx.putImageData(originalImage, 0, 0);
}

download.addEventListener("click", function () {
  download.href = canvas.toDataURL("image/png");
});
