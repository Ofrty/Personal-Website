/**********************************************************************************************************************
 * Author: Joe Kirkham
 * Date Created:
 * Description: pfnpcServer.js handles high-level routing logic for the Pathfinder NPC Database. Actual interface
 *    handled within pfnpcInterface.js, and routed via the root page. Raw tables handlers are also included
 *    here for quick viewing and debugging of tables as a whole.
 *
 * Attribution: Some structure and syntax inspired by J. Wolford"s BSG sample web app available on GitHub here:
 *    https://github.com/wolfordj/CS340-Sample-Web-App/
 *********************************************************************************************************************/

/*setup server*/
var express = require("express");
/*var mysql = require("./pfnpcDBConnection.js");*/
var bodyParser = require("body-parser");

var app = express();
var handlebars = require("express-handlebars").create({defaultLayout:"main"});


app.engine("handlebars", handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "handlebars");
app.set("port", 8657);
/*app.set("mysql", mysql);*/


/* access control
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
*/

/*homepage*/
app.get("/", function(req,res,next)
{
    res.redirect('/home');
});

app.get("/home", function(req,res,next)
{
    var context = {};

    context.page = "home";

    context.primaryContentHeader = "Welcome to my webpage - I'm glad that you're here!";

    context.primaryContent =
        "A bit about me: I earn my living as a Data Analyst and am working to grow creatively as a developer, musician, and photographer." +
        "<br/>" +
        "<br/>" +
        "If you would like to get in touch, please be sure to visit my Contact page." +
        "<br/>" +
        "<br/>" +
        "In the interim, selected programming and creative projects are hosted here for viewing. I hope you find something of interest!" +
        "<br/>" +
        "<br/>" +
        "Richard Feynman is a personal hero - ponder some Feynman wisdom!";

    context.secondaryContent =
        "<a class=\"twitter-timeline\" data-chrome=\"nofooter transparent\" data-height=\"55vh\" data-theme=\"light\" href=\"https://twitter.com/ProfFeynman?ref_src=twsrc%5Etfw\"></a>";

    res.render("primaryView", context);
});

app.get("/programming", function(req,res,next)
{
    var context = {};

    context.page = "programming";

    context.primaryContentHeader = "Programming Projects";

    context.primaryContent =
        (
  "Here are links to some of my own programming projects. I don't have too much to share yet, but I have some ideas that I hope will become things soon!" +
  "<br/>" +
  "<ul id=\"programmingList\">" +
  "<li><a id=\"fantasyFootballRace\" class=\"programmingListLink\" href=\"https://scratch.mit.edu/projects/119272648/\">Scratch - Fantasy Football Draft Race (had to start somewhere...)</a></li>" +
  "<li><a id=\"githubHome\" class=\"programmingListLink\" href=\"https://github.com/Ofrty/\">GitHub - Home</a></li>" +
  "<ul>" +
  "<li><a id=\"githubPersonalWebsite\" class=\"programmingListLink\" href=\"https://github.com/Ofrty/Personal-Website\">This Website!</a></li>" +
  "<li><a id=\"githubChateauDaimyo\" class=\"programmingListLink\" href=\"https://github.com/Ofrty/ChateauDaimyo\">\"Chateau Daimyo\" - Small game for Intro to CS Project</a></li>" +
  "<li><a id=\"githubCreatureTournament\" class=\"programmingListLink\" href=\"https://github.com/Ofrty/CreatureTournament\">\"Creature Tournament\" - Small game for Intro to CS Project</a></li>" +
  "</ul>" +
  "</ul>"
        );
    
    context.secondaryContent =
        "<img src=\"assets/programmingPlaceholder.jpg\" id=\"programmingPlaceholder\" class=\"programmingPic\">" +
        "<img src=\"assets/fantasyFootballRacePic.jpg\" id=\"fantasyFootballRacePic\" class=\"programmingPic\">" +
        "<img src=\"assets/githubHome.jpg\" id=\"githubHomePic\" class=\"programmingPic\">" +
        "<img src=\"assets/githubPersonalWebsite.jpg\" id=\"githubPersonalWebsitePic\" class=\"programmingPic\">" +
        "<img src=\"assets/githubChateauDaimyo.jpg\" id=\"githubChateauDaimyoPic\" class=\"programmingPic\">";

    res.render("primaryView", context);
});

app.get("/creativePursuits", function(req,res,next)
{
    var context = {};

    context.page = "creativePursuits";

    context.primaryContentHeader = "Creative Pursuits";

    context.primaryContent = "{{joe edit this}} I enjoy photography and photography! Links to the right!"

    context.secondaryContent =
        "<ul>" +
        "<li><a href=\"photography\">Music</a></li>" +
        "<br/>" +
        "<li><a href=\"photography\">Photography</a></li>" +
        "</ul>";

    res.render("primaryView", context);
});

app.get("/contact", function(req,res,next)
{
    var context = {};

    context.page = "contact";

    context.primaryContentHeader = "Contact";

    context.primaryContent =
        "Looking to get in touch?" +
        "<br/>" +
        "<br/>" +
        "Please direct any inquiries to my public contact box {{$$EMAIL HERE$$}}.";

    context.secondaryContent = "Hey! I'll put something over here when I think of something good!";

    res.render("primaryView", context);
});

app.get("/music", function(req,res,next)
{
    var context = {};

    context.page = "music";

    context.primaryContentHeader = "music";

    context.primaryContent =
        "I'm very fond of photography and enjoy playing guitar, but don't make enough time for it." +
        "<br/>" + 
        "<a href=\"creativePursuits\">Back to Creative Pursuits</a>";

    context.secondaryContent =
       "<div id=\"recordingList\">" +
       "<em>\"Black Eyed Dog\"</em> (Nick Drake cover)" +
       "<br/>" +
       "- Featuring Giselle on the dogtags" +
       "<br/>" +
       "<audio controls class=\"audioPlayer\">" +
       "<source src=\"assets/Black%20Eyed%20Dog.mp3\" type = \"audio/mpeg\">" +
       "</audio>" +
       "<br/>" +
       "(click the down arrow to download)" +
       "<br/>" +
       "<br/>" +
       "I hope to put more items here soon, but ran out of time to properly record more songs!" +
       " </div>";

    res.render("primaryView", context);
});

app.get("/photography", function(req,res,next)
{
    var context = {};

    context.page = "photography";

    context.primaryContentHeader = "Photography";

    context.primaryContent = "{{$$PIC_PRIM_CONTENT$$}}";

    context.secondaryContent = "{{$$PIC_SEC_CONTENT$$}}";

    res.render("primaryView", context);
});

app.get('/*', function(req,res,next)
{
    var context = {};

    context.primaryContentHeader = "You've fallen off the map!";

    context.primaryContent = "Here there be dragons - use the navbar above to return to charted territory!";

    context.secondaryContent = "{{$$LOST PAGE PLACEHOLDER$$}}";

    res.render("primaryView", context);
});

/*error handlers*/
app.use(function(req,res){
    res.status(404);
    res.render("404");
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.type("plain/text");
    res.status(500);
    res.render("500");
});

/*log server start to server console*/
app.listen(app.get("port"), function(){
    console.log("Express started on http://localhost:" + app.get("port") + " on " + (new Date().toDateString()) + " at " + (new Date().toTimeString()) + "; press Ctrl-C to terminate.");
});