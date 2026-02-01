import webview
from .services import storage
from .services import organ


class API:
    storage_service: storage.Storage_Service
    organ_service: organ.Organ_Service

    def __init__(
        self,
        storage_service: storage.Storage_Service,
        organ_service: organ.Organ_Service,
    ) -> None:
        self.storage_service = storage_service
        self.organ_service = organ_service

    def set_window(self, window: webview.Window) -> None:
        self._window = window

    def get_all_organs(self) -> list:
        return self.organ_service.get_all()

    def open_organ(self, organ_id: str) -> None:
        self.organ_service.open(organ_id)

    def get_organ_cover_b64(self, organ_id: str) -> str:
        return self.organ_service.get_cover_b64(organ_id)

    def get_organ_preview_b64(self, organ_id: str) -> str:
        return self.organ_service.get_preview_b64(organ_id)

    def open_config(self) -> None:
        self.storage_service.open_file(self.storage_service.get_config_path())
