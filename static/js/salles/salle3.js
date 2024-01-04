const panorama = new PANOLENS.ImagePanorama('/static/content/viewer/salles/salle3.webp');
const salle3 = new PANOLENS.Viewer({output: 'console'});
let ouverts = [];

function verifier_ouverts(text) {
    document.getElementById("text-notification").innerText = "...";
    if (!(ouverts.includes(text))) {
        ouverts.push(text);
        if (ouverts.length === 4) {
            panorama.remove(infospot_porte_ouverte1);
            definir_infospot(panorama, infospot_porte_ouverte2, -714.66, -615.77, 5000.00, "Porte ouverte", href_salle1_Oui);
            infospot_porte_ouverte2.show();
            document.getElementById("text-notification").innerText = "Une porte semble s'être dévérouillée dans la salle précedente";
        }
    }
}

function definir_infospot(pano, infospot, x, y, z, text, href) {
    infospot.position.set(x, y, z);
    infospot.addHoverText(text, 50);
    infospot.addEventListener("click", function () {
        window.location.href = href;
        this.focus();
        verifier_ouverts(text);
    });
    pano.add(infospot);
}

let infospot_bureau = new PANOLENS.Infospot(300);
definir_infospot(panorama, infospot_bureau, -5000.00, -1162.29, -2227.07, "Tas de papiers", "#_papier_3");
let infospot_ordinateur = new PANOLENS.Infospot(300);
definir_infospot(panorama, infospot_ordinateur, 5000.00, -716.24, 4844.97, "Ordinateur des années 90", "#_ordinateur");
let infospot_amande = new PANOLENS.Infospot(300);
definir_infospot(panorama, infospot_amande, 5000.00, -834.45, 2922.16, "Bouteille en métal", "#_amande");
let infospot_ouija = new PANOLENS.Infospot(300);
definir_infospot(panorama, infospot_ouija, 1016.56, -1073.06, -5000.00, "Planche de ouija", "#_ouija");
let infospot_machine = new PANOLENS.Infospot(300);
definir_infospot(panorama, infospot_machine, -5000.00, -35.38, 144.68, "Image d'une machine", "#_machine");
let infospot_porte_ouverte1 = new PANOLENS.Infospot(300);
let infospot_porte_ouverte2 = new PANOLENS.Infospot(300);
definir_infospot(panorama, infospot_porte_ouverte1, -714.66, -615.77, 5000.00, "Porte ouverte", href_salle1_Non);

salle3.add(panorama);