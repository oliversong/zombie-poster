var Browser = require("zombie");
var assert = require("assert");

//submit to hackernews
function submit(url, title){
    console.log("Submitting");
    query = "http://news.ycombinator.com/";
    browser = new Browser();
    browser.cookies("news.ycombinator.com","/").set("user","JU6FCDMs");
    browser.visit("http://news.ycombinator.com/"+"submitlink?u="+encodeURIComponent(url)+"&t="+encodeURIComponent(title), function () {
        console.log(browser.html());
        browser.pressButton("submit", function() {
            assert.ok(browser.success);
        })
    });
}

submit("http://www.technologyreview.com/news/506127/connectome/","DNA Sequencing Could Map the Brain's Wiring");
console.log("Submitted, I hope.");
