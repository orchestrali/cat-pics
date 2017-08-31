Cat pictures please!
=========================

This app helps motivate you to finish written works and submit them by providing cat pictures (or other animal photos) as rewards. You enter finished works and submissions into an Airtable base, and Glitch retrieves the relevant information and assigns random kitten pictures from Flickr.


Setup
------------

To use this app, you first need to make a copy and connect it to your own Airtable base:
- Click "Remix this" on the top of this page. Glitch will give your new app a random name; you can leave it or change it.
- If you don't have an Airtable account, <a href="https://airtable.com/invite/r/fP4yjeAi" target="_blank">click here</a> to create one. When prompted to add a team, go ahead and create one—it can be a "team" of just you.
- Go to <a href="https://airtable.com/shrXei6C1eejVVC1y" target="_blank">the sample Airtable base here</a> and select "Copy base" in the upper right hand corner. 
- Navigate to your account page in Airtable (<a href="https://airtable.com/account" target="_blank">located here</a>) and click on "Generate API key".
- Copy the API key from Airtable, then find the `.env` file in your glitch app and paste the API key after "AIRTABLE_API_KEY=".
- Go to <a href="https://airtable.com/api" target="_blank">https://airtable.com/api</a>, click on the link to the base you just made, and copy the url of that page. Paste that into `.env` after "AIRTABLE_BASE_URL=".
- Finally, you can delete the sample records in your Airtable base and it's all ready to use!


Using Airtable
------------

In order to receive cat (or other animal) pictures, you'll need to track works and submissions in your Airtable base.

When you add a work record, the `Title` and `Date finished` fields must be filled in for the app to run properly.

When you add a submission record, the `Work` and `Date submitted` fields must be filled. The `Work` field is a link to a record in the Works table. When you start typing in this field, a box will open up showing the works you've already entered in the Works table. You can select one of those records, or click `+ Add new record named...`. If you add a new work record this way, make sure to go back to the Works table and fill in the date finished.

When a submission is accepted and you check off the `Accepted` box, you must also fill in the `Date of response` field.

Any field with an asterisk in its name should not be deleted or renamed, and the Cats table should be left entirely intact.

You are free to create as many fields and/or new tables as you like! You can also create or delete views and hide fields you don't want to see all the time.


Glitch Options
------------

I've come up with an algorithm for awarding one to four cat pictures for each work, submission, and acceptance, but you can change some of the threshholds for bonus cat pictures in the `options.json` file. 

- All works, submissions, and acceptances earn one cat picture to start.
- If the work finished, submitted, or accepted has a wordcount higher than the setting in `options.json`, an extra cat picture is added.
- If a submission is made within x days of a previous rejection of the same work (x being set in `options.json`), a bonus cat picture is added. In other words, you get a bonus for re-submitting a work quickly.
- If a work has been submitted more times than the threshhold set in `options.json`, every subsequent submission will have a bonus cat picture.
- This app is not currently set up to handle more than four cat pictures per thing. If you manage to earn five pictures for something, I don't think it will break, but it might not display correctly. I may fix this soon.

**Most importantly,** you can change the Flickr search term(s) in `options.json`! If there aren't enough results for your search terms, the app will revert to kittens, but you can try whatever you like.

**Not all the pictures from Flickr will actually have cats (or your search term).** If you get an undesired photo, or simply want to change up a photo, find the corresponding record in the Cats table in Airtable and delete it. The next time you open or refresh the glitch app it should find a new photo for you.


---

Made by <a href="https://twitter.com/an_stevens" target="_blank">@an_stevens</a> with help from <a href="https://twitter.com/NReilingh" target="_blank">@NReilingh</a>. Partly inspired by <a href="http://writtenkitten.co" target="_blank">Written? Kitten!</a> Updates may occasionally be found [here](#).

<a href="http://clarkesworldmagazine.com/kritzer_01_15/" target="_blank">Cat Pictures Please</a> is a Hugo Award-winning short story by Naomi Kritzer (not me!).