# Report
## UPDATE: 04/15/2021

Design Choices/Added Features:

1. We decided to switch from Vue.js to EJS because relearning how to implement functionality in Vue was too time consuming. We used Confetti Cuisine as a template and moved component by component. 
2. Updates on our User model to make it more robust, by adding security questions, address, etc. 
3. Added CRUD actions for users and restructured our web application to follow the structure discussed in week 10.
4. Added sessions and cookies to our web application
5. Used passport for handling user sign-up and sign-in
6. Used express validator to reimplement your validations and use sessions to show error messages to users - still need to add validation on every input. Planning to use this library to sanitize user generated html. https://www.npmjs.com/package/sanitize-html 
7. Extend views to show if user has logged in and also handle user logouts
8. Added proper error handling, usually?
9. Added post capability for users, where users are able to upload and post their writing to the website

# SUMMARY: 

## The main push was to get the WYSIWYG editor. (HTML EDITOR) It has a similar UI to editing a Google Doc. No small feat! Need to focus more on input sanitation but that will come. We also have not figured out how to upload images. 

## Also need to add security, ie not anybody can update another users' piece of writing. 

![Drag Racing](sshot.png)


Responsibility Distribution:
Jazmin Barraza: From added features, bullet points from 1 to 4
Marcus Gallegos: From added features, bullet points from 5 to 8

Future Plans:

Adding a follower/following feature for readers and writers
Create a feed of writing for users to read
Ability to upload images for the novels or articles
Filter published vs drafts
Ability to comment and like an article or novel



Instructions to Launch:
npm install
npm run dev
