<!-- Copy and paste the converted output. -->

<!-----
NEW: Check the "Suppress top comment" option to remove this info from the output.

Conversion time: 0.51 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β29
* Thu Aug 13 2020 12:05:04 GMT-0700 (PDT)
* Source doc: Elementor test - ziv taller
----->
ELEMENTOR FULL STACK TEST - ZIV TALLER \
To run: \
Type <code>docker-compose down && docker-compose up --build -d</code> from the project root.  \
To test set your environment variables and run npm test from without docker.  \
\
SERVER
\
\
*   The server architecture can be described thus: first we have  <strong><code>routing</code></strong> which does just that + input validations, next are <strong><code>middlewares </code></strong>used (here) for authorization. After that come <strong><code>controllers</code></strong>  that invoke the model and return results, and the <strong><code>models</code></strong> themselves (data, entity definitions, complex queries, etc.). This is the actual flow of a request from start to finish.
*   I used <strong><code>mongoose</code></strong> odm on top of <strong><code>mongodb</code></strong>. ORMs are close to an industry standard, so not much to add on that. 
*   I have two entities. User `and Login. Logins reference the user (uni-directional). This enables us to quickly retrieve a user when we need just that, and to still have a complete “history” of logins for a user. (embedding logins would have resulted in huge user documents). 
*   The downside to that choice is a certain complexity when grouping logins per user. Given a few days to rewrite I might scale that down to just hardcode last login time, etc. as fields in the user entity. 
*   Another option is upscaling - use elasticsearch for login history and redis to serve pre-cached searches to the client (currently every client “ping” fires a mongodb search. We can cron that to search every <em>n </em>seconds and cache that in redis). 
*   I used jwt authentication. Upon authentication the user gets jwt that encodes this user’s name. When he comes back to fetch data, the token is decoded, and the username is used to verify that he appears in our db as signed in. This gives the user an improved level of protection from MITM attacks. 
*   I wrote some tests, far from enough, but given the schedule I think they at least demonstrate a working knowledge of the concept and practice.
*   I dockerized the project to make it more likely to run on your machines. Ports can be set in docker-compse.yml or on your own env if running without docker for some reason ;).
*   I added linting late in the day so the code is not as clean as it can be. I realize now it was a mistake not to set it up from the start. I have used it to indent and clean code to a degree. \

CLIENT

*   The client was pretty interesting given that I wrote relatively less and less vanilla in the last 3-4 years. I tried to keep some level of separation between model, view and controller.
*   For inter-script state sharing I use sessionStorage. Given more time i’d come up with something based on listening to and dispatching dom events, but for now it works.
*   I tried at one stage to create tests for the frontend part but it took too much time, given the fact that I have never tested non-framework apps.
*   The Api consuming service is wrapping the fetch api. \
