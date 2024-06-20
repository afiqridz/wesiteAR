// Import necessary functions from the library 
import { loadGLTF, loadTexture } from "../../Website/libs/loader.js"; 
const THREE = window.MINDAR.FACE.THREE; 

// Initialize the MINDAR AR experience with face library and container 
document.addEventListener('DOMContentLoaded', () => { 
  const start = async () => { 
    const mindarThree = new window.MINDAR.FACE.MindARThree({ 
      container: document.body, 
    });

    // Extract renderer, scene, and camera from mindarThree 
    const { renderer, scene, camera } = mindarThree; 

    // Ambient Light - Provides soft background lighting throughout the scene 
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); 

    // Directional Light - Mimics sunlight, with controllable direction 
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6); 
    directionalLight.position.set(0, 1, 1); // Can be adjusted as needed 

    // Point Light - Provides a light source that can provide a more dramatic shadow effect 
    const pointLight = new THREE.PointLight(0xffffff, 0.6, 100); 
    pointLight.position.set(0, 10, 10); // Can be adjusted as needed 

    scene.add(ambientLight); 
    scene.add(directionalLight); 
    scene.add(pointLight); 

    // Load the texture for facemesh tracking 
    const faceMesh = mindarThree.addFaceMesh(); 
    const texture = await loadTexture('../../assets/models/mask1/ironman.png'); 
    faceMesh.material.map = texture; 
    faceMesh.material.transparent = true; 
    faceMesh.material.needsUpdate = true; 

    // Adjust the size and position of the face mask
    faceMesh.scale.set(1.5, 1.5, 1.5); // Adjust the scale as needed
    faceMesh.position.set(0, 0, 0); // Adjust the position if necessary

    scene.add(faceMesh); 

    // Start the AR experience and set up the rendering loop    
    await mindarThree.start(); 
    renderer.setAnimationLoop(() => { 
      renderer.render(scene, camera); 
    }); 
  }; 
  start(); 
});
