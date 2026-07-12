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
]
skills = {
    "Backend": ["Python", "Flask", "Django"],
    "Frontend": ["HTML5", "CSS3", "Tailwind CSS", "JavaScript"],
    "Bases de datos": ["MySQL", "MongoDB", "SQLite", "PostgreSQL"],
    "Herramientas": ["Git", "GitHub", "VS Code", "OpenCode", "Vercel", "Linux"],
}
@app.route("/")
def index():
    og_image = SITE_URL + url_for('static', filename='og-image.svg')
    return render_template("index.html", projects=projects, skills=skills, og_image=og_image, site_url=SITE_URL)

@app.route("/cv")
def cv():
    return render_template("cv.html", projects=projects, skills=skills)

@app.route("/cv-pdf")
def cv_pdf():
    return send_from_directory("static", "cv.pdf", as_attachment=True)

@app.errorhandler(404)
def not_found(e):
    return render_template("404.html"), 404

if __name__ == "__main__":
    app.run(debug=True)
