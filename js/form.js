var formCard = document.getElementById("mainForm");
var loadingCard = document.getElementById("loading");
var resultsCard = document.getElementById("results");

function formSubmit(e) {
    e.preventDefault();
    changeToLoading();
    var email;
    var criteria;
    var response;
    var form = e.srcElement;
    email = form.elements.email.value;
    criteria = form.elements.criteria.value;
    var xhttp = new XMLHttpRequest();
    if (criteria == "Term-Exam") {
        xhttp.open("GET", "data/termexam.json", true);
    } else {
        xhttp.open("GET", "data/assesment.json", true);
    }
    xhttp.send()
    xhttp.onloadend = function() {
        response = JSON.parse(this.responseText.toString())[email];
        var status;
        var score = "-";
        var rank = "-";
        if (response == null) {
            status = "Result Not Found";
        } else {
            if (response["score"] == "dis") {
                status = "Disqualified";
            } else {
                status = "Results Found";
                score = response["score"];
                rank = response["rank"];
            }
        };
        changeToResults(email, criteria, status, score, rank);
    }
}

function changeToLoading() {
    formCard.setAttribute("style", "display: none;");
    loadingCard.setAttribute("style", "display: block;");
}

function changeToResults(email, criteria, status, score, rank) {
    loadingCard.setAttribute("style", "display: none;");
    document.getElementById("resultEmail").innerHTML = email;
    document.getElementById("resultCriteria").innerHTML = criteria;
    document.getElementById("resultStatus").innerHTML = status;
    if (status == "Results Found") {
        document.getElementById("resultStatus").className = "text-success";
    }
    document.getElementById("resultScore").innerHTML = score;
    document.getElementById("resultRank").innerHTML = rank;
    resultsCard.setAttribute("style", "display: block;");
}
