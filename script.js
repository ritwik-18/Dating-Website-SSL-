

// Function to retrieve the selected gender
function getGender() {
    const gendInp = document.getElementsByName("gender");
    for (const gend of gendInp) {
        if (gend.checked) {
            return gend.value; // Return the selected gender
        }
    }
    return null; // Return null if no gender is selected
}

// Function to retrieve the entered age
function getAge() {
    const Ageinp = document.getElementById('age').value;
    return Ageinp; // Return the entered age
}

// Function to retrieve the selected interests from checkboxes
function inputInterests() {
    var matrix = [];
    var checkboxes = document.getElementsByName('interests');
    for (var i = 0; i < checkboxes.length; i++) {
        var checkbox = checkboxes[i];
        if (checkbox.checked) {
            var label = checkbox.value;
            matrix.push(label); // Add the selected interest to the matrix
        }
    }
    return matrix; // Return the matrix of selected interests
}

// Function to retrieve the selected hobbies from checkboxes
function inputHobbies() {
    var matrix = [];
    var checkboxes = document.getElementsByName('hobbies');
    for (var i = 0; i < checkboxes.length; i++) {
        var checkbox = checkboxes[i];
        if (checkbox.checked) {
            var label = checkbox.value;
            matrix.push(label); // Add the selected hobby to the matrix
        }
    }
    return matrix; // Return the matrix of selected hobbies
}

// Function to find the best match
function findMatch() {
    // Retrieve user's name and store it in local storage
    var UsName = document.getElementById('name').value;
    localStorage.setItem('Name',UsName);

    // Retrieve user inputs
    const inputGender = getGender();
    const inputInterestsArray = inputInterests();
    const inputHobbiesArray = inputHobbies();

    // Fetch data from students.json
    fetch('students.json')
        .then(function(response) {
            return response.json(); // Parse the JSON data
        })
        .then(function(studentsData){
            const matchScores = {};
            var userfound = false;

            // Iterate through each student in the data
            for (var i = 0; i < studentsData.length; i++) {
                const student = studentsData[i];
                
                // Check gender compatibility
                if (
                    (inputGender == 'Male' && student.Gender == 'Female') ||
                    (inputGender == 'Female' && student.Gender == 'Male') ||
                    (inputGender == 'Others' && student.Gender == 'Others')
                ) {
                    userfound = true; // Mark user as found
                    // Calculate match score
                    const matchScore = calculateMatchScore(student, inputInterestsArray, inputHobbiesArray);
                    matchScores[student.Name] = matchScore; // Store match score for each student
                }
            }
            // If no user is found, set result to "NotFound"
            if (userfound == false) {
                var result = "NotFound";
                var storedname = localStorage.setItem('name',result); // Store result in local storage
            }
            else {
                // Sort students based on match scores
                const sortedStudents = Object.entries(matchScores).sort(function(a, b) {
                    return b[1] - a[1];
                });

                const topMatch = sortedStudents[0]; // Get the top match
                const topMatchName = topMatch[0]; // Get the name of the top match
                const topMatchScore = topMatch[1]; // Get the match score of the top match

                // Set result to the name of the top match if match score is positive, otherwise set to "NotFound"
                if(topMatchScore>0){
                    var result = topMatchName;
                }
                else{
                    var result = "NotFound";
                }
                // Store result in local storage
                var storedname = localStorage.setItem('name',result);
            }
        })
        .catch(function(error) {
            console.error('Error fetching data:', error); // Log any errors
        });

    // Redirect to the match page after a delay
    setTimeout(function(){window.location.href='match.html';},2000);
}

// Function to calculate match score
function calculateMatchScore(student, inputInterests, inputHobbies) {
    const studentInterests = student.Interests;
    const studentHobbies = student.Hobbies;
    let matchScore = 0;

    // Calculate match score based on shared interests
    inputInterests.forEach(function(interest) {
        if (studentInterests.includes(interest)) {
            matchScore += 10;
        }
    });

    // Calculate match score based on shared hobbies
    inputHobbies.forEach(function(hobby) {
        if (studentHobbies.includes(hobby)) {
            matchScore += 10;
        }
    });

    // Calculate match score based on specific matches
    const specificMatches = [
        ['Travelling', 'Photography'],
        ['Sports', 'Playing'],
        ['Movies', 'Watching YouTube/Instagram'],
        ['Music', 'Playing Musical Instruments'],
        ['Literature', 'Reading'],
        ['Technology', 'Coding'],
        ['Art', 'Painting']
    ];

    specificMatches.forEach(function(pair) {
        const interest = pair[0];
        const hobby = pair[1];
        if (inputInterests.includes(interest) && inputHobbies.includes(hobby)) {
            matchScore += 9; // Specific match score
        }
    });

    return matchScore; // Return the calculated match score
}
