 // ========================================== START CODING BELOW!!
 
//==  based on /07-firebase/03-Day/19-Add_Child/recent-user-with-all-users-solved.html
 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD9hbedQ8pjyzlIFImFPik6NIOBb7MSglg",
    authDomain: "trainschedulerluketomale.firebaseapp.com",
    databaseURL: "https://trainschedulerluketomale.firebaseio.com",
    projectId: "trainschedulerluketomale",
    storageBucket: "trainschedulerluketomale.appspot.com",
    messagingSenderId: "871294063069"
  };
  firebase.initializeApp(config);
    
    var dataRef = firebase.database();
    
    // Initial Values
    var trainName = "";
    var destination = "";
    var firstTrainTime = "";
    var frequency = 0;
    
    // Capture Button Click
    $("#submit-newTrain").on("click", function(event) {
      event.preventDefault();
      
      // YOUR TASK!!!
      // Code in the logic for storing and retrieving the most recent user.
      // Don't forget to provide initial data to your Firebase database.
      trainName = $("#trainName-input").val().trim();
      destination = $("#destination-input").val().trim();
      firstTrainTime = $("#firstTrainTime-input").val().trim();
      frequency = $("#frequency-input").val().trim();
      
      // Code for the push
      dataRef.ref().push({
        
        trainName: trainName,
        destination: destination,
        firstTrainTime: firstTrainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    });
    
    // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    dataRef.ref().on("child_added", function(childSnapshot) {
      
        // Log Time
        var firstTrainTime = moment();
        console.log("FIRST TRAIN TIME: " + moment(firstTrainTime).format("hh:mm"));
    
        // Next Train
        var nextTrain = moment().add(frequency + firstTrainTime);
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

       // Minute Until Train
       var minutesTillTrain = currentTime - firstTrainTime;
       console.log("MINUTES TILL TRAIN: " + minutesTillTrain);

      
      // full list of items to the well
      $("#full-current-train-list").append("<div class='well'><span class='train-name'> " + childSnapshot.val().trainName +
        " </span><span class='train-destination'> " + childSnapshot.val().destination +
          " </span><span class='train-firstTrainTime'> " + childSnapshot.val().train-firstTrainTime +
            " </span><span class='train-frequency'> " + childSnapshot.val().frequency + " </span></div>");
            
      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });
        
    dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
      // Change the HTML to reflect
      $("#trainName-display").text(snapshot.val().trainName);
      $("#destination-display").text(snapshot.val().destination);
      $("#firstTrainTime-display").text(snapshot.val().firstTrainTime);
      $("#frequency-display").text(snapshot.val().frequency);
    });