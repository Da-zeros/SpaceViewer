import * as THREE from 'three'

document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("spaceViewer JS imported successfully!");
  },
  false
);

let camera
let scene
let renderer
let geometry
let material 
let mesh, mesh2

function init(){
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 1000000)
  camera.position.z = 1

  scene = new THREE.Scene()

  geometry = new THREE.SphereGeometry(0.2, 30, 30)
  const texture = new THREE.TextureLoader().load( '../images/earth.jpg' );
  const material = new THREE.MeshBasicMaterial( { map: texture } );
  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
  mesh.position.x = -0.5

  let randomSize = Math.random() * (0.5 - 0.1) + 0.1;
  let geometry2 = new THREE.SphereGeometry(randomSize, 30, 30)
  const textures = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'] 
  const indexTextures =  Math.floor(Math.random() * textures.length); 
  const texture2 = new THREE.TextureLoader().load( `../images/${textures[indexTextures]}` );
  const material2 = new THREE.MeshBasicMaterial( { map: texture2 } );
  mesh2 = new THREE.Mesh(geometry2, material2)
  scene.add(mesh2)
  mesh2.position.x = 0.3


  renderer = new THREE.WebGLRenderer({antialias: true})
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.gammaFactor = 2.2
  renderer.gammaOutput = true

  const parent = document.querySelector('#planet')
  parent.appendChild( renderer.domElement );
  
}

function animate(){
  requestAnimationFrame(animate)
   //mesh.rotation.x += 0.01
   mesh.rotation.y += 0.02/3
   mesh2.rotation.y += 0.02/3
   renderer.render(scene, camera)
}

init()
animate()
/**Cojo el boton de exo */
const btnExo = document.querySelector('#btn-exo')

btnExo.addEventListener('click',(e)=>{
  e.preventDefault()
  
})
