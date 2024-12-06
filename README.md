<h1>NomNoms     <img src="./sacks/public/logo.png" width=30 height=40></h1>
<h2>Description</h2>
<p>NomNoms is our group’s improvement on Yelp. We didn’t like how impersonal Yelp is, so we sought to create a site where restaurant owners can directly add their restaurants to the site, with users then being able to browse through these restaurants and view the owner’s mentions, along with fellow users’ ratings and comments, to decide where they want to eat.</p>

<h2>Features</h2>
<ol>
  <li>Signup/Login for users and restaurant owners. Upon signup, restaurant owners are asked to provide information about their restaurant which will be stored in the backend</li>
  <li>Live search bar to find restaurants by name</li>
  <li>Rating system that allows each user to give a restaurant a rating of up to 5 stars. The average rating among all users is displayed</li>
  <li>Comments can be made for each restaurant so that all other users can see</li>
  <li>Restaurants can be filtered and viewed through characteristic tags</li>
  <li>Restaurant information such as address, phone number, characteristic tags, website link, and provided image are displayed to the user within each restaurant card</li>
</ol>

<h2>Getting Started</h2>
<p>Before we begin, make sure to have git and node installed</p>

<p> To retrieve the code locally, we are going to have to clone the repository to our local device. First, open your terminal and change to the directory where you want your repository to be stored. Then you can use the following git command to clone.</p>
<pre><code>
  git clone https://github.com/Heborine/CS35L-Project.git
</code></pre>

<p>Now move into the repository</p>
<pre><code>
  cd CS35L-Project
</code></pre>

<h3>Backend</h3>
<p> Next we want to set up our backend. To begin, we need to set up the environment variables. These are private variables that are specific to you and should not be shared. This can be done using the following commands. </p>
<pre><code>
  cd backend
  touch .env
</code></pre>
<p> Enter the .env file using the text editor of your choice and add values for the following variables</p>
<pre><code>
  MongoKey= (input here)
  PassEncryptKey= (input here)
</code></pre>
<p> Currently the program is set up to use a MongoDB database that was initialized by our team. If you would like access to our database you may contact a team member. However, we withhold the right to refuse. If you would like to use your own MongoDB database, you are welcome to modify the index.js file to utilize your specific Mongo URL. Once this is done we can exit the .env file</p>
<p> Before we move on, there are a few downloads necessary for the server to function. These can be seen below</p>
<pre><code>
  npm install mongoose
  npm install bcrypt
  npm install 
</code></pre>
<p>Now we can finally run our server using the following command.</p>
<pre><code>
  node index.js
</code></pre>
