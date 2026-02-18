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


// 

document.querySelectorAll("pre > code").forEach((codeBlock) => {
  const pre = codeBlock.parentNode;

  const button = document.createElement("button");
  button.className = "copy-button";
  button.type = "button";
  button.textContent = "Copy";

  button.addEventListener("click", () => {
    navigator.clipboard.writeText(codeBlock.innerText).then(() => {
      button.textContent = "Copied!";
      setTimeout(() => (button.textContent = "Copy"), 1500);
    });
  });

  pre.appendChild(button);
});
