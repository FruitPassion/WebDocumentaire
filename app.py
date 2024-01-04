from flask import Flask, render_template, url_for, redirect, session, request
from paquets.db_operation import *

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(32)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"


def get_sname():
    return f"{session.get('name')}"


@app.route('/', methods=['POST', 'GET'])
def login():
    if request.method == 'POST' and 'name' in request.form and 'password' in request.form:
        s_name = f'{request.form["name"]}+{request.form["password"]}'
        session["name"] = s_name
        return redirect(url_for('redirection'))
    elif session.get("name"):
        return redirect(url_for('redirection'))
    else:
        return render_template('login.html', titre="S'enregistrer")


@app.route('/redirection', methods=['POST', 'GET'])
def redirection():
    etape = ['intro', 'video', 'back_360', 'credit']
    s_name = session.get("name")
    if check_session(s_name):
        if etape[(get_etape_session(s_name)) - 1] == 'video':
            register_room(s_name, 1)
        elif etape[(get_etape_session(s_name)) - 1] == 'back_360':
            return redirect(url_for(etape[(get_etape_session(s_name)) - 1], salle_num=get_salle_num(s_name)))
        return redirect(url_for(etape[(get_etape_session(s_name)) - 1]))
    else:
        register_session(s_name)
        return redirect(url_for('intro'))


@app.route('/next', methods=['POST', 'GET'])
def valider():
    if not session.get("name") or get_etape_session(get_sname()) == 5:
        return redirect(url_for('login'))
    session_next(get_etape_session(get_sname()), get_sname())
    return redirect(url_for('login'))


@app.route('/intro', methods=['POST', 'GET'])
def intro():
    if (not session.get("name")) or get_etape_session(get_sname()) != 1:
        return redirect(url_for('login'))
    return render_template('intro.html', titre="Intro")


@app.route('/video', methods=['POST', 'GET'])
def video():
    if (not session.get("name")) or get_etape_session(get_sname()) != 2:
        return redirect(url_for('login'))
    return render_template('video.html', titre="Vidéo de BMX")


@app.route('/back-360/next-room/<next_room_num>/<deverouillage>', methods=['POST', 'GET'])
def next_room(next_room_num, deverouillage):
    if (not session.get("name")) or get_etape_session(get_sname()) != 3:
        return redirect(url_for('login'))
    if deverouillage == '1':
        sn = get_sname()
        register_room(sn, int(get_salle_num(sn)) + 1)
    update_room(get_sname(), next_room_num)
    return redirect(url_for('back_360', salle_num=next_room_num))


@app.route('/back-360/<salle_num>', methods=['POST', 'GET'])
def back_360(salle_num):
    if (not session.get("name")) or get_etape_session(get_sname()) != 3:
        return redirect(url_for('login'))
    if salle_num == '1':
        salle_extension = str(int(get_salle_extension(get_sname())) - 1)
    elif salle_num == '4':
        if not verify_room_id(get_sname(), 5):
            salle_extension = 1
        else:
            salle_extension = 0
    else:
        salle_extension = '-1'
    return render_template('render-360.html', titre="Backrooms", salle_num=salle_num, salle_extension=salle_extension)


@app.route('/back-360/credit/', methods=['POST', 'GET'])
def redirect_credit():
    if (not session.get("name")) or get_etape_session(get_sname()) != 3:
        return redirect(url_for('login'))
    return redirect(url_for('credit'))


@app.route('/credit', methods=['POST', 'GET'])
def credit():
    if (not session.get("name")) or get_etape_session(get_sname()) != 3:
        return redirect(url_for('login'))
    return render_template('credits.html', titre="Crédits")


@app.route('/reset', methods=['POST', 'GET'])
def reset():
    if (not session.get("name")) or get_etape_session(get_sname()) != 3:
        return redirect(url_for('login'))
    delete(get_sname())
    session["name"] = None
    return redirect(url_for('login'))


@app.route('/session_get', methods=['POST', 'GET'])
def session_get():
    if not session.get("name"):
        return redirect(url_for('login'))
    return session.get("name")


@app.errorhandler(404)
def page_not_found(e):
    return render_template('page404.html', titre="Erreur 404")


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
