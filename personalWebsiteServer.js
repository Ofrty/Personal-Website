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
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const handlebars = require("express-handlebars").create({defaultLayout:"main"});
const fs = require("fs");

app.engine("handlebars", handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "handlebars");
app.set("port", 8657);

/* access control
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
*/

/*homepage*/
app.get("/", function(req,res)
{
    res.redirect('/home');
});

app.get("/home", function(req,res)
{
    const context = {};

    context.page = "home";

    context.primaryContentHeader = "Welcome to my webpage - I'm glad that you're here!";

    /*
    context.primaryContent =
        "A bit about me: I earn my living working with databases and am working to grow creatively as a developer, musician, and photographer." +
        "<br/>" +
        "<br/>" +
        "If you would like to get in touch, please be sure to visit my Contact page." +
        "<br/>" +
        "<br/>" +
        "In the interim, selected programming and creative projects are hosted here for viewing. I hope you find something of interest!" +
        "<br/>" +
        "<br/>" +
        Richard Feynman is a personal hero - ponder some Feynman wisdom!;
    */

    context.primaryContent = {};
    context.primaryContent.a = "A bit about me: I earn my living working with databases and am working to grow creatively as a developer, musician, and photographer.";
    context.primaryContent.b = "If you would like to get in touch, please be sure to visit my Contact page.";
    context.primaryContent.c = "In the interim, selected programming and creative projects are hosted here for viewing. I hope you find something of interest!";
    context.primaryContent.d = "Richard Feynman is a personal hero - ponder some Feynman wisdom!";
    context.primaryContent.e = "Cheers,<br/>Joe";

    context.secondaryContent =
        "<a class=\"twitter-timeline\" data-chrome=\"nofooter transparent\" data-height=\"55vh\" data-theme=\"light\" href=\"https://twitter.com/ProfFeynman?ref_src=twsrc%5Etfw\"></a>";

    res.render("primaryView", context);
});

app.get("/programming", function(req,res)
{
    const context = {};

    context.page = "programming";

    context.primaryContentHeader = "Programming Projects";

    /*TODO: make a GET request to loop through all viewable projects, e.g., ofrty.github.io/jamerator. "GET /repos/:owner/:repo/projects" ; https://developer.github.com/v3/projects/#list-repository-projects*/

    context.primaryContent = {};
    context.primaryContent.a = "Below are links to some of my own programming projects, including GitHub repository links. I have several ideas that I hope to create soon!";
    context.primaryContent.b =
        "<ul id=\"programmingList\">" +
            /*
            "<li><b>Viewable Projects</b></li>" +
            "<ul>" +
                "<li><a id=\"fantasyFootballRace\" class=\"programmingListLink\" href=\"https://scratch.mit.edu/projects/119272648/\"><b>Fantasy Football Draft Race</b></a> - a fun randomizer for my family's FF league, written in MIT's Scratch</li>" +
                // "<li><a id=\"qualityCare\" class=\"programmingListLink\" href=\"https://ofrty.github.io/projects/quality-care/#!/\"><b>Quality Care (in-development)</b></a> - collaborative project, designed to assist non-native speakers seeking medical treatment</li>" +
            "</ul>" +
            */
            "<li><a id=\"githubHome\" class=\"programmingListLink\" href=\"https://github.com/Ofrty/\"><b>GitHub - Public Profile</b></a></li>" +
            "<ul>" +
                "<li><a id=\"githubPersonalWebsite\" class=\"programmingListLink\" href=\"https://github.com/github.ofrty.io\"><b>Personal Webpage Repository</b></a> - how meta!</li>" +
            "</ul>" +
            "<li><b>GitHub - Private Projects</b> (request access approval)</li>" +
            "<ul>" +
                "<li><b>School Projects</b> - various small programs written to satisfy undergraduate-level projects and assignments.</li>" +
                /*"<li><b>Traveling Salesman Insertion Heuristic Implementation</b> - the result of curiosity inspired by a TSP school-project, this is the implementation of an algorithm that occurred to me apropos of nothing. It turned out to be a well-known simple Insertion heuristic.</li>" +
                "<li><b>The Theory</b> - a text-based simulation of a Roulette betting strategy dubbed The Theory, conceived in a late-night conversation. Spoiler alert: the house always wins!</li>" +*/
                "<li><b>ArcanaBall</b> - a text-based game, in development as a proof-of-concept for a larger project.</li>" +
                /*"<li><b>Tabletop NPC Database</b> - a small database of NPCs created for my family Pathfinder game.</li>" +*/
                "<li><b>Raspberry Pi Dashcam</b> - a fork of an extant GitHub/Instructables project to automate a Raspberry Pi-based dashcam. Auto-records when car turns on and geotags video metadata.</li>" +
            "</ul>" +
        "</ul>";

    context.secondaryContent =
        "<img src=\"assets/programmingPlaceholder.jpg\" id=\"programmingPlaceholder\" class=\"programmingPic\">" +
        "<img src=\"assets/fantasyFootballRacePic.jpg\" id=\"fantasyFootballRacePic\" class=\"programmingPic\">" +
        "<img src=\"assets/qualityCare.jpg\" id=\"qualityCarePic\" class=\"programmingPic\">" +
        "<img src=\"assets/githubHome.jpg\" id=\"githubHomePic\" class=\"programmingPic\">" +
        "<img src=\"assets/githubPersonalWebsite.jpg\" id=\"githubPersonalWebsitePic\" class=\"programmingPic\">";

    res.render("primaryView", context);
});

