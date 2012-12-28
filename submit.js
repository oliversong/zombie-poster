var casper = require('casper').create();
var fs = require('fs');

//submit to hackernews
function submit(url, title){
    console.log("Submitting");
    phantom.addCookie({"name":"user","value":"FwVp29RY","domain":"news.ycombinator.com"});
    casper.start("http://news.ycombinator.com/submitlink?u="+encodeURIComponent(url)+"&t="+encodeURIComponent(title),function(){
        this.click('form table tbody tr:nth-child(3) td:last-child input');
    });
    casper.then(function(){
        this.echo("clicked submit, new location is" + this.getCurrentUrl());
    });
    casper.run();
}

//submit("http://stackoverflow.com/questions/7474354/include-jquery-in-the-javascript-console","Using jQuery in the console");
console.log("Submitted, I hope.");
