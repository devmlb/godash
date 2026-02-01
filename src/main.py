import webview
import os
import core.services.storage as storage
import core.services.organ as organ
import core.api as api
import sys


WORKDIR = os.path.dirname(os.path.abspath(__file__))


def is_bundled() -> bool:
    if getattr(sys, "frozen", False) and hasattr(sys, "_MEIPASS"):
        return True
    return False


def get_gui_dir() -> None:
    if is_bundled():
        if os.path.exists(os.path.normpath(os.path.join(WORKDIR, "gui"))):
            return os.path.normpath(os.path.join(WORKDIR, "gui"))

    if os.path.exists(os.path.normpath(os.path.join(WORKDIR, "../gui"))):
        return os.path.normpath(os.path.join(WORKDIR, "../gui"))

    raise Exception("Cannot find the GUI directory.")


def get_storage_dir() -> None:
    if not os.path.exists(os.path.normpath(os.path.join(WORKDIR, "../storage"))):
        os.makedirs(
            os.path.normpath(os.path.join(WORKDIR, "../storage")), exist_ok=True
        )

    return os.path.normpath(os.path.join(WORKDIR, "../storage"))


if __name__ == "__main__":
    GUI_DIR = get_gui_dir()
    STORAGE_DIR = get_storage_dir()
    DEBUG = True

    storage_service = storage.Storage_Service(STORAGE_DIR)
    organ_service = organ.Organ_Service(storage_service)

    js_api = api.API(storage_service, organ_service)
    window = webview.create_window(
        title="GO Dash", url=os.path.join(GUI_DIR, "index.html"), js_api=js_api
    )
    js_api.set_window(window)

    if is_bundled():
        webview.start(ssl=True)
    else:
        webview.start(debug=DEBUG, ssl=True)
