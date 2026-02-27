// Inicialización
let users = JSON.parse(localStorage.getItem("users")) || [];
let videos = JSON.parse(localStorage.getItem("videos")) || [];
let currentUser = localStorage.getItem("currentUser");

// 🔐 REGISTRO
function register(){
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if(users.find(u => u.username === username)){
    alert("Usuario ya existe");
    return;
  }

  users.push({username,password,subs:[]});
  localStorage.setItem("users", JSON.stringify(users));
  alert("Cuenta creada");
}

// 🔐 LOGIN
function login(){
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = users.find(u => u.username === username && u.password === password);

  if(!user){
    alert("Datos incorrectos");
    return;
  }

  localStorage.setItem("currentUser", username);
  location.href="index.html";
}

// 🚪 LOGOUT
function logout(){
  localStorage.removeItem("currentUser");
  location.href="login.html";
}

// 🎥 SUBIR VIDEO
function uploadVideo(){
  const file = document.getElementById("videoFile").files[0];
  const title = document.getElementById("title").value;

  const reader = new FileReader();
  reader.onload = function(e){
    videos.push({
      title: title,
      url: e.target.result,
      user: currentUser,
      likes: 0
    });

    localStorage.setItem("videos", JSON.stringify(videos));
    alert("Video subido 🚀");
    location.href="index.html";
  };

  reader.readAsDataURL(file);
}

// 🏠 CARGAR VIDEOS
function loadVideos(){
  const container = document.getElementById("videos");
  if(!container) return;

  container.innerHTML = "";

  videos.forEach((video,index)=>{
    container.innerHTML += `
      <div class="video-card">
        <video width="100%" controls>
          <source src="${video.url}">
        </video>
        <h3>${video.title}</h3>
        <p>${video.user}</p>
        <button onclick="likeVideo(${index})">❤️ ${video.likes}</button>
      </div>
    `;
  });
}

// ❤️ LIKE
function likeVideo(index){
  videos[index].likes++;
  localStorage.setItem("videos", JSON.stringify(videos));
  loadVideos();
}

// 📱 MODO MÓVIL
function toggleMode(){
  document.body.classList.toggle("mobile-mode");
}

// Auto cargar
loadVideos();
