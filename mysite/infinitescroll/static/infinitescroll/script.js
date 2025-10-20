// Start with first post
let counter = 1;

// Load posts 20 at a time
const quantity = 20;

// Loading state
let isLoading = false;

// Auto scroll state
let autoScrollInterval = null;
let isAutoScrolling = false;
let scrollSpeed = 5; // Default speed (1-10)

// When DOM loads, render the first 20 posts and setup controls
document.addEventListener('DOMContentLoaded', function() {
    load();
    setupControls();
    setupDoubleClickStop();
    setupHideButtons();
});

// If scrolled to bottom, load the next 20 posts
window.onscroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isLoading) {
        load();
    }
};

// Load next set of posts
function load() {
    if (isLoading) return;
    
    isLoading = true;
    
    // Show loading indicator
    const loadingElement = document.getElementById('loading');
    loadingElement.style.display = 'block';
    
    // Set start and end post numbers, and update counter
    const start = counter;
    const end = start + quantity - 1;
    counter = end + 1;

    // Get new posts and add posts
    fetch(`/infinitescroll/posts?start=${start}&end=${end}`)
    .then(response => response.json())
    .then(data => {
        data.posts.forEach(add_post);
        
        // Hide loading indicator
        loadingElement.style.display = 'none';
        isLoading = false;
    })
    .catch(error => {
        console.error('Error loading posts:', error);
        
        // Hide loading indicator
        loadingElement.style.display = 'none';
        isLoading = false;
        
        // Show error message
        const errorElement = document.createElement('div');
        errorElement.className = 'post';
        errorElement.style.backgroundColor = '#ff6b6b';
        errorElement.innerHTML = '加载失败，请重试';
        document.querySelector('#posts').append(errorElement);
    });
};

// Add a new post with given contents to DOM
function add_post(contents) {
    // Create new post
    const post = document.createElement('div');
    post.className = 'post';
    post.innerHTML = `${contents} <button class="hide">Hide</button>`;

    // Add post to DOM
    document.querySelector('#posts').append(post);
};

// Setup control panel functionality
function setupControls() {
    const autoScrollBtn = document.getElementById('auto-scroll-btn');
    const stopScrollBtn = document.getElementById('stop-scroll-btn');
    const hidePostsBtn = document.getElementById('hide-posts-btn');
    const showPostsBtn = document.getElementById('show-posts-btn');
    const scrollSpeedInput = document.getElementById('scroll-speed');
    const speedValue = document.getElementById('speed-value');
    const postsContainer = document.getElementById('posts');

    // Update speed display
    speedValue.textContent = scrollSpeed;
    scrollSpeedInput.value = scrollSpeed;

    // Speed control
    scrollSpeedInput.addEventListener('input', function() {
        scrollSpeed = parseInt(this.value);
        speedValue.textContent = scrollSpeed;
        
        // Update auto scroll speed if active
        if (isAutoScrolling) {
            stopAutoScroll();
            startAutoScroll();
        }
    });

    // Auto scroll functionality
    autoScrollBtn.addEventListener('click', function() {
        startAutoScroll();
    });

    stopScrollBtn.addEventListener('click', function() {
        stopAutoScroll();
    });

    // Hide/show posts functionality
    hidePostsBtn.addEventListener('click', function() {
        postsContainer.style.display = 'none';
        hidePostsBtn.style.display = 'none';
        showPostsBtn.style.display = 'inline-block';
    });

    showPostsBtn.addEventListener('click', function() {
        postsContainer.style.display = 'block';
        showPostsBtn.style.display = 'none';
        hidePostsBtn.style.display = 'inline-block';
    });
}

// Start auto scroll
function startAutoScroll() {
    if (isAutoScrolling) return;
    
    isAutoScrolling = true;
    document.getElementById('auto-scroll-btn').style.display = 'none';
    document.getElementById('stop-scroll-btn').style.display = 'inline-block';
    document.getElementById('double-click-hint-text').style.display = 'block';
    
    // Calculate scroll interval based on speed (faster = smaller interval)
    const interval = 1100 - (scrollSpeed * 100); // 100ms to 1000ms
    
    autoScrollInterval = setInterval(function() {
        // Scroll down by 100 pixels
        window.scrollBy(0, 100);
        
        // Check if we need to load more content
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && !isLoading) {
            load();
        }
    }, interval);
}

// Stop auto scroll
function stopAutoScroll() {
    if (!isAutoScrolling) return;
    
    isAutoScrolling = false;
    document.getElementById('auto-scroll-btn').style.display = 'inline-block';
    document.getElementById('stop-scroll-btn').style.display = 'none';
    document.getElementById('double-click-hint-text').style.display = 'none';
    
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }
    
    // Hide double click hint
    hideDoubleClickHint();
}

// Setup double click to stop functionality
function setupDoubleClickStop() {
    let lastClickTime = 0;
    
    document.addEventListener('click', function(e) {
        const currentTime = new Date().getTime();
        const timeDiff = currentTime - lastClickTime;
        
        if (timeDiff < 300 && timeDiff > 0) { // Double click detected (within 300ms)
            if (isAutoScrolling) {
                stopAutoScroll();
                showDoubleClickHint();
            }
        }
        
        lastClickTime = currentTime;
    });
}

// Show double click hint
function showDoubleClickHint() {
    // Remove existing hint if any
    hideDoubleClickHint();
    
    const hint = document.createElement('div');
    hint.id = 'double-click-hint';
    hint.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        font-size: 18px;
        font-weight: bold;
        text-align: center;
        z-index: 1000;
        animation: fadeInOut 3s ease-in-out;
    `;
    hint.innerHTML = '双击页面就停止自动滑动';
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(hint);
    
    // Auto remove after animation
    setTimeout(() => {
        hideDoubleClickHint();
    }, 3000);
}

// Hide double click hint
function hideDoubleClickHint() {
    const existingHint = document.getElementById('double-click-hint');
    if (existingHint) {
        existingHint.remove();
    }
}

// Setup hide buttons functionality
function setupHideButtons() {
    // If hide button is clicked, delete the post
    document.addEventListener('click', event => {
        // Find what was clicked on
        const element = event.target;

        // Check if the user clicked on a hide button
        if (element.className === 'hide') {
            element.parentElement.remove();
        }
    });
}