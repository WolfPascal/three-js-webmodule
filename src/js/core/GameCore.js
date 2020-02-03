import * as STATS from "stats.js"
import { LifeCycle } from "./LifeCycle"
import * as THREE from "three";

export class GameCore {

    constructor() {
        if (GameCore._instance) {
            return GameCore._instance;
        }
        GameCore._instance = this;
        this.lifeCycle = new LifeCycle();
        this.frameCount = 0;
    }

    init() {
        this.scene = new THREE.Scene();
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10000);
        this.stats = new STATS();
        this.renderer.shadowMap.enabled = true;

        this.scene.fog = new THREE.Fog(this.scene.background, 1, 5000);

        this.camera.position.z = 10;

        this.renderer.setClearColor(0xFFFFFF);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.stats.showPanel(0);
        document.body.appendChild(this.stats.dom);

        // LIGHTS
        this.hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
        this.hemiLight.color.setHSL(0.6, 1, 0.6);
        this.hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        this.hemiLight.position.set(0, 50, 0);
        this.scene.add(this.hemiLight);

        this.dirLight = new THREE.DirectionalLight(0xffffff, 1);
        this.dirLight.color.setHSL(0.1, 1, 0.95);
        this.dirLight.position.set(- 1, 1.75, 1);
        this.dirLight.position.multiplyScalar(30);
        this.scene.add(this.dirLight);
        this.dirLight.castShadow = true;
        this.dirLight.shadow.mapSize.width = 2048;
        this.dirLight.shadow.mapSize.height = 2048;
        var d = 50;
        this.dirLight.shadow.camera.left = - d;
        this.dirLight.shadow.camera.right = d;
        this.dirLight.shadow.camera.top = d;
        this.dirLight.shadow.camera.bottom = - d;
        this.dirLight.shadow.camera.far = 3500;
        this.dirLight.shadow.bias = - 0.0001;

        // GROUND
        var groundGeo = new THREE.PlaneBufferGeometry(10000, 10000);
        var groundMat = new THREE.MeshLambertMaterial({ color: 0xbadc58 });

        var ground = new THREE.Mesh(groundGeo, groundMat);
        ground.position.y = - 33;
        ground.rotation.x = - Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);

        // SKYDOME
        var vertexShader = document.getElementById('vertexShader').textContent;
        var fragmentShader = document.getElementById('fragmentShader').textContent;
        var uniforms = {
            "topColor": { value: new THREE.Color(0x0077ff) },
            "bottomColor": { value: new THREE.Color(0xffffff) },
            "offset": { value: 33 },
            "exponent": { value: 0.6 }
        };
        uniforms["topColor"].value.copy(this.hemiLight.color);
        this.scene.fog.color.copy(uniforms["bottomColor"].value);
        var skyGeo = new THREE.SphereBufferGeometry(4000, 32, 15);
        var skyMat = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            side: THREE.BackSide
        });
        var sky = new THREE.Mesh(skyGeo, skyMat);
        this.scene.add(sky);

        window.addEventListener("resize", this.onWindowResize);
        this.lifeCycle.onStart();

        this.initObjects();
        this.gameLoop();
    }

    initObjects() {
        var geo = new THREE.BoxBufferGeometry(2, 2, 2);
        var mat = new THREE.MeshStandardMaterial();
        var mesh = new THREE.Mesh(geo, mat);
        mesh.castShadow = true;
        this.scene.add(mesh);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onFrameUpdated() {
        this.frameCount++;
        this.lifeCycle.onUpdate();
        if (this.frameCount % 3 == 0) {
            this.frameCount = 0;
            this.lifeCycle.onSlowUpdate();
        }
    }

    gameLoop() {
        this.stats.begin();
        requestAnimationFrame(() => {
            this.gameLoop();
        });
        this.onFrameUpdated();
        this.renderer.render(this.scene, this.camera);
        this.stats.end();
    }
}
