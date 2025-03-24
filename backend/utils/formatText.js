// utils/formatText.js
function formatDescription(raw) {
    if (!raw || typeof raw !== 'string') return '';
  
    return raw
      .replace(/\r\n|\r/g, '\n')     // Normalize line breaks
      .replace(/\n{2,}/g, '\n')      // Collapse multiple breaks to just one
      .trim();                       // Remove leading/trailing newlines
  }
  
  module.exports = {
    formatDescription,
  };
  