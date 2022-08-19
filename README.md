# Community Bulletin Board

## The Golden Rule:

🦸 🦸‍♂️ `Stop starting and start finishing.` 🏁

If you work on more than one feature at a time, you are guaranteed to multiply your bugs and your anxiety.

## Project Starter Setup

### Overview

[Here](https://whimsical.com/page-wireframes-QKB9N3bD8HbmJDt12t5AHE) is an overview of the app and features that will be added this week.

### Setup Steps

1. GitHub repo
    1. Copy the template repository
    1. Setup Netlify
    1. Clone local
    1. Make dev branch, make sure to push this branch to github
    1. You will create a feature branch off dev for the days work
    1. Work in VS Code as usual
1. Supabase
    1. Make new project (copy password for using tools like beekeeper)
    1. From "auth>settings>email", turn off email confirmations and save
    1. From "sql editor", new script and run starter schema `db/schema.sql`
    1. From "sql editor", new script and run starter category data `db/categories.sql`
    1. From "settings > api", copy URL and Key into `fetch-utils.js`

// 

## `cbb-project-template`
## Profile Upsert & List
For this “feature ticket” assignment, you need to add a profile update page and a list of user profiles page.

Create a new branch from dev called profile-upsert-list

## Planning
Sketch out what each page will look like. On your diagram, identify:

What are the pieces of data required? (down to the field/column level)
What actions take place on the page? (usually means DOM events + page load)
Take a screen shot and include in your repo

## Page & UI
These pages should be “protected”, meaning you need to be logged in to see them.

You can start on either page:

[page] .. [navigation] .. [purpose]
`[/users] .. [Users] .. [show all user profiles in a list format]`

`[/profile] .. [My Profile] .. [edits the currently logged in user’s profile]`

`New Navigation`
Add new navigation options on other pages using the labels specified above:

No nav on /auth page
No self-link on pages (meaning /users should not have link for Users)

`Users`
Though the page is called “users” this is a display of data from the profiles table. If you start with this page, put some data in the table when needed, but be aware that the user id’s need to match signed up users. See below for schema and policy info for this table.

`Profile`
A form for the user to add or edit their profile.

Since we know a user can have one and only one profile row, we can use supabase upsert to either insert or update the row. Because of our policy and row default value for that tables id column, we don’t have to explicitly add a WHERE criteria (eq or match)

## Data
Create and export new functions from fetch-utils.js:

function purpose
getProfiles get all rows from the profiles table
getProfile get a single profile row by user.id (for the profile page, pass in the currently logged in user id). This data is used to prepopulate the form if it exists.
saveProfiles save using an upsert which will insert or update for the current user.

## Database
`Schema`
Notice that the id column is linked to the users.id table and column, and that it defaults to uid(), meaning the calling users id.

profile schema

Add a policy for insert and update.

setting value
policy name Enable insert for users based on user_id
operation INSERT
target roles authenticated
WITH auth.uid() = id
setting value
policy name Enable update for users based on user_id
operation UPDATE
target roles authenticated
USING auth.uid() = id
WITH auth.uid() = id
setting value
policy name Enable select for authenticated users
operation SELECT
target roles authenticated
USING true

## Integration
For knowing who the current user is, you can capture the user from the auth check:

const user = checkAuth();

## Rubric
The following is required for your assignment to be graded:

PR open from profile-upsert-list to dev
PR Passes CI (lint)
PR preview on netlify
Commit with… 20
Planning artifacts 2
Create Profile functionality 6
Update Profile functionality 4
Display all users 6
New Navigation 2
