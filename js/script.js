// populate age dropdown

let selectAge = document.getElementsByClassName("selectorAge");
console.log(selectAge);
let yearBorn = 1917;

for (var i=0; i<101; ++i ) {

    let el = document.createElement("option");
    el.textContent = yearBorn;
    el.value = yearBorn;
    selectAge[0].appendChild(el);

    let el2 = document.createElement("option");
    el2.textContent = yearBorn;
    el2.value = yearBorn;
    selectAge[1].appendChild(el2);

    if (i == 100) {
        onComplete();
    };

    // increase year each time
    yearBorn++;
}

function onComplete() {  
    // set default selected year to 1980
    selectAge[0].getElementsByTagName('option')[63].setAttribute('selected', true);
    selectAge[1].getElementsByTagName('option')[63].setAttribute('selected', true);
}

document.getElementById('selectorRegion').addEventListener("change", function(e) {
    region = e.target.value;
    update(region);
});


document.getElementById('selectorScenario').addEventListener("change", function(e) {
    scenario = e.target.value;
    update(scenario);
});

// reset dropdown on window reload

$(document).ready(function () {
    $("select").each(function () {
        $(this).val($(this).find('option[selected]').val());
    });
})