app.get("/creativePursuits", function(req,res)
{
    const context = {};

    context.page = "creativePursuits";

    context.primaryContentHeader = "Creative Pursuits";

    context.primaryContent = {};
    context.primaryContent.a = "Music, photography, running/playing tabletop RPGs, and DIY projects are all hobbies of mine! As I polish off projects worthy of display, I'll host them here!";

    context.secondaryContent =
        "<ul>" +
        "<li><a href=\"photography\">Photography</a></li>" +
        "</ul>";

    //console.log(context); //debug

    res.render("primaryView", context);
});

app.get("/contact", function(req,res)
{
    const context = {};

    context.page = "contact";

    context.primaryContentHeader = "Contact";

    context.primaryContent = {};
    context.primaryContent.a = "Looking to get in touch?";
    //TODO: create public contact email
    context.primaryContent.b = "Please direct any inquiries to my public contact box {{$$EMAIL HERE$$}}.";

    context.secondaryContent = "Hey! I'll put something over here when I think of something good!";

    res.render("primaryView", context);
});
/*
app.get("/music", function(req,res)
{
    const context = {};

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
*/

app.get("/photography", function(req,res)
{
    const context = {};

    context.page = "photography";

    context.primaryContentHeader = "Photography";

    context.primaryContent = {};
    context.primaryContent.a = "The world is a lovely place, and it's fun to capture some of it. On the rare occasions I find myself in areas with low light pollution, I turn my camera skyward.";
    context.primaryContent.b = "Select a gallery from the list to see my select favorites!";

    context.secondaryContent =
        "<div id=\"photographyList\">" +
            "<div>Astrophotography</div>" +
            "<div>The Netherlands</div>" +
            "<div>Doggos</div>" +
        "</div>";

    res.render("primaryView", context);
});

app.post('/public/assets/photography/*', function(req,res)
{
    const context = {};

    fs.readdir('public/assets/photography/' + req.body.folder + 'full/', function (err, files)
    {
        //console.log(files); //debug

        context.fileNames = files;

        res.send(context);
    });
});

app.get('/*', function(req,res)
{
    const context = {};

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

app.use(function(err, req, res){
    console.error(err.stack);
    res.type("plain/text");
    res.status(500);
    res.render("500");
});

/*log server start to server console*/
app.listen(app.get("port"), function(){
    console.log("Express started on http://localhost:" + app.get("port") + " on " + (new Date().toDateString()) + " at " + (new Date().toTimeString()) + "; press Ctrl-C to terminate.");
});