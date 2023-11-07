
let tachesLocalStorage = JSON.parse(localStorage.getItem('acces'));
let taches = tachesLocalStorage || [];
let inputTache;
let tacheModifier;

// Fonction pour ajouter une tâche
function ajoutTache() {
  inputTache = document.getElementById("inputTache");
  let tacheText = inputTache.value;
  if (tacheText !== "") {
    taches.unshift(tacheText);
    inputTache.value = "";
    affichage();
  }
}
// la date 
let date1 = new Date();
let jour = date1.getDate();
let mois = date1.getMonth();
let année = date1.getFullYear();
mois += 1

if (jour < 10) {
  jour = '0' + jour;
};
if (mois < 10) {
  mois = '0' + mois;
};

let ajoutBtn = document.querySelector('#ajoutBtn');
let modifBtn = document.querySelector('#editing');
modifBtn.classList.add('vide')

function affichage() {
  const ListTache = document.getElementById("ListTache");
  ListTache.innerHTML = "";

  taches.forEach((tache, index) => {
    const listItem = document.createElement("li");
    ListTache.appendChild(listItem);
    listItem.classList.add("lii");
    const tacheText = document.createTextNode(tache);
    listItem.appendChild(tacheText);
    
    let date = document.createElement("div");
    date.className = "espace";
    date.textContent = `${jour}/${mois}/${année}`;
    localStorage.setItem('acces', JSON.stringify(taches));
    listItem.appendChild(date);
    
    let actions = document.createElement("div");
    actions.className = "actions";
    
    const editBtn = document.createElement("button");
    editBtn.className = "modif";
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square fs-2"></i>';
    actions.appendChild(editBtn);
    
    editBtn.addEventListener("click", function () {
        ajoutBtn.classList.add('vide')
        modifBtn.classList.remove('vide')
        
        tacheModifier = document.querySelector('#inputTache');
        tacheModifier.value = taches[index]
        
        modifBtn.addEventListener('click', function () {
            taches[index] = tacheModifier.value;
            localStorage.setItem('acces', JSON.stringify(taches));
            modifBtn.classList.add('vide')
            ajoutBtn.classList.remove('vide')
            location.reload()
            affichage();
        })
    });
    
    const deletBtn = document.createElement("button");
    deletBtn.className = "suprim";
    deletBtn.innerHTML = '<i class="fa-solid fa-trash-can fs-2"></i>';
    actions.appendChild(deletBtn);
    listItem.appendChild(actions);

    deletBtn.addEventListener("click", function () {
      listItem.remove(index);
      taches.splice(index, 1);
      localStorage.setItem('acces', JSON.stringify(taches));
    });
    localStorage.setItem('acces', JSON.stringify(taches));
  });
}
affichage();

taches.forEach(() => {
  affichage();
  localStorage.setItem('acces', JSON.stringify(taches));
})



