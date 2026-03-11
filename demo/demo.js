function openCity(evt, cityName) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Show the first tab content on page load
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".tablinks").click();
});

// copy button
document.querySelectorAll('pre code').forEach((block) => {
  const button = document.createElement('button');
  button.textContent = 'copy';
  button.style.cssText = 'position:absolute;top:6px;right:6px;padding:2px 8px;font-size:12px;cursor:pointer;';
  
  const pre = block.parentElement;
  pre.style.position = 'relative';
  pre.appendChild(button);

  button.addEventListener('click', () => {
    navigator.clipboard.writeText(block.innerText).then(() => {
      button.textContent = 'copied!';
      setTimeout(() => button.textContent = 'copy', 2000);
    });
  });
});