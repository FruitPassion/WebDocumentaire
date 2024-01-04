import socket


def get_sname():
    return f"{socket.gethostname()};{socket.gethostbyname(socket.gethostname())}"
