Prepare development environment with:

    npm install coffee-script -g
    npm install smoosh

Build with the following commands:

    cake clean
    cake compile
    cake smoosh

h2. Notes to self on how to setup github project page. 

This assumes I want to publish the contents of the `www` folder as a demo of this project.

    git branch gh-pages
    git checkout gh-pages
    git merge master
    touch index.html
    git add .
    git commit -m 'Added redirect page'
    git push origin gh-pages

The `index.html` file can contain documentation, project information, a link to the demo at `www/index.html`, or even just a meta refresh redirect to `www/index.html`:

    <!doctype html>
    <head>
      <meta HTTP-EQUIV="REFRESH" content="0; url=www/index.html">
    </head>
    </html>

To make further changes:

    git checkout master
    (make any changes)
    git status
    git add .
    git commit -m 'Changes to master'
    git checkout gh-pages
    git merge master
    git push

