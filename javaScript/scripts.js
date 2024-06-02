function redirectToPage(page) {
    window.location.href = page;
}
function toggleContent(contentId) {
    var contentElements = document.querySelectorAll('.content');
    contentElements.forEach(function(element) {
      if (element.id === contentId) {
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      }
    });
}
