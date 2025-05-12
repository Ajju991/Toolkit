function generateCode() {
  const prompt = document.getElementById("promptInput").value;
  const output = document.getElementById("codeOutput");

  if (!prompt.trim()) {
    output.innerText = "Please enter a prompt.";
    return;
  }

  output.innerText = `<!-- Sample Code for: ${prompt} -->
<!DOCTYPE html>
<html>
<head><title>Sample Tool</title></head>
<body>
  <h2>This is a placeholder code for:</h2>
  <p>${prompt}</p>
</body>
</html>`;
}

function checkGrammar() {
  const input = document.getElementById("grammarInput").value;
  const output = document.getElementById("grammarOutput");
  if (!input.trim()) {
    output.innerText = "Please enter text to check.";
    return;
  }
  output.innerText = `Corrected (simulated): ${input.replace(/\bis\b/g, "is")} (no errors found)`;
}

function summarizeText() {
  const input = document.getElementById("summaryInput").value;
  const output = document.getElementById("summaryOutput");
  if (!input.trim()) {
    output.innerText = "Please enter text to summarize.";
    return;
  }
  output.innerText = "Summary (simulated): This is a brief summary of your content.";
}

function generateHashtags() {
  const input = document.getElementById("hashtagInput").value;
  const output = document.getElementById("hashtagOutput");
  if (!input.trim()) {
    output.innerText = "Please enter a topic.";
    return;
  }
  output.innerText = `#${input.replace(/\s+/g, '')} #Productivity #Tips #AItools #SmartWork`;
}
