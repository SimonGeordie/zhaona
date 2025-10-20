// 单页面应用JavaScript功能

// Shows one page and hides the other two 
function showPage(page) { 
    // Hide only the page content divs (page1, page2, page3): 
    document.querySelectorAll('div[id^="page"]').forEach(div => { 
        div.style.display = 'none'; 
    }); 

    // Show the div provided in the argument 
    document.querySelector(`#${page}`).style.display = 'block'; 
    
    // 更新按钮激活状态
    const buttons = document.querySelectorAll('button[data-page]');
    buttons.forEach(button => {
        if (button.getAttribute('data-page') === page) {
            button.style.backgroundColor = '#4CAF50';
            button.style.color = 'white';
        } else {
            button.style.backgroundColor = '';
            button.style.color = '';
        }
    });
} 

// Wait for page to loaded: 
document.addEventListener('DOMContentLoaded', function() { 
    // 默认显示第一个页面
    showPage('page1');

    // Select all buttons 
    document.querySelectorAll('button').forEach(button => { 
        // When a button is clicked, switch to that page 
        button.onclick = function() { 
            showPage(this.dataset.page); 
        } 
    }) 
});