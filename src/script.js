
import './style.css'
import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { Color, EqualStencilFunc, WebGLRenderer } from 'three'

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
    canvas: canvas,
    alpha:true,
});
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
console.log(renderer)

const controls = new OrbitControls(camera, renderer.domElement);

const standardMat = new THREE.MeshNormalMaterial('#f0f00')
standardMat.side = THREE.DoubleSide


const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(5,35,15),
    standardMat
)
// sphere.position.x = 
sphere.scale.set(.04,.04,.04)

const sphereBox = new THREE.Box3()
sphere.geometry.computeBoundingBox()


const planeL = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1),
    standardMat
    )
planeL.rotation.y = Math.PI /2
planeL.position.x = -2

const planeLBox = new THREE.Box3()
planeL.geometry.computeBoundingBox()

const planeR = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1),
    standardMat
    )
planeR.rotation.y = -Math.PI /2
planeR.position.x = 2
const planeRBox = new THREE.Box3()
planeR.geometry.computeBoundingBox()

const planeD = new THREE.Mesh(
    new THREE.PlaneGeometry(8,8),
    standardMat
    )
planeD.rotation.x =  Math.PI /2
planeD.position.y = -3.01

const planeDBox = new THREE.Box3()
planeD.geometry.computeBoundingBox()


const planeU = new THREE.Mesh(
        new THREE.PlaneGeometry(10,10),
        standardMat
        )
planeU.rotation.x =  Math.PI /2
planeU.position.y = 3.01

const planeUBox = new THREE.Box3()
planeU.geometry.computeBoundingBox()


scene.add(planeL,planeR,planeD,planeU,sphere)


// sphere.position.x = 4;
// sphere.position.y = 5;
// sphere.position.z = 5;
// sphere.metalness = 1
// sphere.shininess=2

//gameplay
// let dx = (Math.random()*3) +4
let dx = Math.floor(Math.random() * 4) + 3;
let dy = Math.floor(Math.random() * 4) + 3;
let dxd = Math.floor(Math.random() * 2);
let dyd = Math.floor(Math.random() * 2);

// document.onkeydown = (e) => {
//     if(e.keyCode === 38 && ! planeRBox.intersectsBox(planeUBox)){
//         //up
//         planeR.position.y +=.5
//     } else if(e.keyCode === 40  && ! planeRBox.intersectsBox(planeDBox)){
//         //down
//         planeR.position.y -=.5
//     } else if (e.keyCode === 87  && ! planeLBox.intersectsBox(planeUBox)){
//         planeL.position.y +=.5
//     }else if (e.keyCode === 83 && ! planeLBox.intersectsBox(planeDBox) ){
//         planeL.position.y -=.5
//     }
// }

sphere.updateMatrixWorld()
planeL.updateMatrixWorld()
planeR.updateMatrixWorld()
planeD.updateMatrixWorld()
planeU.updateMatrixWorld()
// let bounding1 = clone(sphere.geometry.boundingBox)
// bounding1.applyMatrix4(sphere.matrixWorld)
// let bounding2 = clone(planeR.geometry.boundingBox)
// bounding2.applyMatrix4(planeR.matrixWorld)
    // dxd = -dxd 
    

//size er up
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

console.log(planeL.position.y)

function runGame(){
	requestAnimationFrame( runGame );
    
    sphere.updateMatrixWorld()
    planeL.updateMatrixWorld()
    planeR.updateMatrixWorld()
    planeD.updateMatrixWorld()
    planeU.updateMatrixWorld()

    document.onkeydown = (e) => {
        if(e.keyCode === 38 && ! planeRBox.intersectsBox(planeUBox)){
            //up
            planeR.position.y +=.5
        } else if(e.keyCode === 40  && ! planeRBox.intersectsBox(planeDBox)){
            //down
            planeR.position.y -=.5
        } else if (e.keyCode === 87  && ! planeLBox.intersectsBox(planeUBox)){
            planeL.position.y +=.5
        }else if (e.keyCode === 83 && ! planeLBox.intersectsBox(planeDBox) ){
            planeL.position.y -=.5
        }
    }

    sphereBox.copy( sphere.geometry.boundingBox ).applyMatrix4( sphere.matrixWorld );
    planeLBox.copy( planeL.geometry.boundingBox ).applyMatrix4( planeL.matrixWorld );
    planeRBox.copy( planeR.geometry.boundingBox ).applyMatrix4( planeR.matrixWorld );
    planeDBox.copy( planeD.geometry.boundingBox ).applyMatrix4( planeD.matrixWorld );
    planeUBox.copy( planeU.geometry.boundingBox ).applyMatrix4( planeU.matrixWorld );

    if(sphereBox.intersectsBox(planeLBox)){
        dx = sphere.position.x +1
        dy = -dy * (Math.random() - .5) *10
    }
    if(sphereBox.intersectsBox(planeRBox)){
        dx = sphere.position.x -1
        dy = -dy * (Math.random() - .5) *10
    }

    if(sphereBox.intersectsBox(planeUBox)){
        dy = -sphere.position.y 
    }
    if(sphereBox.intersectsBox(planeDBox)){
        dy = -sphere.position.y 

    }
sphere.position.x-=    dx *.001
sphere.position.y+=    dy *.001
// console.log(sphere.position.x)
}

window.addEventListener("keydown", runGame)

function animate() {

	requestAnimationFrame( animate );


    const elapsedTime= clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime



    
    // sphere.position.x=  -(elapsedTime - rightX)
	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render( scene, camera );

}
    animate()

