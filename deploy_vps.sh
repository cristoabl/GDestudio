#!/bin/bash

# Este script despliega el portfolio en un VPS con Nginx y Docker
echo "Iniciando despliegue para gdestudio.com.ar..."

# 1. Clonar o Actualizar Repositorio
if [ -d "GDARQWEB" ]; then
  cd GDARQWEB
  git pull origin main
else
  git clone https://github.com/gdarq/GDARQWEB.git
  cd GDARQWEB
fi

# 2. Levantar la aplicación con Docker Compose
docker compose up -d --build

# 3. Configurar Nginx para el dominio
cat << 'EOF' | sudo tee /etc/nginx/sites-available/gdestudio
server {
    listen 80;
    server_name gdestudio.com.ar www.gdestudio.com.ar;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
EOF

# 4. Activar el sitio web en Nginx
sudo ln -sf /etc/nginx/sites-available/gdestudio /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# 5. Reiniciar Nginx para aplicar cambios
sudo nginx -t
sudo systemctl restart nginx

echo "¡Despliegue completado! El sitio ya está corriendo en Docker y Nginx está configurado para gdestudio.com.ar."
