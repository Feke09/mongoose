// Import mongoose and dotenv
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to MongoDB using the URI stored in .env
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Define the Person Schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is required
  },
  age: {
    type: Number,
    default: 0, // Default value for age is 0
  },
  favoriteFoods: {
    type: [String], // Array of strings
    required: true, // favoriteFoods is required
  },
});

// Create the Person model based on the schema
const Person = mongoose.model("Person", personSchema);

module.exports = Person;

// Create a new Person instance
const newPerson = new Person({
  name: "John Doe",
  age: 25,
  favoriteFoods: ["Pizza", "Burgers", "Ice Cream"],
});

// Save the person instance to the database
newPerson.save(function (err, data) {
  if (err) {
    console.log("Error saving person:", err);
  } else {
    console.log("Person saved:", data);
  }
});

const arrayOfPeople = [
  { name: "Alice", age: 30, favoriteFoods: ["Tacos", "Sushi"] },
  { name: "Bob", age: 22, favoriteFoods: ["Pizza", "Burger"] },
  { name: "Charlie", age: 27, favoriteFoods: ["Salad", "Pasta"] },
];

// Create and save multiple records
Person.create(arrayOfPeople, function (err, data) {
  if (err) {
    console.log("Error creating people:", err);
  } else {
    console.log("People created:", data);
  }
});

// Find all people named "Alice"
Person.find({ name: "Alice" }, function (err, people) {
  if (err) {
    console.log("Error finding people:", err);
  } else {
    console.log("Found people:", people);
  }
});

// Find one person who likes "Pizza"
Person.findOne({ favoriteFoods: "Pizza" }, function (err, person) {
  if (err) {
    console.log("Error finding person:", err);
  } else {
    console.log("Found person:", person);
  }
});

// Assume personId is the MongoDB _id
const personId = "your-person-id-here";

// Find person by _id
Person.findById(personId, function (err, person) {
  if (err) {
    console.log("Error finding person by ID:", err);
  } else {
    console.log("Found person by ID:", person);
  }
});

// Find a person by _id and add "hamburger" to their favoriteFoods
Person.findById(personId, function (err, person) {
  if (err) {
    console.log("Error finding person:", err);
  } else {
    person.favoriteFoods.push("Hamburger"); // Add 'hamburger' to the list
    person.save(function (saveErr, updatedPerson) {
      if (saveErr) {
        console.log("Error saving updated person:", saveErr);
      } else {
        console.log("Updated person:", updatedPerson);
      }
    });
  }
});

// Update a person's age by their name (set age to 20)
Person.findOneAndUpdate(
  { name: "Alice" }, // Search by name
  { age: 20 }, // Update age to 20
  { new: true }, // Return the updated document
  function (err, updatedPerson) {
    if (err) {
      console.log("Error updating person:", err);
    } else {
      console.log("Updated person:", updatedPerson);
    }
  }
);

// Delete a person by _id
Person.findByIdAndRemove(personId, function (err, deletedPerson) {
  if (err) {
    console.log("Error deleting person:", err);
  } else {
    console.log("Deleted person:", deletedPerson);
  }
});

// Remove all people named "Mary"
Person.remove({ name: "Mary" }, function (err, result) {
  if (err) {
    console.log("Error removing people:", err);
  } else {
    console.log("Removed people:", result);
  }
});

Person.find({ favoriteFoods: "Burritos" })
  .sort({ name: 1 }) // Sort by name (ascending)
  .limit(2) // Limit the results to 2 documents
  .select("name favoriteFoods") // Only select name and favoriteFoods (exclude age)
  .exec(function (err, data) {
    if (err) {
      console.log("Error executing query:", err);
    } else {
      console.log("Filtered and sorted people:", data);
    }
  });
