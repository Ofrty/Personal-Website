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

    //photography page gallery viewer
    if (document.getElementById("photographyList"))
    {
        galleryInit();
    }
}

/**home**/
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

/*formatButton() formats each button in the navbar*/
function formatNavButtons(button, buttonName, buttonLink)
{
    button.classList += " nav_button";
    button.textContent = buttonName;
    button.setAttribute("onclick", "window.location.href=\"" + buttonLink + "\"");
}

/**programming**/
/*
* programmingPicPreviews() is the main handler for the title hover -> pic preview effects on the programming page.
* If the elem ID in the list is detected in the assets as a JPG, then add mouseover and mouseout event listeners
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

/*handles the behavior of pictures when hovering over their titles*/
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

/*handles the behavior of pictures when the cursor is moved off of their title*/
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

/**photography**/ //TODO: netherlands domtower pic dimensions wrong on export TODO: scroll bar for gallery broken on netherlands, may be related to domtower dimensions issue
/*initialize the photo gallery structure and control*/
function galleryInit()
{
    //init photog list listeners
    photoListInit();
}

/*create and insert gallery elements*/
function galleryElements()
{
    //create and insert gallery DOM elements. container; main pic; thumb container; caption box
    var contentContainer = document.getElementById("contentContainer"); //reference point for insertion

    //overlay for dimming
    var overlay = document.createElement("div");
    overlay.setAttribute("id", "overlay");

    //create container
    var galleryContainer = document.createElement("div");
    galleryContainer.setAttribute("id","galleryContainer");

    //create main pic img & div
    var galleryMainPicContainer = document.createElement("div");
    galleryMainPicContainer.setAttribute("id","galleryMainPicContainer");
    var galleryMainPicImg = document.createElement("img");
    galleryMainPicImg.setAttribute("id","galleryMainPicImg");

    //create caption
    var galleryCaption = document.createElement("div");
    galleryCaption.setAttribute("id","galleryCaption");
    galleryCaption.textContent = "CAPTION TEXT";

    //create thumb container
    var thumbContainer = document.createElement("div");
    thumbContainer.setAttribute("id", "thumbContainer");

    //append
    document.getElementsByTagName("body")[0].appendChild(overlay);
    galleryMainPicContainer.appendChild(galleryMainPicImg);
    galleryContainer.appendChild(galleryMainPicContainer);
    galleryContainer.appendChild(galleryCaption);
    galleryContainer.appendChild(thumbContainer);
    contentContainer.parentNode.insertBefore(galleryContainer, contentContainer.nextSibling);
}

/*sets event listeners on the photo list items*/
function photoListInit()
{
    //get list
    var galList = document.getElementById("photographyList");

    //set event listeners on all children
    for (var i = 0; i < galList.children.length; i++)
    {
        var tempText = galList.children[i].textContent;

        galList.children[i].addEventListener("click", function(t)
            {
                return function ()
                {
                    galleryRun(t);
                }
            }(tempText)
        );
    }
}

/*displays the gallery based on user selection. assembles gallery after pic names received from server*/
//TODO: escape key closes gallery, left & right navigate left and right
function galleryRun(gal)
{
    //create and insert gallery elements
    galleryElements();

    //prep data to post to server; folder name
    var data = {};
    data.folder = (gal.toLowerCase() + "/");

    //create and prep
    var req = new XMLHttpRequest();
    req.open("POST", "public/assets/photography/" + gal.toLowerCase(), true);
    req.setRequestHeader("Content-Type", "application/json");
    var res = null;

    //do all the stuff from the request after it loads
    req.addEventListener("load", function()
    {
        //do all the stuff if the request was successful
        if (req.status >= 200 && req.status < 400)
        {
            //local confirmation message and parse server response
            console.log(req.statusText + " - request and response successful");
            res = JSON.parse(req.response);

            //prep gal objects
            var overlay = document.getElementById("overlay");
            var galContainer = document.getElementById("galleryContainer");
            var thumbContainer = document.getElementById("thumbContainer");
            var tempThumb;
            var tempImg;

            //create and append one thumb per file, including hover behavior
            for (var file in res.fileNames)
            {
                //create thumb container, adding an event listener to make it selectable as the main img
                tempThumb = document.createElement("div");
                tempThumb.classList.add("thumb");
                var addr = ("assets/photography/" + data.folder + "full/" + res.fileNames[file]);

                //when mousing over a thumb, make it the main pic; run via a closure
                (function(a)
                {
                    tempThumb.addEventListener("mouseover", function ()
                    {
                        galFocus(a);
                    }, false);
                }(addr));

                //create the thumb image object itself, and set it to the current file
                tempImg = document.createElement("img");
                tempImg.setAttribute("src", "assets/photography/" + data.folder + "thumb/" + res.fileNames[file]);

                //attach the objects
                tempThumb.appendChild(tempImg);
                thumbContainer.appendChild(tempThumb);
            }

            //autoset the main img to the first picture
            galFocus("assets/photography/" + data.folder + "full/" + res.fileNames[0]);

            //create the close gal button, along with an event listener that hides the gallery, deletes the thumbs, undims
            var closeGal = document.createElement("button");
            closeGal.setAttribute("id","closeGal");
            closeGal.textContent = "Close Gallery";
            closeGal.addEventListener("click", function()
            {
                //undim
                overlay.style.opacity = "0.0";

                //delete the gallery
                galContainer.parentNode.removeChild(galContainer);
            });

            //append close button
            galContainer.appendChild(closeGal);

            //dim the background
            overlay.style.opacity = "0.75";

            //show the gallery
            galContainer.style.visibility =  "visible";
        }
        else
        {
            alert("Error receiving images from server.");
            console.log("Error " + req.statusText);
        }
    });

    //send the request
    req.send(JSON.stringify(data));
}

/*swaps the main pic of the gallery via fade transition*/
//TODO: fix focusing behavior. was trying to base it off of the fade in/out funcs that I used for the programming page
function galFocus(imgSrc)
{
    console.log("setting main pic to " + imgSrc);

    //find the cur main image
    var main = document.getElementById("galleryMainPicImg");

    //fade out the old pic
//    fadeOut(main, 1);

    //set the new pic
    main.setAttribute("src", imgSrc);

    //fade in the new pic
//    fadeIn(main, 1);
}