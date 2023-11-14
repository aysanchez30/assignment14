const getAnimals = async () => {
    try{
        return (await fetch("/api/animal")).json();
    }catch(error){
        console.log(error);
    }
};

const displayAnimal = async () => {
    let animal = await getAnimals();
    let animalDiv = document.getElementById("animal-list");
    animal.forEach((animal) => {
        const section = document.createElement("section");
        animalDiv.append(section);

        const a = document.createElement("a");
        a.href = "#"
        section.append(a);

        h3 = document.createElement("h3");
        h3.innerHTML = animal.name;
        a.append(h3);

        a.onclick = (e) => {
            e.preventDefault();
            displayAnimal(animal);
        };
    });
};

const displayAnimals = (animal) => {
    const animalData = document.getElementById("animal-info");
    animalData.innerHTML = " ";

    const color = document.createElement("p");
    color.innerHTML = `<strong>Color: </strong> ${animal.color}`;
    animalData.append(color);

    const size = document.createElement("p");
    size.innerHTML = `<strong>Family: </strong> ${animal.size}`;
    animalData.append(size);

    const located = document.createElement("p");
    located.innerHTML = `<strong>Place: </strong> ${animal.located}`;
    animalData.append(located);

    const diet = document.createElement("p");
    diet.innerHTML = `<strong>Growth: </strong> ${animal.diet}`;
    animalData.append(diet);

    const image = document.createElement("img");
    image.src = animal.image;
    animalData.append(image);

    const d = document.createElement("ul");
    animalData.appendChild(d); 
    animal.forEach((item) => { 
        const li = document.createElement("li");
        d.appendChild(li);
        li.innerHTML = item;
    });

    const deleteLink = document.createElement("a");
    deleteLink.innerHTML = "&#x2715;";
    deleteLink.id = "delete"; 
    animalData.appendChild(deleteLink);

    const editLink = document.createElement("a");
    editLink.innerHTML = "&#9998;";
    editLink.id = "edit"; 
    animalData.appendChild(editLink);

    deleteLink.onclick = (e) => {
        e.preventDefault();
        
    };

    editLink.onclick = (e) => {
        e.preventDefault();
        document.querySelector(".dialog").classList.remove("transparent");
        document.getElementById("title").innerHTML = "Edit Animal Info";
    };

    populateEditForm(animal);
};

const populateEditForm = (animal) => {

};

const addAnimal = async(e) => {
    e.preventDefault();
    const form =  document.getElementById("edit-animal");
    const formInfo = new FormData(form);
    const imageInput = form.querySelector("#image");
    if (imageInput && imageInput.files.length > 0) {
        formInfo.append("image", imageInput.files[0]);
    }

    formInfo.append("animal", getAnimal());
    formInfo.append("name", form.name.value);
    formInfo.append("color", form.color.value);
    formInfo.append("size", form.size.value);
    formInfo.append("located", form.located.value);
    formInfo.append("diet", form.diet.value);
    

    let response;

    if(form._id.value == -1){
        formInfo.delete("_id");
        formInfo.delete("img");
        

        console.log(...formInfo);

        response = await fetch("/api/animal", {
            method: "POST",
            body: formInfo
        });

    }

    if(response.status != 200){
        console.log("Posting Error");
        return;
    }

    
    resetForm();
    document.querySelector(".dialog").classList.add("transparent");
    displayAnimal();
};

const getAnimal = () => {
    const inputs = document.querySelectorAll("#description input");
    let animals = [];

    inputs.forEach((input) => {
        animals.push(input.value);
    });

    return animals;
};

const resetForm = () => {
    const form = document.getElementById("edit-animal");
    form.reset();
    form._id = "-1";
    document.getElementById("description").innerHTML = "";
};

const showHideAdd = (e) => {
    e.preventDefault();
    document.querySelector(".dialog").classList.remove("transparent");
    document.getElementById("title").innerHTML = "Add Animal";
    resetForm();
};




window.onload = () => {
    displayAnimal();
    document.getElementById("edit-animal").onsubmit = addAnimal;
    document.getElementById("add").onclick = showHideAdd;

    document.querySelector(".close").onclick = () => {
        document.querySelector(".dialog").classList.add("transparent");
    };

    
};