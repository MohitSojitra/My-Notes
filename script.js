let text = document.getElementById("text");

let nTitle = document.querySelector("#nTitle");

let addNote = document.getElementById("addNote");
showNotes();
addNote.addEventListener("click", function (e) {
    if (text.value == "" || nTitle.value == "") {
        alert("you must check feild is not empty")
    } else {
        // console.log(text.value);
        let notes = localStorage.getItem("notes");
        let notesTitle = localStorage.getItem("title");
        if (notes == null) {
            notArray = [];
            notTitle = [];
        } else {
            notArray = JSON.parse(notes);
            notTitle = JSON.parse(notesTitle);

        }
        notArray.push(text.value);
        notTitle.push(nTitle.value);
        localStorage.setItem("notes", JSON.stringify(notArray));
        localStorage.setItem("title", JSON.stringify(notTitle));

        text.value = "";
        nTitle.value = "";

        // console.log(notArray)
    }
    showNotes();

});


function showNotes() {
    let notes = localStorage.getItem("notes");
    let notesTitle = localStorage.getItem("title");
    let html = "";
    if (notes == null || notes == "[]") {

        html = '<h4> No one Note Available Please Add Notes :)</h4>'

    } else {
        notArray = JSON.parse(notes);
        notTitle = JSON.parse(notesTitle);

        Array.from(notArray).forEach(function (element, index) {

            html += `<div class="card my-3 mx-3 cardSearch" style="width: 18rem;">
                <div class="card-body" >
                    <h5 class="card-title">${notTitle[index]}</h5>
                <p class="card-text">${element}</p>
                <button class="btn btn-primary" id="${index}" onclick="deleteNote(this.id)">Delete</button>
                </div>
                </div>`
        });
    }

    document.getElementById("dynemic").innerHTML = html;

}

function deleteNote(index) {
    // console.log(index);

    let notes = localStorage.getItem("notes");
    let notsTitle = localStorage.getItem("title");

    let notArray = JSON.parse(notes);
    let notTitle = JSON.parse(notsTitle);


    notArray.splice(index, 1);
    notTitle.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notArray));
    localStorage.setItem("title", JSON.stringify(notTitle));
    showNotes();

}


let search = document.getElementById("search");
search.addEventListener("input", function (e) {

    let searchText = e.target.value.toLowerCase();
    // console.log(searchText)
    let notes = localStorage.getItem("notes");

    // console.log(notes)
    if (notes == null || notes == "[]") {

        html = '<h4> No one Note Available Please Add Notes :)</h4>'
        document.getElementById("dynemic").innerHTML = html;
    } else {
        let elements = document.getElementsByClassName("cardSearch");
        Array.from(elements).forEach(function (element) {
            let text = element.getElementsByTagName("p")[0].innerText.toLowerCase();
            let title = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
            // console.log(text);
            if (text.includes(searchText) || title.includes(searchText)) {
                // console.log("include")
                element.style.display = "block";
            } else {
                element.style.display = "none";

            }
        });
    }

    if (searchText == "") {
        showNotes();
    }

});