document.addEventListener('copy', (event) => {
    const selection = window.getSelection().toString().trim();
    if (selection.startsWith("PR: ")) { // Adjust this to match the PR title pattern
      const url = `https://github.com/your/repo/pulls/${selection.substring(4)}`; // Adjust this URL pattern
      const newText = `<a href="${url}"><b>${selection}</b></a>`;
      event.clipboardData.setData('text/html', newText);
      event.clipboardData.setData('text/plain', newText); // Optional: You can set plain text format as well
      event.preventDefault();
    }
  });