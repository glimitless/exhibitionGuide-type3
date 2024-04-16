

const glyphs = ['★', '♦', '♥', '♣', '♠'];
const colors = ['#10E0FF', '#F7567C', '#006EE9', '#3A1772', '#FFEF00'];




// Adjust the height on window load and resize
window.addEventListener('load', adjustGlyphContainersHeight);
window.addEventListener('resize', adjustGlyphContainersHeight);
document.addEventListener('DOMContentLoaded', function() {
  const dropdown = document.querySelector('.dropdown');
  const navItems = document.querySelectorAll('nav.globalNav ul > li:not(.dropdown)');

  dropdown.addEventListener('mouseenter', function() {
      navItems.forEach(item => {
          item.style.opacity = '0.2';
      });
  });

  dropdown.addEventListener('mouseleave', function() {
      navItems.forEach(item => {
          item.style.opacity = '1';
      });
  });
});


placeGlyphs('glyphs-left', 0.05);
placeGlyphs('glyphs-right', 0.05);
placeGlyphs('backgroundGlyphs', 0.05);



function placeGlyphs(containerId, numGlyphFactor) {
    const container = document.getElementById(containerId);
    container.style.position = 'relative';
    let numberOfGlyphs;
  
    const containerRect = container.getBoundingClientRect();

    if(containerRect.height > window.innerHeight){
      numberOfGlyphs = Math.round(numGlyphFactor * containerRect.height);
    }else{
      numberOfGlyphs = Math.round(numGlyphFactor * window.innerHeight);

    }
    
  
    for (let i = 0; i < numberOfGlyphs; i++) {
      const glyph = glyphs[Math.floor(Math.random() * glyphs.length)]; // Select a random glyph
      const glyphElement = document.createElement('div');
      glyphElement.textContent = glyph;
      glyphElement.style.color = colors[Math.floor(Math.random() * colors.length)];
      glyphElement.style.position = 'absolute';
      glyphElement.style.opacity = "0.8";
      glyphElement.style.userSelect = "none"; 
      
      glyphElement.style.left = `${Math.random() * (containerRect.width - glyphElement.offsetWidth)}px`;
      if(containerRect.height > window.innerHeight){
        glyphElement.style.top = `${Math.random() * (containerRect.height - glyphElement.offsetHeight)}px`;
      }else{
        glyphElement.style.top = `${Math.random() * (window.innerHeight - glyphElement.offsetHeight)}px`;
      }
      glyphElement.style.fontSize = `${Math.random() * 1 + 2}rem`; // Random font size between 2rem and 2.5rem
  
      container.appendChild(glyphElement);
    }
  }
  function adjustGlyphContainersHeight() {
    const contentBody = document.getElementById('content-body');
    const glyphsLeft = document.getElementById('glyphs-left');
    const glyphsRight = document.getElementById('glyphs-right');
    const viewportHeight = window.innerHeight + 'px'; // Get the viewport height

    if (contentBody && glyphsLeft && glyphsRight) {
        const contentBodyHeight = Math.max(contentBody.offsetHeight, window.innerHeight) + 'px'; // Ensure minimum height is viewport height
        glyphsLeft.style.height = contentBodyHeight;
        glyphsRight.style.height = contentBodyHeight;
        glyphsLeft.style.minHeight = viewportHeight; // Set minimum height to viewport height
        glyphsRight.style.minHeight = viewportHeight; // Set minimum height to viewport height
        contentBody.style.minHeight = viewportHeight; // Optionally, ensure contentBody also has a minimum height of the viewport
    }
}
