var casper = require('casper').create();

//submit to hackernews
function submit(url, title){
    console.log("Submitting");
    phantom.addCookie({"name":"user","value":"FwVp29RY","domain":"news.ycombinator.com"});
    casper.start("http://news.ycombinator.com/submitlink?u="+encodeURIComponent(url)+"&t="+encodeURIComponent(title),function(){
        this.click('form table tbody:nth-child(3) input');
    });
    casper.then(function(){
        console.log("clicked submit, new location is" + this.getCurrentUrl());
    });
    casper.run();
}

submit("http://www.technologyreview.com/news/506127/connectome/","DNA Sequencing Could Map the Brain's Wiring");
console.log("Submitted, I hope.");
