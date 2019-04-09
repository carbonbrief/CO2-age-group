const credit = "%20—%20via%20@CarbonBrief";
let baseTweet;
let newText;
let encoded;
let customTweet;

// link to click function

$("#twitter").on("click", function() {

    // Remove existing iframe
    $('#tweet iframe').remove();

    baseTweet = "https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.carbonbrief.org/analysis-why-children-must-emit-eight-times-less-co2-than-their-grandparents&text=";
    newText = "My lifetime carbon allowance for limiting global warming to 1.5C is " + budgetUser.toFixed(0) + " tonnes of CO2";
    encoded = encodeURI(newText);
    customTweet = baseTweet += encoded += credit;
    $('#twitter > a').attr('href', customTweet);

});