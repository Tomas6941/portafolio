from flask import Flask, render_template, send_from_directory, url_for
import os
app = Flask(__name__)
SITE_URL = os.environ.get("SITE_URL", "https://tomas6941.github.io/portafolio")
projects = [
    {
        "id": 1,
        "title": "SaaS de Inmobiliaria",
        "description": "Plataforma web para una inmobiliaria con catálogo de propiedades y formulario de contacto. Panel administrativo para gestionar propiedades, etc.",
        "tags": ["HTML5", "CSS3", "JavaScript"],
        "type": "Full Stack",
        "url": "https://github.com/Tomas6941/pinmobiliaria",
        "color": "#4F8A6A",
        "demo_url": "https://proyectoinmobiliaria-demo.vercel.app/"
    },
    {
        "id": 2,
        "title": "Clinica Dental",
        "description": "Sitio web para clínica dental con sistema de reserva de turnos y panel de administración.",
        "tags": ["Python", "Flask", "HTML5", "CSS3"],
        "type": "Full Stack",
        "url": "https://github.com/Tomas6941/pdental",
        "color": "#4A7FA5",
        "demo_url": "https://proyectoodontologo-demo.vercel.app/"
    },
    {
        "id": 3,
        "title": "Barbería Elite",
        "description": "Sitio web para una barbería con sistema de reserva de turnos y panel de administración.",
        "tags": ["HTML5", "CSS3", "JavaScript"],
        "type": "Full Stack",
        "url": "https://github.com/Tomas6941/pbarberia",
        "color": "#8B5E3C",
        "demo_url": "https://proyectobarberia-demo.vercel.app/"
    },
    {
        "id": 4,
        "title": "Concesionaria",
        "description": "Aplicación web para concesionaria de vehículos, incluye panel administrativo para gestionar catalogo, etc.",
        "tags": ["Python", "Flask", "HTML5", "CSS3"],
        "type": "Full Stack",
        "url": "https://github.com/Tomas6941/concesionaria",
        "color": "#7A5FA5",
        "demo_url": "https://proyectoconcesionaria-demo.vercel.app/"
    },
    {
        "id": 5,
        "title": "Fibrolaser",
        "description": "Trabajo freelance: desarrollo web para un servicio de corte y grabado láser, con catálogo de trabajos y cotización online.",
        "tags": ["HTML5", "CSS3", "JavaScript"],
        "type": "Freelance",
        "url": "https://github.com/Tomas6941/fibrolaser",
        "color": "#CC5500",
        "demo_url": "https://fibrolaser.vercel.app/"
    },
    {
        "id": 6,
        "title": "Scanner de Vulnerabilidades Web",
        "description": "Herramienta de análisis de seguridad web que verifica headers de seguridad, configuración CORS, certificados SSL/TLS y cookies, generando un reporte detallado con puntuación y recomendaciones.",
        "tags": ["Python", "Flask", "JavaScript"],
        "type": "Ciberseguridad",
        "url": "https://github.com/Tomas6941/scanner_vulnerabilidades",
        "color": "#CC3333",
        "demo_url": None
    },
    {
        "id": 7,
        "title": "Dashboard de Auditoría de Seguridad",
        "description": "Panel administrativo para gestionar auditorías de seguridad de sitios web, con puntuación, historial, recomendaciones priorizadas y exportación de reportes.",
        "tags": ["Python", "Flask", "PostgreSQL", "JavaScript"],
        "type": "Ciberseguridad",
        "url": "https://github.com/Tomas6941/dashboard-auditoria",
        "color": "#993333",
        "demo_url": None
    },
    {
        "id": 8,
        "title": "API REST de Gestión de Inventario",
        "description": "API RESTful completa para gestionar inventario de productos con autenticación JWT, paginación, filtros, ordenamiento y documentación automática con Swagger.",
        "tags": ["Python", "Flask", "PostgreSQL"],
        "type": "API",
        "url": "https://github.com/Tomas6941/api_inventario",
        "color": "#336699",
        "demo_url": None
    },
    {
        "id": 9,
        "title": "API de Notificaciones Push",
        "description": "Backend completo para gestionar suscripciones a notificaciones push, envío en tiempo real con WebSocket e historial de notificaciones enviadas.",
        "tags": ["Python", "Flask", "JavaScript"],
        "type": "API",
        "url": "https://github.com/Tomas6941/notificaciones_push",
        "color": "#339966",
        "demo_url": None
    },
    {
        "id": 10,
        "title": "Sistema de Facturación",
        "description": "Aplicación de escritorio para emitir facturas, gestionar productos y clientes, calcular impuestos y generar reportes de ventas en PDF.",
        "tags": ["Python", "CustomTkinter", "PostgreSQL"],
        "type": "Escritorio",
        "url": "https://github.com/Tomas6941/sistema_facturacion",
        "color": "#666633",
        "demo_url": None
    },
    {
        "id": 11,
        "title": "Gestor de Inventario",
        "description": "Aplicación de escritorio para gestionar inventario de un negocio con control de stock, alertas de stock mínimo y reportes de movimientos.",
        "tags": ["Python", "CustomTkinter", "SQLite"],
        "type": "Escritorio",
        "url": "https://github.com/Tomas6941/gestor_inventario",
        "color": "#996633",
        "demo_url": None
    },
]
experience = [
    {
        "company": "Firox",
        "role": "Frontend Developer",
        "url": "https://firox.uy",
        "period": "May 2026 — Actualidad",
        "duration": "4 meses",
        "description": "Desarrollo de interfaces web con React, Next.js, TypeScript y Tailwind CSS. Construcción de sitios y tiendas online optimizados para rendimiento y conversión.",
        "tags": ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    }
]
skills = {
    "Backend": ["Python", "Flask", "Django"],
    "Frontend": ["HTML5", "CSS3", "Tailwind CSS", "JavaScript", "Tkinter", "CustomTkinter"],
    "Bases de datos": ["MySQL", "MongoDB", "SQLite", "PostgreSQL"],
    "Herramientas": ["Git", "GitHub", "VS Code", "OpenCode", "Vercel", "Linux"],
}
@app.route("/")
def index():
    og_image = SITE_URL + url_for('static', filename='og-image.svg')
    return render_template("index.html", projects=projects, skills=skills, experience=experience, og_image=og_image, site_url=SITE_URL)

@app.route("/cv")
def cv():
    return render_template("cv.html", projects=projects, skills=skills, experience=experience)

@app.route("/cv-pdf")
def cv_pdf():
    return send_from_directory("static", "cv.pdf", as_attachment=True)

@app.errorhandler(404)
def not_found(e):
    return render_template("404.html"), 404

if __name__ == "__main__":
    app.run(debug=True)
