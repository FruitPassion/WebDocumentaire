const panorama = new PANOLENS.ImagePanorama(`/static/content/viewer/salles/salle1-porte${salle_extension}.webp`);
const salle1 = new PANOLENS.Viewer({output: 'console'});
let ouverts = [];

function verifier_ouverts(text) {
    document.getElementById("text-notification").innerText = "...";
    if (!(ouverts.includes(text))) {
        ouverts.push(text);
        if (ouverts.length === 4 && salle_extension === '0') {
            panorama.remove(infospot_porte_ferme1);
            definir_infospot(panorama, infospot_porte_ouverte1, -852.29, -734.07, 5000.00, "Porte ouverte", href_salle2);
            infospot_porte_ouverte1.show();
            document.getElementById("text-notification").innerText = "Une porte semble s'être dévérouillée";
        }
    }
}

function definir_infospot(pano, infospot, x, y, z, text, href) {
    infospot.position.set(x, y, z);
    infospot.addHoverText(text, 50);
    infospot.addEventListener("click", function () {
        window.location.href = href;
        this.focus();
    });
    pano.add(infospot);

    infospot.addEventListener("click", function () {
        if (!(href === "#")) {
            verifier_ouverts(text);
        }
        else {
            document.getElementById("text-notification").innerText = "La porte ne veut pas s'ouvrir";
        }
    });
}


let infospot_papier = new PANOLENS.Infospot(300);
definir_infospot(panorama, infospot_papier, -3026.40, -762.84, 5000.00, "Tas de papiers", "#_papier_1");
let infospot_reddit = new PANOLENS.Infospot(300);
definir_infospot(panorama, infospot_reddit, -5000.00, 79.02, -2311.38, "Logo étrange", "#_reddit");
let infospot_youtube = new PANOLENS.Infospot(300);
definir_infospot(panorama, infospot_youtube, 4261.72, 243.20, -5000.00, "Plaque commémorative", "#_youtube");
let infospot_wiki = new PANOLENS.Infospot(300);
definir_infospot(panorama, infospot_wiki, 5000.00, 103.71, -507.23, "Bannière étrange", "#_logo-br");


let infospot_porte_ferme1 = new PANOLENS.Infospot(300);
let infospot_porte_ferme2 = new PANOLENS.Infospot(300);
let infospot_porte_ferme3 = new PANOLENS.Infospot(300);
let infospot_porte_ouverte1 = new PANOLENS.Infospot(300);
let infospot_porte_ouverte2 = new PANOLENS.Infospot(300);
let infospot_porte_ouverte3 = new PANOLENS.Infospot(300);


switch (salle_extension) {
    case '0':
        definir_infospot(panorama, infospot_porte_ferme1, -852.29, -734.07, 5000.00, "Porte verouillé", "#");
        definir_infospot(panorama, infospot_porte_ferme2, 2892.54, -658.45, -5000.00, "Porte verouillé", "#");
        definir_infospot(panorama, infospot_porte_ferme3, -5000.00, -609.85, -1199.95, "Porte verouillé", "#");
        break;
    case '1':
        definir_infospot(panorama, infospot_porte_ouverte1, -236.73, -417.58, 5000.00, "Porte ouverte", href_salle2);
        definir_infospot(panorama, infospot_porte_ferme2, 2892.54, -658.45, -5000.00, "Porte verouillé", "#");
        definir_infospot(panorama, infospot_porte_ferme3, -5000.00, -609.85, -1199.95, "Porte verouillé", "#");
        break;
    case '2':
        definir_infospot(panorama, infospot_porte_ouverte1, -236.73, -417.58, 5000.00, "Porte ouverte", href_salle2);
        definir_infospot(panorama, infospot_porte_ouverte2, 2333.22, -378.81, -5000.00, "Porte ouverte", href_salle3);
        definir_infospot(panorama, infospot_porte_ferme3, -5000.00, -609.85, -1199.95, "Porte verouillé", "#");
        break;
    case '3':
        definir_infospot(panorama, infospot_porte_ouverte1, -236.73, -417.58, 5000.00, "Porte ouverte", href_salle2);
        definir_infospot(panorama, infospot_porte_ouverte2, 2333.22, -378.81, -5000.00, "Porte ouverte", href_salle3);
        definir_infospot(panorama, infospot_porte_ouverte3, -5000.00, -328.58, -725.92, "Porte ouverte", href_salle4);
        break;
    default:
        break;
}

salle1.add(panorama);