document.addEventListener('DOMContentLoaded', function() {
  fetch('noticias.json')
    .then(response => response.json())
    .then(data => {
      const contenedor = document.getElementById('listaNoticias');
      contenedor.innerHTML = '';
      data.forEach(noticia => {
        const noticiaDiv = document.createElement('div');
        noticiaDiv.classList.add('noticia');
        noticiaDiv.innerHTML = `
          <h3>${noticia.titulo}</h3>
          <small>${noticia.fecha}</small>
          <p>${noticia.contenido}</p>
        `;
        contenedor.appendChild(noticiaDiv);
      });
    })
    .catch(error => {
      document.getElementById('listaNoticias').innerHTML = '<p>Error al cargar noticias.</p>';
      console.error('Error al cargar noticias:', error);
    });
});