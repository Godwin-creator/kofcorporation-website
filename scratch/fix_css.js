const fs = require('fs');

function fixFile(filePath, marker) {
  const content = fs.readFileSync(filePath);
  // The corrupted part starts with a newline and then the class name in utf16le
  // Actually, we can just look for the first null byte, since the original CSS shouldn't have null bytes.
  let index = content.indexOf(0x00);
  if (index !== -1) {
    // Find the start of the corrupted line (the previous newline)
    while (index > 0 && content[index - 1] !== 0x0A) {
      index--;
    }
    const fixedContent = content.slice(0, index);
    
    // Add the correct CSS (in utf8)
    const newCss = `
.${marker}__section-title {
  color: var(--color-accent) !important;
  margin-bottom: 1rem !important;
}

.${marker}__section-subtitle {
  color: var(--color-text);
  font-size: clamp(1.25rem, 2vw, 1.75rem);
  font-weight: 500;
  line-height: 1.4;
  margin: 0;
  max-width: 30ch;
}
`;
    fs.writeFileSync(filePath, Buffer.concat([fixedContent, Buffer.from(newCss, 'utf8')]));
    console.log('Fixed', filePath);
  }
}

fixFile('src/components/pages/ServicesPage.css', 'services-page');
fixFile('src/components/pages/RealisationsPage.css', 'realisations-page');
fixFile('src/components/pages/ContactPage.css', 'contact-page');
