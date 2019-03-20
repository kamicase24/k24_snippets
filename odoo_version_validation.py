# must be inside __init__.py file and call it in manifest like: "pre_init_hook": server_validation

def server_validation(cr):
	from odoo.service import common
	from odoo.exceptions import Warning
	ver_info = common.exp_version()
	server_serie = ver_info.get('server_serie')
	if server_serie!='11.0':raise Warning("Modulo solo apto para Odoo v11.0, encontrado %s,  en cambio" % str(server_serie))
	return True
