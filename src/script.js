
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { Color } from 'three'




const canvas = document.querySelector('canvas')

const gui = new dat.GUI()


const scene = new THREE.Scene()

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

//camera
const camera = new THREE.PerspectiveCamera(75,sizes.width / sizes.height, 0.1, 100)
scene.add(camera)

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 6;

camera.lookAt('sphere')

  const ambientLight = new THREE.AmbientLight();
  ambientLight.intensity= 10
  scene.add(ambientLight);

  const directionalLight= new THREE.DirectionalLight(0xffffff,0.5)

scene.add(directionalLight)


const renderer = new THREE.WebGLRenderer({
    canvas:canvas,
    alpha: true
})
renderer.setSize(window.innerWidth, window.innerHeight)

  const controls = new OrbitControls(camera, renderer.domElement);
// console.log(renderer)

const standardMat = new THREE.MeshNormalMaterial()
standardMat.side = THREE.DoubleSide

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5,35,15),
    standardMat
)

sphere.scale.set(.04,.04,.04)
const sphereBox = new THREE.Box3()

sphere.geometry.computeBoundingBox()

const planeL = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1),
    standardMat
    )
planeL.rotation.y = Math.PI /2
planeL.position.x = -2
planeL.geometry.computeBoundingBox()
const planeLBox = new THREE.Box3().setFromObject(planeL)


const planeR = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1),
    standardMat
    )
planeR.rotation.y = -Math.PI /2
planeR.position.x = 2
planeR.geometry.computeBoundingBox()
const planeRBox = new THREE.Box3()




const planeU = new THREE.Mesh(
    new THREE.PlaneGeometry(10,10),
    standardMat
    )
planeU.rotation.x = -Math.PI /2
planeU.position.y = 3
planeU.geometry.computeBoundingBox()
const planeUBox = new THREE.Box3()




const planeD = new THREE.Mesh(
    new THREE.PlaneGeometry(10,10),
    standardMat
    )
planeD.rotation.x = -Math.PI /2
planeD.position.y = -3
planeD.geometry.computeBoundingBox()
const planeDBox = new THREE.Box3()

// console.log(sphereBox)
scene.add(planeR,planeL,planeU,planeD,sphere)

// sphere.position.x = 4;
// sphere.position.y = 5;
// sphere.position.z = 5;
// sphere.metalness = 1
// sphere.shininess=2

let dx = Math.floor(Math.random() * 4) + 3
let dy = Math.floor(Math.random() * 4) + 3
let dxd = Math.floor(Math.random() * 2)
let dyd = Math.floor(Math.random() * 2)

function runGame(){
    // requestAnimationFrame(runGame)

    window.addEventListener('keydown', e =>  
    {
        if(e.key == 'w' && ! planeLBox.intersectsBox(planeUBox) ){
            planeL.position.y +=1
            console.log('pressedW')
        }else if(e.key == 's' && ! planeLBox.intersectsBox(planeDBox)){
            planeL.position.y -= .5
        }
        if(e.key == 'ArrowUp'  && ! planeRBox.intersectsBox(planeUBox)){
            planeR.position.y +=1
            console.log('pressedW')
        }else if(e.key == 'ArrowDown' && ! planeRBox.intersectsBox(planeDBox)){
            planeR.position.y -= .5
        }


    })
    function moveBall(){

         requestAnimationFrame(moveBall)


        sphereBox.copy(sphere.geometry.boundingBox).applyMatrix4(sphere.matrixWorld)
        planeLBox.copy(planeL.geometry.boundingBox).applyMatrix4(planeL.matrixWorld)
        planeRBox.copy(planeR.geometry.boundingBox).applyMatrix4(planeR.matrixWorld)
        planeUBox.copy(planeU.geometry.boundingBox).applyMatrix4(planeU.matrixWorld)
        planeDBox.copy(planeD.geometry.boundingBox).applyMatrix4(planeD.matrixWorld)
        // console.log(sphere.position.x)
        if(sphereBox.intersectsBox(planeLBox)){
        dx = -dx
        }
        if(sphereBox.intersectsBox(planeRBox)){
        dx = -dx
        }
        sphere.position.x +=dx/200
        if(sphereBox.intersectsBox(planeUBox)){
        dy = -dy
        }
        if(sphereBox.intersectsBox(planeDBox)){
        dy = -dy
        }
        sphere.position.x +=dx/200
        sphere.position.y +=dy/200
    }
}
runGame()
moveBall()

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const clock=new THREE.Clock()
let rightX = .08 
let oldElapsedTime = 0


function animate() {

	requestAnimationFrame( animate );

    let elapsedTime= clock.getElapsedTime()
    let deltaTime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime

    // sphere.updateProjectionMatrix()


    

    
    // sphere.position.x=  -(elapsedTime - rightX)
	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render( scene, camera );

}
animate()

