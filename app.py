from flask import Flask, render_template

app = Flask(__name__)

projects = [
    {
        "id": 1,
        "title": "PIN Inmobiliaria",
        "description": "Plataforma web para una inmobiliaria con catálogo de propiedades y formulario de contacto.",
        "tags": ["HTML5", "CSS3", "JavaScript"],
        "type": "Frontend",
        "emoji": "🏠",
        "url": "https://github.com/Tomas6941/pinmobiliaria",
        "color": "#4F8A6A"
    },
    {
        "id": 2,
        "title": "PDental",
        "description": "Sitio web para clínica dental con sistema de reserva de turnos y panel de administración.",
        "tags": ["Python", "Flask", "HTML5", "CSS3"],
        "type": "Full Stack",
        "emoji": "🦷",
        "url": "https://github.com/Tomas6941/pdental",
        "color": "#4A7FA5"
    },
    {
        "id": 3,
        "title": "Barbería Elite",
        "description": "Landing page para una barbería con flujo de reservas y contacto directo por WhatsApp.",
        "tags": ["HTML5", "CSS3", "JavaScript"],
        "type": "Frontend",
        "emoji": "✂️",
        "url": "https://github.com/Tomas6941/pbarberia",
        "color": "#8B5E3C"
    },
    {
        "id": 4,
        "title": "Concesionaria",
        "description": "Aplicación web para concesionaria de vehículos con sistema de contacto por email configurable.",
        "tags": ["Python", "Flask", "HTML5", "CSS3"],
        "type": "Full Stack",
        "emoji": "🚗",
        "url": "https://github.com/Tomas6941/concesionaria",
        "color": "#7A5FA5"
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
