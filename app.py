from flask import Flask, render_template
app = Flask(__name__)
projects = [
    {
        "id": 1,
        "title": "SaaS de Inmobiliaria",
        "description": "Plataforma web para una inmobiliaria con catálogo de propiedades y formulario de contacto. Panel administrativo para gestionar propiedades, etc.",
        "tags": ["HTML5", "CSS3", "JavaScript"],
        "type": "Full Stack",
        "emoji": "🏠",
        "url": "https://github.com/Tomas6941/pinmobiliaria",
        "color": "#4F8A6A",
        "demo_url": ""
    },
    {
        "id": 2,
        "title": "Clinica Dental",
        "description": "Sitio web para clínica dental con sistema de reserva de turnos y panel de administración.",
        "tags": ["Python", "Flask", "HTML5", "CSS3"],
        "type": "Full Stack",
        "emoji": "🦷",
        "url": "https://github.com/Tomas6941/pdental",
        "color": "#4A7FA5",
        "demo_url": ""
    },
    {
        "id": 3,
        "title": "Barbería Elite",
        "description": "Sitio web para una barbería con sistema de reserva de turnos y panel de administración.",
        "tags": ["HTML5", "CSS3", "JavaScript"],
        "type": "Full Stack",
        "emoji": "✂️",
        "url": "https://github.com/Tomas6941/pbarberia",
        "color": "#8B5E3C",
        "demo_url": ""
    },
    {
        "id": 4,
        "title": "Concesionaria",
        "description": "Aplicación web para concesionaria de vehículos, incluye panel administrativo para gestionar catalogo, etc.",
        "tags": ["Python", "Flask", "HTML5", "CSS3"],
        "type": "Full Stack",
        "emoji": "🚗",
        "url": "https://github.com/Tomas6941/concesionaria",
        "color": "#7A5FA5",
        "demo_url": ""
    },
]
skills = {
    "Backend": ["Python", "Flask"],
    "Frontend": ["HTML5", "CSS3", "Tailwind CSS", "JavaScript"],
    "Bases de datos": ["MySQL", "MongoDB"],
    "Herramientas": ["Git", "GitHub", "VS Code"],
}
@app.route("/")
def index():
    return render_template("index.html", projects=projects, skills=skills)
if __name__ == "__main__":
    app.run(debug=True)
