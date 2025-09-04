// main.js - Flip Card 與 Timeline 動畫

document.addEventListener('DOMContentLoaded', function() {
  // Flip Card 互動
  document.querySelectorAll('.flip-card').forEach(function(card) {
    card.addEventListener('click', function() {
      card.classList.toggle('flipped');
    });
    card.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        card.classList.toggle('flipped');
      }
    });
  });

  // Timeline 進場動畫（可選）
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.timeline-row').forEach(row => observer.observe(row));
});
