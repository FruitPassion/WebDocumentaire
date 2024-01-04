const panorama = new PANOLENS.ImagePanorama(`/static/content/viewer/salles/salle4_${salle_extension}.webp`);
const salle4 = new PANOLENS.Viewer({output: 'console'});
let ouverts = [];

function verifier_ouverts(text) {
    document.getElementById("text-notification").innerText = "...";
    if (!(ouverts.includes(text))) {
        ouverts.push(text);
        if (ouverts.length === 4 && salle_extension === '0') {
            panorama.remove(infospot_porte_ouverte1);
            panorama.remove(infospot_porte_ferme);
            definir_infospot(panorama, infospot_porte_ouverte2, 591.73, -247.81, -5000.00, "Porte ouverte", href_salle1_Oui);
            definir_infospot(panorama, infospot_porte_ouverte3, 238.18, -238.04, 5000.00, "Porte ouverte", href_salle5);
            infospot_porte_ouverte2.show();
            infospot_porte_ouverte3.show();
            document.getElementById("text-notification").innerText = "Une porte semble s'être dévérouillée";
        }
    }
}

function definir_infospot(pano, infospot, x, y, z, text, href){
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
        } else {
            document.getElementById("text-notification").innerText = "La porte ne veut pas s'ouvrir";
        }
    });
}

let infospot_bureau = new PANOLENS.Infospot(300);
definir_infospot(panorama, infospot_bureau, -5000.00, -905.45, 837.49, "Tas de papiers", "#_papier_4");
let infospot_skinstealer = new PANOLENS.Infospot(300);
definir_infospot(panorama, infospot_skinstealer, 3578.52, 61.30, 5000.00, "SkinStealer", "#_skinstealer");
let infospot_fenetre = new PANOLENS.Infospot(300);
definir_infospot(panorama, infospot_fenetre, 5000.00, -909.28, -1353.00, "Note à coté de fenêtre", "#_window");
let infospot_worms = new PANOLENS.Infospot(300);
definir_infospot(panorama, infospot_worms, 3101.19, 5.31, -5000.00, "WallWorms", "#_wallworms");
let infospot_hound = new PANOLENS.Infospot(300);
definir_infospot(panorama, infospot_hound, -5000.00, 555.83, 2076.44, "Hound", "#_hound");
let infospot_clump = new PANOLENS.Infospot(300);
definir_infospot(panorama, infospot_clump, -5000.00, 311.43, -2543.06, "Clump", "#_clumps");


let infospot_porte_ouverte1 = new PANOLENS.Infospot(300);
let infospot_porte_ouverte2 = new PANOLENS.Infospot(300);
let infospot_porte_ouverte3 = new PANOLENS.Infospot(300);
let infospot_porte_ferme = new PANOLENS.Infospot(300);

switch (salle_extension) {
    case '0':
        definir_infospot(panorama, infospot_porte_ouverte1, 591.73, -247.81, -5000.000, "Porte ouverte", href_salle1_Non);
        definir_infospot(panorama, infospot_porte_ferme, -538.61, -903.59, 5000.00, "Porte verouillé", "#");
        break;
    case '1':
        definir_infospot(panorama, infospot_porte_ouverte2, 591.73, -247.81, -5000.00, "Porte ouverte", href_salle1_Non);
        definir_infospot(panorama, infospot_porte_ouverte3, 238.18, -238.04, 5000.00, "Porte ouverte", href_salle5);
        break;
    default:
        break;
}


salle4.add(panorama);