var FeedParser = require('feedparser');
var parser = new FeedParser(); // optionally called with an options object
var fs = require('fs');
var http = require('http');
var Browser = require("zombie");
var assert = require("assert");

// we store articles we've seen in data.csv
// we call getNew as main
// getNew opens data.csv and preps it
// then calls myCallback
// parses the article and calls checkExist on each async

// get storage
console.log("Instantiating and opening file");
var current={};
var shoop=[];
fs.open('data.csv','a+',0666,getNew);

//parse RSS
function myCallback (error, meta, article){
    console.log("Parsing the rss feed");
    if (error) console.error(error);
    else{
        //console.log('\n\nFeed info');
        //console.log('%s-%s-%s', meta.title, meta.link, meta.xmlUrl);
        //console.log('Articles');
        article.forEach(function (article){
            console.log("Currently checking: "+article.title);
            checkExist(article.link,article.title);
        });
    }
}

//check if entries already in data
function checkExist (url, title){
    if(shoop.indexOf(url)==-1){
        console.log("Never seen before");
        // append to file
        fs.appendFile("data.csv",url+",",'ascii',function(err){
            if(err){
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
        });
        submit(url, title);
    }else{
        console.log("Already seen");
    }
}

//get the updated data feed
function getNew (err,fd){
    console.log("Getting the current data set");

    if(err) throw err;

    // fd is the file
    fs.readFile('data.csv','ascii',function(err,data){
        if(err){
            console.error("Could not open file: %s", err);
            process.exit(1);
        }
        console.log("Got some data");
        shoop=data.split(",");
        console.log(shoop)
    });
    //parse things
    parser.parseUrl('http://feeds.technologyreview.com/technology_review_computing',myCallback);
}

//submit to hackernews
function submit(url, title){
    console.log("Submitting");
    query="http://news.ycombinator.com/";
    options = {
        host: 'http://news.ycombinator.com',
        path: 'submitlink?u="+encodeURIComponent(url)+"&t="+encodeURIComponent(title)'
    }
//    http.get(options, function(res) {
//        console.log('STATUS: ' + res.statusCode);
//        console.log('HEADERS: ' + JSON.stringify(res.headers));
//    }).on('error', function(e){
//        console.log('Error: ' + e.message);
//    });
}
