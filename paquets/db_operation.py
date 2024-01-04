import sqlite3
import os.path
import hashlib


def db_connect():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(base_dir, "data")
    return sqlite3.connect(db_path)


def check_session(sn):
    db = db_connect()
    cursor = db.cursor()
    cursor.execute(f"SELECT label from main.user where label = '{sn}'")
    try:
        return cursor.fetchall()[0][0]
    except:
        return None


def register_session(sn):
    db = db_connect()
    cursor = db.cursor()
    cursor.execute(f"INSERT INTO main.user (label, etape,salle_actuelle) VALUES ('{sn}',1,1)")
    db.commit()


def get_user_id(sn):
    db = db_connect()
    cursor = db.cursor()
    cursor.execute(f"SELECT id_user from main.user where label = '{sn}'")
    try:
        return cursor.fetchall()[0][0]
    except:
        return None


def get_salle_num(sn):
    db = db_connect()
    cursor = db.cursor()
    cursor.execute(f"SELECT salle_actuelle from main.user where label = '{sn}'")
    try:
        return cursor.fetchall()[0][0]
    except:
        return None


def get_salle_extension(sn):
    sid = get_user_id(sn)
    db = db_connect()
    cursor = db.cursor()
    cursor.execute(f"SELECT count(*) from main.acceder where id_user = '{sid}' and id_salle != '5'")
    try:
        return cursor.fetchall()[0][0]
    except:
        return None


def verify_room_id(sn, rid):
    sid = get_user_id(sn)
    db = db_connect()
    cursor = db.cursor()
    cursor.execute(f"SELECT count(*) from main.acceder where id_user = '{sid}' and  id_salle = '{rid}';")
    return cursor.fetchall()[0][0] == 0


def register_room(sn, rid):
    sid = get_user_id(sn)
    if verify_room_id(sn, rid):
        db = db_connect()
        cursor = db.cursor()
        cursor.execute(f"INSERT INTO main.acceder (id_user, id_salle) VALUES ({sid},{rid})")
        db.commit()


def update_room(sn, rid):
    db = db_connect()
    cursor = db.cursor()
    cursor.execute(f"UPDATE main.user SET salle_actuelle={rid} where label = '{sn}'")
    db.commit()


def get_etape_session(sn):
    db = db_connect()
    cursor = db.cursor()
    cursor.execute(f"SELECT etape from main.user where label = '{sn}'")
    try:
        return cursor.fetchall()[0][0]
    except:
        return None


def session_next(nb, sn):
    db = db_connect()
    cursor = db.cursor()
    cursor.execute(f"UPDATE main.user SET etape='{nb + 1}' where label = '{sn}'")
    db.commit()


def acces_delete(sn):
    sid = get_user_id(sn)
    db = db_connect()
    cursor = db.cursor()
    cursor.execute(f"delete from main.acceder where id_user = '{sid}'")
    db.commit()


def user_delete(sn):
    sid = get_user_id(sn)
    db = db_connect()
    cursor = db.cursor()
    cursor.execute(f"delete from main.user where id_user = '{sid}'")
    db.commit()


def delete(sn):
    acces_delete(sn)
    user_delete(sn)
