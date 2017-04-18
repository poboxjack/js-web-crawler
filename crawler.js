var request = require('request');
var cheerio = require('cheerio');
var URL = require('url-parse');

var targetURL = "https://udn.com/news/breaknews/1/0#breaknews";
console.log("Visiting page " + targetURL);

request(targetURL, function(error, response, body) {
  if(error) {
    console.log("Error: " + error);
  }
  // Check status code 200
  console.log("Status code: " + response.statusCode);
  if(response.statusCode === 200) {
    //parse the document body
    var $ = cheerio.load(body);
    console.log("Page title: " + $('title').text());
    // collectInternalLinks($);
    collectBreaknews($);
  }
});

function searchForWord($, word) {
  var bodyText = $('html > body').text();
  if(bodyText.toLowerCase().indexOf(word.toLowerCase()) !== -1) {
    return true;
  }
  return false;
}

function collectBreaknews($) {
  var allTitles = [];

  var titles = $("#breaknews_body dt h2 a");
  titles.each(function() {
    allTitles.push($(this).text());
  });
  console.log(allTitles);
}

function collectInternalLinks($) {
  var allRelativeLinks = [];
  var allAbsoluteLinks = [];

  var relativeLinks = $("a[href^='/']");
  relativeLinks.each(function() {
    allRelativeLinks.push($(this).attr('href'));
  });

  var absoluteLinks = $("a[href^='http']");
  absoluteLinks.each(function() {
    allAbsoluteLinks.push($(this).attr('href'));
  });

  console.log("Found " + allRelativeLinks.length + " relative links");
  console.log("Found " + allAbsoluteLinks.length + " absolute links");
}
