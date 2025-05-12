const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const download = document.getElementById("download");

let originalImage = null;
let currentTool = null;

upload.addEventListener("change", function () {
  const file = this.files[0];
  const reader = new FileReader();
  reader.onload = function () {
    const img = new Image();
    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      originalImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
    };
    img.src = reader.result;
  };
  if (file) reader.readAsDataURL(file);
});

function selectTool(tool) {
  if (!originalImage) {
    alert("Please upload an image first.");
    return;
  }
  currentTool = tool;
  if (tool === "sponge") {
    applySpongeEffect();
  } else if (tool === "background") {
    applyBackgroundRemover();
  }
}

function applySpongeEffect() {
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = data[i] * 0.8;     // reduce red
    data[i + 1] = data[i + 1] * 0.8; // reduce green
    data[i + 2] = data[i + 2] * 1.2; // enhance blue
  }
  ctx.putImageData(imageData, 0, 0);
}

function applyBackgroundRemover() {
  let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] > 200 && data[i + 1] > 200 && data[i + 2] > 200) {
      data[i + 3] = 0; // Make white background transparent
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

function resetImage() {
  if (originalImage) {
    ctx.putImageData(originalImage, 0, 0);
  }
}

download.addEventListener("click", function () {
  const image = canvas.toDataURL("image/png");
  download.href = image;
});
