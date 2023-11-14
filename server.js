const express = require("express");
const app = express();
const Joi = require("joi");
const multer = require("multer");
app.use(express.static("public"));
app.use(express.json());
const cors = require("cors");
app.use(cors());

const upload = multer({ dest: __dirname + "/public/images"});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

let animal = [
    {
        _id: 1,
        name: "Lion",
        color: "Brown",
        size: "8-9ft long",
        located: ["Africa, India"],
        diet: "Carnivore",
        image: "images/lion.avif "
    },
    {
        _id: 2,
        name: "Penguin",
        color: "Black and White",
        size: "3-4ft",
        located: ["Antarctica", "Southern Hemisphere"],
        diet: "Carnivore",
        image: "images/penguin.jpeg",
    },
    {
        _id: 3,
        name: "Dolphin",
        color: "Gray",
        size: "6-7ft",
        located: ["Oceans worldwide"],
        diet: "Carnivore",
        image: "images/dolphin.jpeg",
    },
    {
        _id: 4,
        name: "Elephant",
        color: "Gray",
        size: "Up to 13ft tall",
        located: ["Africa", "Asia"],
        diet: "Herbivore",
        image: "images/elephant.jpeg",
    },
    {
        _id: 5,
        name: "Koala",
        color: "Gray",
        size: "About 2 feet tall",
        located: "Australia",
        diet: "Herbivore",
        image: "images/koala.jpeg",
      },
      {
        _id: 8,
        name: "Clownfish",
        color: "Orange with black and white stripes",
        size: "Up to 4 inches",
        located: ["Coral reefs in the Pacific and Indian Oceans"],
        diet: "Omnivore",
        image: "images/clownfish.jpeg",
      }
];

app.get("/api/animal", (req, res) => {
    res.send(animal);
});

app.post("/api/animal", upload.single("img"), (req, res) => {
    const result = validAnimal(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const addAnimal = {
        _id: animal.length + 1,
        name: req.body.name,
        color: req.body.color,
        size: req.body.size,
        located: req.body.located.split(","),
        diet: req.body.diet,
        image: req.body.image,
        
    }

    animal.push(addAnimal);
    res.send(addAnimal);
});

const validAnimal = (animal) => {
    const schema = Joi.object({
        _id: Joi.allow(""),
        name: Joi.string().min(3).required(),
        color: Joi.string().min(3).required(),
        size: Joi.string().min(3).required(),
        located: Joi.array().items(Joi.string().min(3)).required(),
        diet: Joi.string().min(3).required(),
        image: Joi.string().allow(""),
       
    });

    return schema.validate(animal);
};

app.listen(3000, () => {
    console.log("I'm Listening");
});