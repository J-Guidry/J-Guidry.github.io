function displayResults(){
    var input = document.querySelector("#input").value;
  
    var url = new URL("https://en.wikipedia.org/w/api.php");
    var params = {
        action: "opensearch",
        search: input,
        format: "json",
        origin: "*"
    }
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    fetch(url)
    .then(response => response.json())
    .then(results);

  };
  
function results(data){
    var parent = document.querySelector("#output");
    var child = document.createElement("ul");
    var item = document.createElement("li");
    var anchor = document.createElement("a");
    var paragraph = document.createElement("p");
    if(parent.firstChild !== null){
        parent.firstChild.remove();
    }
    for(var i = 0; i < data[1].length; i++) {
        var item = document.createElement("li");
        var anchor = document.createElement("a");
        var paragraph = document.createElement("p");
        child.appendChild(item);
        item.appendChild(anchor);
        anchor.href = data[3][i];
        anchor.textContent = data[1][i];
        anchor.target = "_blank";
        paragraph.textContent = data[2][i];
        item.appendChild(paragraph);
        child.appendChild(item);
        parent.insertBefore(child, parent.firstChild)
    }  
}

document.querySelector("#search").addEventListener("click", displayResults);

document.querySelector("#input").addEventListener("keypress", function(event) {
    if(event.which === 13)     
        displayResults();      
});


  
  
  