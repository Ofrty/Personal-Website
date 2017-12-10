/*Global Variables*/
const INTERVAL = 2000;
const PIC_COUNT = document.getElementsByClassName("homeCarouselPictureContainer").length;

main();

function main()
{
    //build navbar on every page
    buildNavbar();

    //add click trigger for homepage's carousel
    if(document.getElementById("homeCarouselContainer") !== null)
    {
        document.getElementById("homeCarouselActivator").addEventListener("click", runHomeCarouselWrapper);
    }
}

/*buildNavbar() will create the same navbar on any page that has a <div id="navbar">*/
/*to add or remove a button: 1: change BUTTON_COUNT, 2: change navButtonAttribues.names & .links */
function buildNavbar()
{
    const BUTTON_COUNT = 4;

    //create the bar components
    var bar = document.getElementById("navbar");
    var navButtons = [];

    //create and append buttons buttons via a loop
    for (var i = 0; i < BUTTON_COUNT ; i++)
    {
        navButtons.push(document.createElement("button"));
    }

    //set button names
    var navButtonAttributes =
    {
        names: [],
        links: []
    };
    navButtonAttributes.names.push("Home", "Programming", "Music", "Photography");
    navButtonAttributes.links.push("home.html", "programming.html", "music.html", "photography.html");

    //style buttons
    forEachButton(navButtons, navButtonAttributes, formatNavButtons);

    //build the damn thing
    //append buttons via a loop
    for (var i = 0; i < BUTTON_COUNT ; i++)
    {
        bar.appendChild(navButtons[i]);
    }
}

/*for each function that does something for every button in the navbar*/
function forEachButton(buttons, buttonAttributes, formatNavButtons)
{
    for (var i = 0; i < buttons.length; i++)
    {
        formatNavButtons(buttons[i], buttonAttributes.names[i], buttonAttributes.links[i]);
    }
}

/*formatButton()formats each button in the navbar*/
function formatNavButtons(button, buttonName, buttonLink)
{
    button.classList += " nav_button";
    button.textContent = buttonName;
    button.setAttribute("onclick", "window.location.href=\'" + buttonLink + "\'");
}

/*runHomeCarouselWrappers() simply calls the runHomeCarousel function with args*/
function runHomeCarouselWrapper()
{
    runHomeCarousel(0, INTERVAL, PIC_COUNT);
}

/*runHomeCarousel() will automatically run the carousel on the home page*/
function runHomeCarousel(picNumber, INT, COUNT)
{
    //remove the event listener so it can't be activated multiple times
    document.getElementById("homeCarouselActivator").removeEventListener("click", runHomeCarouselWrapper);

    //update IDs and manage picNumber
    var oldId = "homeCarouselPic" + picNumber;


    if (picNumber === COUNT)
    {
        picNumber = 1;
    }
    else
    {
        picNumber += 1;
    }

    var newId = "homeCarouselPic" + picNumber;

    //out with the old, in with the new
    if(document.getElementById(oldId)) //account for when pic starts at 0
    {
        document.getElementById(oldId).style.display = "none";
    }
    document.getElementById(newId).style.display = "inline";

    //auto-run the carousel
    setTimeout(runHomeCarousel, INT, picNumber, INT, COUNT);
}