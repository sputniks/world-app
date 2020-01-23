import logging

log = logging.getLogger()
formatter = logging.Formatter("%(asctime)s [%(levelname)s] %(module)s.%(funcName)s.%(lineno)d: %(message)s", "%Y-%m-%d %H:%M:%S")
handler = logging.StreamHandler()
handler.setFormatter(formatter)
log.addHandler(handler)
log.setLevel(logging.INFO)
