// populate age dropdown

let selectAge = document.getElementsByClassName("selectorAge");
let selectRegion = document.getElementsByClassName("selectorRegion");
let selectScenario = document.getElementsByClassName("selectorScenario");

let year = 1917;
let region = "United Kingdom";
let scenario = "2.6";

for (var i=0; i<101; ++i ) {

    let el = document.createElement("option");
    el.textContent = year;
    el.value = year;
    selectAge[0].appendChild(el);

    let el2 = document.createElement("option");
    el2.textContent = year;
    el2.value = year;
    selectAge[1].appendChild(el2);

    if (i == 100) {
        onComplete();
    };

    // increase year each time
    year++;
}

function onComplete() {  
    // set default selected year to 1980
    selectAge[0].getElementsByTagName('option')[63].setAttribute('selected', true);
    selectAge[1].getElementsByTagName('option')[63].setAttribute('selected', true);
}

function hideIntro () {

    $("#intro").fadeTo("fast", 0, moveBehind);

    function moveBehind () {
        $("#intro").css("z-index", "-99999");
    }

    year = selectAge[1].options[selectAge[1].selectedIndex].value;
    region = selectRegion[1].options[selectRegion[1].selectedIndex].value;
    scenario = selectScenario[1].options[selectScenario[1].selectedIndex].value;
    console.log(year + " " + region + " " + scenario);

    // update other dropdowns
    selectAge[0].value = year;
    selectRegion[0].value = region;
    selectScenario[0].value = scenario;

    update();

}

selectRegion[0].addEventListener("change", function(e) {
    region = e.target.value;
    update(region);
});


selectScenario[0].addEventListener("change", function(e) {
    scenario = e.target.value;
    update(scenario);
});

// reset dropdown on window reload

$(document).ready(function () {
    $("select").each(function () {
        $(this).val($(this).find('option[selected]').val());
    });
})