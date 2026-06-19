$path = "C:\Users\Usuario\Desktop\portafolio\static\cv.pdf"

$stream = @"
BT
/F2 32 Tf
0 0 0 rg
50 770 Td
(Tomas) Tj
ET
BT
/F1 14 Tf
0.4 0.4 0.44 rg
50 742 Td
(Full Stack Developer) Tj
ET
BT
/F1 9 Tf
0.4 0.4 0.44 rg
50 720 Td
(tg4263340@gmail.com  |  github.com/Tomas6941  |  linkedin.com/in/tomas-gonzalez-724518307/) Tj
ET
1 w
0.85 0.85 0.87 RG
50 705 m 545 705 l S
BT
/F2 11 Tf
0 0 0 rg
50 685 Td
(Sobre mi) Tj
ET
BT
/F1 9 Tf
0.12 0.12 0.13 rg
50 668 Td
(Tengo 15 anos y soy desarrollador Full Stack Junior de Cordoba, Argentina.) Tj
ET
BT
/F1 9 Tf
0.12 0.12 0.13 rg
50 654 Td
(Me especializo en Python + Flask para backend y HTML, CSS, Tailwind para frontend.) Tj
ET
BT
/F1 9 Tf
0.12 0.12 0.13 rg
50 640 Td
(Trabajo con MySQL y MongoDB. Complete cursos de Python, desarrollo web y aplicaciones con IA.) Tj
ET
BT
/F2 11 Tf
0 0 0 rg
50 610 Td
(Stack / Skills) Tj
ET
BT
/F2 9 Tf
0 0 0 rg
50 592 Td
(Backend:) Tj
ET
BT
/F1 9 Tf
0.12 0.12 0.13 rg
112 592 Td
(Python, Flask, Django) Tj
ET
BT
/F2 9 Tf
0 0 0 rg
50 576 Td
(Frontend:) Tj
ET
BT
/F1 9 Tf
0.12 0.12 0.13 rg
112 576 Td
(HTML5, CSS3, Tailwind CSS, JavaScript) Tj
ET
BT
/F2 9 Tf
0 0 0 rg
50 560 Td
(Bases de datos:) Tj
ET
BT
/F1 9 Tf
0.12 0.12 0.13 rg
112 560 Td
(MySQL, MongoDB, SQLite) Tj
ET
BT
/F2 9 Tf
0 0 0 rg
50 544 Td
(Herramientas:) Tj
ET
BT
/F1 9 Tf
0.12 0.12 0.13 rg
112 544 Td
(Git, GitHub, VS Code, OpenCode, Vercel) Tj
ET
BT
/F2 11 Tf
0 0 0 rg
50 514 Td
(Proyectos) Tj
ET
BT
/F2 9 Tf
0 0 0 rg
50 494 Td
(SaaS de Inmobiliaria  --  Full Stack) Tj
ET
BT
/F1 9 Tf
0.12 0.12 0.13 rg
65 480 Td
(Plataforma web con catalogo de propiedades y panel administrativo.) Tj
ET
BT
/F1 8 Tf
0.4 0.4 0.44 rg
65 466 Td
(HTML5 / CSS3 / JavaScript) Tj
ET
BT
/F2 9 Tf
0 0 0 rg
50 446 Td
(Clinica Dental  --  Full Stack) Tj
ET
BT
/F1 9 Tf
0.12 0.12 0.13 rg
65 432 Td
(Sitio web con sistema de reserva de turnos y panel de administracion.) Tj
ET
BT
/F1 8 Tf
0.4 0.4 0.44 rg
65 418 Td
(Python / Flask / HTML5 / CSS3) Tj
ET
BT
/F2 9 Tf
0 0 0 rg
50 398 Td
(Barberia Elite  --  Full Stack) Tj
ET
BT
/F1 9 Tf
0.12 0.12 0.13 rg
65 384 Td
(Sitio web con sistema de reserva de turnos y panel de administracion.) Tj
ET
BT
/F1 8 Tf
0.4 0.4 0.44 rg
65 370 Td
(HTML5 / CSS3 / JavaScript) Tj
ET
BT
/F2 9 Tf
0 0 0 rg
50 350 Td
(Concesionaria  --  Full Stack) Tj
ET
BT
/F1 9 Tf
0.12 0.12 0.13 rg
65 336 Td
(Aplicacion web para concesionaria de vehiculos con panel administrativo.) Tj
ET
BT
/F1 8 Tf
0.4 0.4 0.44 rg
65 322 Td
(Python / Flask / HTML5 / CSS3) Tj
ET
BT
/F2 11 Tf
0 0 0 rg
50 294 Td
(Formacion) Tj
ET
BT
/F2 9 Tf
0.4 0.4 0.44 rg
50 274 Td
(2025) Tj
ET
BT
/F1 9 Tf
0.12 0.12 0.13 rg
102 274 Td
(Desarrollo de aplicaciones con IA) Tj
ET
BT
/F2 9 Tf
0.4 0.4 0.44 rg
50 258 Td
(2024) Tj
ET
BT
/F1 9 Tf
0.12 0.12 0.13 rg
102 258 Td
(Python para desarrollo web) Tj
ET
BT
/F2 9 Tf
0.4 0.4 0.44 rg
50 242 Td
(2024) Tj
ET
BT
/F1 9 Tf
0.12 0.12 0.13 rg
102 242 Td
(HTML y CSS - Frontend) Tj
ET
BT
/F2 9 Tf
0.4 0.4 0.44 rg
50 226 Td
(2023) Tj
ET
BT
/F1 9 Tf
0.12 0.12 0.13 rg
102 226 Td
(Python avanzado) Tj
ET
"@

$streamLen = $stream.Length

$pdf = @"
%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /MediaBox [0 0 595 842] /Parent 2 0 R /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
6 0 obj
<< /Length $streamLen >>
stream
$stream
endstream
endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000269 00000 n 
0000000351 00000 n 
0000000438 00000 n 
trailer
<< /Size 7 /Root 1 0 R >>
startxref
$([string](439 + $streamLen))
%%EOF
"@

$enc = [System.Text.Encoding]::ASCII
$bytes = $enc.GetBytes($pdf)
[System.IO.File]::WriteAllBytes($path, $bytes)
Write-Host "OK - PDF generado: $($bytes.Length) bytes"
