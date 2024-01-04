const panorama = new PANOLENS.ImagePanorama('/static/content/viewer/salles/salle2.webp');
const salle2 = new PANOLENS.Viewer({output: 'console'});
let ouverts = [];

function verifier_ouverts(text) {
    document.getElementById("text-notification").innerText = "...";
    if (!(ouverts.includes(text))) {
        ouverts.push(text);
        if (ouverts.length === 4) {
            panorama.remove(infospot_porte_ouverte1);
            definir_infospot(panorama, infospot_porte_ouverte2, -1256.54, -543.34, -5000.00, "Porte ouverte", href_salle1_Oui);
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

let wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'blue',
    progressColor: 'black'
});
wavesurfer.load(audio_voix);



let infospot_bureau = new PANOLENS.Infospot(300);
definir_infospot(panorama, infospot_bureau, 3495.83, -860.64, 5000.00, "Tas de papiers", "#_papier_2");
let infospot_camescope = new PANOLENS.Infospot(300);
definir_infospot(panorama, infospot_camescope, 5000.00, -1044.36, -3092.88, "Camescope Antique", "#_camescope");
let infospot_audio_tape = new PANOLENS.Infospot(300);
definir_infospot(panorama, infospot_audio_tape, -2068.11, -797.78, 5000.00, "Casette audio", "#_cassette");
let infospot_cahier = new PANOLENS.Infospot(300);
definir_infospot(panorama, infospot_cahier, -2481.76, -1206.45, 5000.00, "Cahier griffoné", "#_journal");
let infospot_porte_ouverte1 = new PANOLENS.Infospot(300);
let infospot_porte_ouverte2 = new PANOLENS.Infospot(300);
definir_infospot(panorama, infospot_porte_ouverte1, -1256.54, -543.34, -5000.00, "Porte ouverte", href_salle1_Non);

salle2.add(panorama);