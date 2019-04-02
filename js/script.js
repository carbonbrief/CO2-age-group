// populate age dropdown

let selectAge = document.getElementById("selectorAge");
let yearBorn = 1917;

for (var i=0; i<101; ++i ) {

    let el = document.createElement("option");
    el.textContent = yearBorn;
    el.value = yearBorn;
    selectAge.appendChild(el);
    // increase year each time
    yearBorn++;
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