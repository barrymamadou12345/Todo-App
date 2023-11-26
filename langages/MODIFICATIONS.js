

let tachesLocalStorage = JSON.parse(localStorage.getItem('acces'));
let taches = tachesLocalStorage || [];

let inputTache;
let tacheModifier;
let idCounter = 0; // Compteur d'ID pour chaque tâche

// MODAL DEBUT ///////////////////////////
let modal = document.getElementById("myModal");
let btn = document.getElementById("myBtn");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
}
span.onclick = function () {
  modal.style.display = "none";
}
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// MODAL FIN /////////////////////////

// Fonction pour ajouter une tâche
function ajoutTache() {
  inputTache = document.getElementById("inputTache");
  let tacheText = inputTache.value;
  if (tacheText !== "") {
    const tache = {
      id: idCounter += 1,
      nom: tacheText,
      date: date1.value,
      archive: false,
      termine: false,
    };
    taches.unshift(tache);
    inputTache.value = "";
    date1.value = "";
    affichage();
    localStorage.setItem('acces', JSON.stringify(taches));
  }
  modal.style.display = "none";
}

let ajoutBtn = document.querySelector('#ajoutBtn');
let modifBtn = document.querySelector('#editing');
let date1 = document.querySelector('#date1');
modifBtn.classList.add('vide')

let id;
let listItem;
let tacheText;
let date;
let actions;
let editBtn;
let deletBtn;
let idSupr;
let indxSupr;
let archiveBtn;
let terminBtn;
let fini ;

function affichage() {
  const ListTache = document.getElementById("ListTache");
  ListTache.textContent = "";

  taches.forEach((tache, index) => {
    listItem = document.createElement("li");
    listItem.style.color = ' rgb(3, 79, 102)';
    ListTache.appendChild(listItem);

    id = document.createElement('div');
    id.textContent = tache.id;
    id.className = 'vide';
    listItem.appendChild(id);

    listItem.classList.add("lii");
    tacheText = document.createTextNode(tache.nom);
    listItem.appendChild(tacheText);

    date = document.createElement("div");
    date.className = "espace";
    date.textContent = tache.date;
    listItem.appendChild(date);

    actions = document.createElement("div");
    actions.className = "actions";

    ///////////  Bouton Archiver //////////////
    archiveBtn = document.createElement("button");
    archiveBtn.className = "archiv";
    archiveBtn.innerHTML = '<i class="fa-solid fa-box-archive"></i>';
    actions.appendChild(archiveBtn);

    archiveBtn.addEventListener("click", function () {
      tache.nom = '';
      tache.archive = true ;
      localStorage.setItem('acces', JSON.stringify(taches));
      affichage();
    });

    ///////////  Bouton Terminer //////////////
    terminBtn = document.createElement("button");
    terminBtn.className = "termine";
    terminBtn.innerHTML = '<i class="fa-solid fa-square-check"></i>';
    actions.appendChild(terminBtn);

    terminBtn.addEventListener("click", function () {
      tache.nom += ' ----- Est Terminé !';
      tache.termine = true ;
      localStorage.setItem('acces', JSON.stringify(taches));
      affichage();
    });

    ///////////  Bouton Modifier //////////////
    editBtn = document.createElement("button");
    editBtn.className = "modif";
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square fs-2"></i>';
    actions.appendChild(editBtn);

    editBtn.addEventListener("click", function () {
      modal.style.display = "block";
      ajoutBtn.classList.add('vide')
      modifBtn.classList.remove('vide');
      tacheModifier = document.querySelector('#inputTache');
      tacheModifier.value = tache.nom; // Pré-remplir le nom de la tâche dans le formulaire

      modifBtn.addEventListener('click', function () {
        tache.nom = tacheModifier.value;
        modal.style.display = "none";
        modifBtn.classList.add('vide')
        ajoutBtn.classList.remove('vide')
        tacheModifier.value = "";
        localStorage.setItem('acces', JSON.stringify(taches));
        affichage();
        location.reload();
      });
    });

    ///////////  Bouton Supprimer //////////////
    deletBtn = document.createElement("button");
    deletBtn.className = "suprim";
    deletBtn.innerHTML = '<i class="fa-solid fa-trash-can fs-2"></i>';
    actions.appendChild(deletBtn);
    listItem.appendChild(actions);

    // Supprimer avec L'id 
    deletBtn.addEventListener("click", function () {
      idSupr = tache.id; // Récupérer l'ID de la tâche à supprimer
      indxSupr = taches.findIndex(ta => ta.id === idSupr); // Trouver l'index correspondant!

      if (indxSupr !== -1) {
        listItem.remove(); // Supprimer l'élément HTML
        taches.splice(indxSupr, 1); // Supprimer l'élément du tableau
        localStorage.setItem('acces', JSON.stringify(taches));
        affichage();
      }
    });
    /* // Supprimer avec L'index
      deletBtn.addEventListener("click", function () {
        listItem.remove(index);
        taches.splice(index, 1);
        localStorage.setItem('acces', JSON.stringify(taches));
      });
    */
  });
  localStorage.setItem('acces', JSON.stringify(taches));
}

affichage();

taches.forEach(() => {
  affichage();
  localStorage.setItem('acces', JSON.stringify(taches));
});





