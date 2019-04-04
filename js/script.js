// create arrays for pairs of dropdowns
let selectAge = document.getElementsByClassName("selectorAge");
let selectRegion = document.getElementsByClassName("selectorRegion");
//let selectScenario = document.getElementsByClassName("selectorScenario");
let selectEmissions = document.getElementsByClassName("selectorEmissions");

let age = 0;
let region = "United Kingdom";
//let scenario = "2.6";
let emissions = "national";

// populate age dropdown programmatically
for (var i=0; i<101; ++i ) {

    let el = document.createElement("option");
    el.textContent = age;
    el.value = age;
    selectAge[0].appendChild(el);

    let el2 = document.createElement("option");
    el2.textContent = age;
    el2.value = age;
    selectAge[1].appendChild(el2);

    if (i == 100) {
        onComplete();
    };

    // increase age each time
    age++;
}

function onComplete() {  
    // set default selected age to 1980
    selectAge[0].getElementsByTagName('option')[63].setAttribute('selected', true);
    selectAge[1].getElementsByTagName('option')[63].setAttribute('selected', true);
}

function hideIntro () {

    $("#intro").fadeTo("fast", 0, moveBehind);

    function moveBehind () {
        $("#intro").css("z-index", "-99999");
    }

    age = selectAge[1].options[selectAge[1].selectedIndex].value;
    region = selectRegion[1].options[selectRegion[1].selectedIndex].value;
    //scenario = selectScenario[1].options[selectScenario[1].selectedIndex].value;
    console.log(age + " " + region);

    // update other dropdowns
    selectAge[0].value = age;
    selectRegion[0].value = region;
    //selectScenario[0].value = scenario;

    update();

}

selectRegion[0].addEventListener("change", function(e) {
    region = e.target.value;
    update(region);
});


selectAge[0].addEventListener("change", function(e) {
    age = e.target.value;
    update(age);
});

selectEmissions[0].addEventListener("change", function(e) {
    emissions = e.target.value;
    update(emissions);
    if (emissions == "national") {
        $("#emissions").text("Based on energy models for your country");
    } else {
        $("#emissions").text("Dividing up remaining emissions equally for everyone on Earth");
    }
});

// reset dropdown on window reload

$(document).ready(function () {
    $("select").each(function () {
        $(this).val($(this).find('option[selected]').val());
    });
})