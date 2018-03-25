/*Global Variables*/
//none

//programming page
//set isOn objects
var isOnList = {};

main();

function main()
{
    //build navbar on every page
    buildNavbar();

    //programming page picture previews
    if (document.getElementById("programmingList"))
    {
        programmingPicPreviews();
    }
}

/*buildNavbar() will create the same navbar on any page that has a <div id="headerNavbar">*/
/*to add or remove a button: 1: change BUTTON_COUNT, 2: change navButtonAttribues.names & .links */
function buildNavbar()
{
    const BUTTON_COUNT = 4;

    var bar = document.getElementById("headerNavbar");
    var navButtons = [];

    //create and append buttons buttons
    for (var i = 0; i < BUTTON_COUNT ; i++)
    {
        navButtons.push(document.createElement("button"));
    }

    //set button names and links
    var navButtonAttributes =
    {
        names: [],
        links: []
    };
    navButtonAttributes.names.push("Home", "Programming", "Creative Pursuits", "Contact");
    navButtonAttributes.links.push("home", "programming", "creativePursuits", "contact");

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

/*
* programmingPicPreviews() is the main handler for the title hover -> pic preview effects on the programming page.
* If the elem ID in the list is detected in the assets as a JPG, then add a mouseover and mouseout event listeners
* to fade in/out the review pics.
* */
function programmingPicPreviews() {
    //get all links
    var list = document.getElementsByClassName("programmingListLink");

    //add a hover event listener to each item in the list
    for (var i = 0; i < list.length; i++)
    {
        list[i].addEventListener("mouseover", function (j)
            {
                return function ()
                {
                    programmingListHoverBehavior(list[j].id);
                }
            }(i)
        );

        list[i].addEventListener("mouseout", function (k)
            {
                return function ()
                {
                    programmingListOutBehavior(list[k].id);
                }
            }(i)
        );
    }
}

function programmingListHoverBehavior(name)
{
    //console.log("hovering over " + name);
    var allPics = document.getElementsByClassName("programmingPic");
    var placeholder = document.getElementById("programmingPlaceholder");
    var inPic = document.getElementById(name + "Pic");

    //turn on the hover indicator
    isOnList[name] = 1;

    //make all images hide except placeholder
    for (var i = 0; i < allPics.length; i++)
    {
        /*allPics[i].style.visibility = "hidden";*/
        placeholder.style.visibility = "visible";
    }

    //make the one with the name fade in; if no pic, then do nothing - placeholder is made visible above
    if (inPic)
    {
        inPic.style.visibility = "visible";
        /*inPic.style.opacity = 1.0; //this in lieu of commented-out fadeInLoop below*/
        placeholder.style.visibility = "hidden";

        (function fadeInLoop(i)
        {
            setTimeout(function()
                {
                    fadeIn(inPic, 0.1);
                    if ((window.getComputedStyle(inPic).getPropertyValue("opacity") < 1.0) && (isOnList[name] === 1))
                    {
                        fadeInLoop(i);
                    }
                }
                , 100)
        })();
    }
}

function programmingListOutBehavior(name)
{
    var outPic = document.getElementById(name + "Pic");

    //turn off the hover indicator
    isOnList[name] = 0;

    if (outPic)
    {
        (function fadeOutLoop()
        {
            setTimeout(function()
                {
                    fadeOut(outPic, 0.1);
                    if ((window.getComputedStyle(outPic).getPropertyValue("opacity") > 0.0) && (isOnList[name] === 0) )
                    {
                       fadeOutLoop();
                    }
                    else
                    {
                        outPic.style.visibility = "hidden";
                    }
                }
                , 100)
        })();
    }

    document.getElementById("programmingPlaceholder").style.visibility = "visible";
}

/*
* fadeIn() increases the opacity of the object passed in the first argument by the amount passed in the second argument.
* Note that, for some reason, the opacity has to be converted to a number before addition can succeed, unlike subtraction
* in the fadeOut() function below.
* */
function fadeIn(obj, delta)
{
    var temp = obj.style.opacity;
    temp = Number(temp) + delta;
    obj.style.opacity = temp;
}

/*
* fadeOut() decreases the opacity of the object passed in the first argument by the amount passed in the second argument.
* */
function fadeOut(obj, delta)
{
    obj.style.opacity -= delta;
}