
function next() {
    document.getElementById('track').play();
    document.getElementById("player-container").classList.remove("hidden");
    opacity("<p>Le vendredi 22 juin 2018, un anonyme poste sur le site 4Chan une photo accompagnée d'un texte...</p>",2);
}

function next2() {
    opacity("<img src='/static/content/intro/first_back.jpg' alt='backrooms'><p>'Si vous ne faites" +
        "pas attention et que vous sortez de la réalité par les mauvais endroits, vous finirez dans les Backrooms, " +
        "où il n'y a rien d'autre que la puanteur de la vieille moquette humide, la folie du mono-jaune, le bruit de " +
        "fond sans fin des néons au maximum, et environ six cents millions de kilomètres carrés de pièces " +
        "vides segmentées de façon aléatoire dans lesquelles vous pourrez être piégé. Que Dieu vous protège si vous " +
        "entendez quelque chose errer dans les parages, car cette chose vous a certainement entendu...'",3)
}

function next3() {
    opacity("<p>En quelques semaines, ce post s'est répendu comme une trainée de poudre sur d'autre forum " +
        "permettant à chacun de rajouter sa brique à l'édifice et d'ajouter du contenu au concept de Backrooms.</p>",4)
}

function next4() {
    opacity("<p>Habituellement, un œuvre de fiction et son univers sont issues d'une seule et même personne." +
        "</br> Cependant, les backrooms ont été créées et imaginées par une communauté de plusieurs milliers de " +
        "personnes qui ne se sont jamais connues ou rencontrées.</br> Voici leur histoire...</p>",5)
}

function opacity(valeur,nombre) {
    document.getElementById("center").style.opacity = "0";
    document.getElementById("up-content").innerHTML = valeur;
    if (nombre === 5) {
        document.getElementById("blink").innerHTML = "<a href='next'><button'>Continuer</button></a>";
    }
    else {
        document.getElementById("blink").innerHTML = "<button onclick='next"+nombre+"()'>Continuer</button>";
    }
    let element = document.getElementById("center");
    let opacity = 0;
    let fadeIn = setInterval(() => {
        if (opacity >= 1) {
            clearInterval(fadeIn);
        }
        element.style.opacity = opacity;
        opacity += 0.01;
    }, 1);
}