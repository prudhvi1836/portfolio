// function to display contents as per tab selection
document.querySelectorAll('input[name="tab"]').forEach((radio) => {
  radio.addEventListener('change', function() {
    document.querySelectorAll('.tab-content > div').forEach((content) => {
      content.style.display = 'none';
    });
    document.getElementById(`${this.id}-content`).style.display = 'block';
  });
});

// Initialize the display with About as default 
document.querySelector('input[name="tab"]:checked').dispatchEvent(new Event('change'));
