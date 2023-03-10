/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var three_examples_jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! three/examples/jsm/controls/OrbitControls.js */ \"./node_modules/three/examples/jsm/controls/OrbitControls.js\");\n/* harmony import */ var three_csg_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three-csg-ts */ \"./node_modules/three-csg-ts/lib/esm/index.js\");\n\r\n\r\n\r\n\r\nlet renderer, camera, scene;\r\nlet controls;\r\n\r\nclass Door {\r\n  constructor(scene, position, reflection) {\r\n    const door = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(this.createGeometry(), this.createMaterial());\r\n\r\n    door.castShadow = true;\r\n    door.receiveShadow = true;\r\n    this.csg(door);\r\n    if (reflection) this.setReflection(door.material);\r\n    door.position.copy(position);\r\n    scene.add(door);\r\n  }\r\n\r\n  createGeometry() {\r\n    const height = 1.9;\r\n    const arr = [new three__WEBPACK_IMPORTED_MODULE_1__.Vector2(-0.45, 0.05), new three__WEBPACK_IMPORTED_MODULE_1__.Vector2(-0.45, -0.05), new three__WEBPACK_IMPORTED_MODULE_1__.Vector2(0.45, -0.05), new three__WEBPACK_IMPORTED_MODULE_1__.Vector2(0.45, 0.05)];\r\n    const shape = new three__WEBPACK_IMPORTED_MODULE_1__.Shape(arr);\r\n    const geometry = new three__WEBPACK_IMPORTED_MODULE_1__.ExtrudeGeometry(shape, { bevelEnabled: false, depth: height });\r\n    geometry.rotateX(-Math.PI / 2);\r\n\r\n    return geometry;\r\n  }\r\n\r\n  csg(door) {\r\n    const side = [0.08, -0.08];\r\n\r\n    for (let i = 0; i < side.length; i++) {\r\n      const box = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.BoxGeometry(0.8, 1.7, 0.1), new three__WEBPACK_IMPORTED_MODULE_1__.MeshStandardMaterial({ color: 0x0000ff }));\r\n\r\n      box.position.y = 1.7 / 2 + 0.1;\r\n      box.position.z = side[i];\r\n\r\n      box.updateMatrix();\r\n      door.updateMatrix();\r\n\r\n      const subRes = three_csg_ts__WEBPACK_IMPORTED_MODULE_0__.CSG.subtract(door, box);\r\n      door.geometry.dispose();\r\n      door.geometry = subRes.geometry;\r\n    }\r\n  }\r\n\r\n  createMaterial() {\r\n    const material = new three__WEBPACK_IMPORTED_MODULE_1__.MeshStandardMaterial({ color: 0x00ff00 });\r\n    this.createTexture(material);\r\n\r\n    return material;\r\n  }\r\n\r\n  createTexture(material) {\r\n    new three__WEBPACK_IMPORTED_MODULE_1__.TextureLoader().load('img/1.jpg', function (image) {\r\n      const texture = image;\r\n      material.color = new three__WEBPACK_IMPORTED_MODULE_1__.Color(0xffffff);\r\n      texture.wrapS = texture.wrapT = three__WEBPACK_IMPORTED_MODULE_1__.RepeatWrapping;\r\n      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();\r\n      texture.repeat.x = 1.0;\r\n      texture.repeat.y = 1.0;\r\n      texture.needsUpdate = true;\r\n\r\n      material.map = texture;\r\n      material.needsUpdate = true;\r\n    });\r\n  }\r\n\r\n  setReflection(material) {\r\n    const pmremGenerator = new three__WEBPACK_IMPORTED_MODULE_1__.PMREMGenerator(renderer);\r\n    pmremGenerator.compileEquirectangularShader();\r\n\r\n    const cubeCamera = new three__WEBPACK_IMPORTED_MODULE_1__.CubeCamera(0.01, 10, new three__WEBPACK_IMPORTED_MODULE_1__.WebGLCubeRenderTarget(512, { encoding: three__WEBPACK_IMPORTED_MODULE_1__.sRGBEncoding }));\r\n\r\n    cubeCamera.position.copy(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 1, 0));\r\n    cubeCamera.update(renderer, scene);\r\n\r\n    const envMap = pmremGenerator.fromEquirectangular(cubeCamera.renderTarget.texture).texture;\r\n    material.metalness = 0.7;\r\n    material.roughness = 0.0;\r\n    material.envMap = envMap;\r\n    material.needsUpdate = true;\r\n\r\n    envMap.dispose();\r\n    cubeCamera.renderTarget.texture.dispose();\r\n\r\n    pmremGenerator.dispose();\r\n  }\r\n}\r\n\r\ninit();\r\nrender();\r\n\r\nfunction init() {\r\n  const bgColor = 0x263238 / 2;\r\n\r\n  renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer({ antialias: true });\r\n  renderer.setPixelRatio(window.devicePixelRatio);\r\n  renderer.setSize(window.innerWidth, window.innerHeight);\r\n  renderer.setClearColor(bgColor, 1);\r\n  renderer.shadowMap.enabled = true;\r\n  renderer.shadowMap.type = three__WEBPACK_IMPORTED_MODULE_1__.PCFSoftShadowMap;\r\n  renderer.outputEncoding = three__WEBPACK_IMPORTED_MODULE_1__.sRGBEncoding;\r\n  document.body.appendChild(renderer.domElement);\r\n\r\n  scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();\r\n  scene.background = new three__WEBPACK_IMPORTED_MODULE_1__.Color(0xffffff);\r\n\r\n  const light = new three__WEBPACK_IMPORTED_MODULE_1__.DirectionalLight(0xffffff, 1);\r\n  light.position.set(1, 1.5, 1).multiplyScalar(50);\r\n  light.shadow.mapSize.setScalar(2048);\r\n  light.shadow.bias = -1e-4;\r\n  light.shadow.normalBias = 0.05;\r\n  light.castShadow = true;\r\n\r\n  const shadowCam = light.shadow.camera;\r\n  shadowCam.bottom = shadowCam.left = -30;\r\n  shadowCam.top = 30;\r\n  shadowCam.right = 45;\r\n\r\n  const size = 30;\r\n  const divisions = 30;\r\n\r\n  const plane = new three__WEBPACK_IMPORTED_MODULE_1__.Mesh(new three__WEBPACK_IMPORTED_MODULE_1__.PlaneGeometry(size, size), new three__WEBPACK_IMPORTED_MODULE_1__.MeshStandardMaterial({ color: 0xffffff }));\r\n  plane.position.x = -0.001;\r\n  plane.rotation.set(Math.PI / 2, Math.PI, 0);\r\n  plane.castShadow = true;\r\n  plane.receiveShadow = true;\r\n  scene.add(plane);\r\n\r\n  const gridHelper = new three__WEBPACK_IMPORTED_MODULE_1__.GridHelper(size, divisions);\r\n  scene.add(gridHelper);\r\n\r\n  scene.add(light);\r\n  scene.add(new three__WEBPACK_IMPORTED_MODULE_1__.HemisphereLight(0xffffff, 0x223344, 0.4));\r\n\r\n  camera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50);\r\n  camera.position.set(5, 5, -5);\r\n  camera.far = 1000;\r\n  camera.updateProjectionMatrix();\r\n  window.camera = camera;\r\n\r\n  controls = new three_examples_jsm_controls_OrbitControls_js__WEBPACK_IMPORTED_MODULE_2__.OrbitControls(camera, renderer.domElement);\r\n\r\n  new Door(scene, new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(-1.5, 0, 0), false);\r\n  new Door(scene, new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(1.5, 0, 0), true);\r\n\r\n  window.addEventListener(\r\n    'resize',\r\n    function () {\r\n      camera.aspect = window.innerWidth / window.innerHeight;\r\n      camera.updateProjectionMatrix();\r\n\r\n      renderer.setSize(window.innerWidth, window.innerHeight);\r\n    },\r\n    false\r\n  );\r\n}\r\n\r\nfunction render() {\r\n  requestAnimationFrame(render);\r\n\r\n  controls.update();\r\n\r\n  renderer.render(scene, camera);\r\n}\r\n\n\n//# sourceURL=webpack://multiple-scene/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkmultiple_scene"] = self["webpackChunkmultiple_scene"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_three-csg-ts_lib_esm_index_js-node_modules_three_examples_jsm_controls_O-548506"], () => (__webpack_require__("./src/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;