// Function to display contents as per tab selection
document.querySelectorAll('input[name="tab"]').forEach((radio) => {
  radio.addEventListener('change', function() {
    document.querySelectorAll('.tab-content > div').forEach((content) => {
      content.style.display = 'none';
    });
    const contentDiv = document.getElementById(`${this.id}-content`);
    contentDiv.style.display = 'block';

    // If the Blog tab is selected, fetch the blog content
    if (this.id === 'blog') {
      fetch('http://localhost:8080/api/posts/getAllBlogContent')
      .then(response => response.json())
      .then(data => {
        // Assuming data is an array of blog posts with id, title, preview, and fullContent properties
        let blogContent = '';
        data.forEach(blog => {
          blogContent += `
            <div class="blog-preview">
              <h4>${blog.title}</h4>
              <p>${blog.preview}</p>
              <button onclick="showFullBlog(${blog.id})">Read More</button>
            </div>`;
        });
        const contentContainerDiv = document.getElementById('blog-preview-container')
        contentContainerDiv.innerHTML = blogContent;
      })
      .catch(error => {
        contentDiv.innerHTML = '<p>Failed to load blog content. Please try again later.</p>';
        console.error('Error fetching blog content:', error);
      });
    }
  });
});

// Initialize the display with About as default
document.querySelector('input[name="tab"]:checked').dispatchEvent(new Event('change'));

// Function to fetch and display the full blog
function showFullBlog(blogId) {
  fetch(`http://localhost:8080/api/posts/getBlog/${blogId}`)
    .then(response => response.json())
    .then(data => {
      //data has title and content properties
      const blogContent = `
        <button class="back-button" onclick="hideFullBlog()">Back</button>
        <h4>${data.title}</h4>
        <p>${data.content}</p>`;
        const contentContainerDiv = document.getElementById('blog-preview-container')
        contentContainerDiv.innerHTML = blogContent;
    })
    .catch(error => {
      document.getElementById('blog-content').innerHTML = '<p>Failed to load blog content. Please try again later.</p>';
      console.error('Error fetching blog content:', error);
    });
}

// Function to go back to the blog previews
function hideFullBlog() {
  document.querySelector('input#blog').dispatchEvent(new Event('change'));
}