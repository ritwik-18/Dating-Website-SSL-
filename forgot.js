function validateun() {
    // Retrieve the value of the username input field and remove leading/trailing whitespace
    var username = document.getElementById("username").value.trim();
    
    // Check if the username is not empty
    if (username != "") {
        // Fetch data from 'login.json'
        fetch('login.json') // Fetching data
        .then(function(response) { // Parsing data
            // Check if the response is okay
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Return parsed JSON data
        })
        .then(function(data) {
            // Store the parsed JSON data in 'users'
            var users = data;
            var userindex; // Initializing userindex
            var userexists = false; // Initializing whether the user exists
            
            // Loop through the users array to find the provided username
            for (var i = 0; i < users.length; i++) {
                if (users[i].username == username) {
                    userexists = true;
                    userindex = i;
                    break;
                }
            }
            
            // If user exists, display the secret question and show the input box for the answer
            if (userexists) {
                var secretqn = users[userindex].secret_question;
                document.getElementById("secretqn").textContent = secretqn;
                document.getElementById("qnbox").style.display = "block";
            } else {
                alert("Username not found. "); // Alert if username not found
            }
        })
        .catch(function(error) {
            console.error('There was a problem with the fetch operation:', error); // Log any errors
        });
    } else {
        alert("Please enter a Username."); // Alert if username is empty
    }
}

function checkAnswer() {
    // Retrieve the username and secret answer input values and remove leading/trailing whitespace
    var username = document.getElementById("username").value.trim();
    var secretans = document.getElementById("secretAnswer").value.trim();
    
    // Fetch data from 'login.json'
    fetch('login.json')
    .then(function(response) {
        // Check if the response is okay
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Return parsed JSON data
    })
    .then(function(data) {
        // Store the parsed JSON data in 'users'
        var users = data;
        var userindex;
        
        // Loop through the users array to find the provided username
        for (var i = 0; i < users.length; i++) {
            if (users[i].username == username) {
                userindex = i;
                break;
            }
        }
        
        // Check if the provided secret answer matches the stored secret answer for the user
        if (users[userindex].secret_answer == secretans) {
            var password = users[userindex].password;
            document.getElementById("result").style.display = "block"; // Show the result box
            document.getElementById("password").textContent = "Your Password is: " + password; // Display the user's password
        } else {
            alert("Incorrect answer to the secret question."); // Alert if the answer is incorrect
        }
    })
    .catch(function(error) {
        console.error('There was a problem with the fetch operation:', error); // Log any errors
    });
}
