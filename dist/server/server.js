/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/server/cart.js":
/*!****************************!*\
  !*** ./src/server/cart.js ***!
  \****************************/
/***/ ((module) => {

eval("const add = (cart, req) => {\r\n    cart.push(req.body);\r\n    return JSON.stringify(cart, null, 4);\r\n};\r\nconst change = (cart, req) => {\r\n    const find = cart.find(el => el.id_product === +req.params.id);\r\n    find.quantity += req.body.quantity;\r\n    return JSON.stringify(cart, null, 4);\r\n};\r\nconst del = (cart, req) => {\r\n    const find = cart.find(el => el.id_product === +req.params.id);\r\n    cart.splice(cart.indexOf(find), 1);\r\n    return JSON.stringify(cart, null, 4);\r\n};\r\nconst clear = (cart, req) => {\r\n    cart.splice(0, cart.length);\r\n    return JSON.stringify(cart, null, 4);\r\n};\r\n\r\nmodule.exports = {\r\n    add,\r\n    change,\r\n    del,\r\n    clear\r\n};\n\n//# sourceURL=webpack://thebrendshop/./src/server/cart.js?");

/***/ }),

/***/ "./src/server/cartRouter.js":
/*!**********************************!*\
  !*** ./src/server/cartRouter.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\r\nconst fs = __webpack_require__(/*! fs */ \"fs\");\r\nconst handler = __webpack_require__(/*! ./handler */ \"./src/server/handler.js\");\r\nconst router = express.Router();\r\nconst path = __webpack_require__(/*! path */ \"path\");\r\n\r\nconst cartJSONPath = path.resolve(__dirname, './db/userCart.json')\r\n\r\nrouter.get('/', (req, res) => {\r\n    fs.readFile(cartJSONPath, 'utf-8', (err, data) => {\r\n        if (err) {\r\n            res.send(JSON.stringify({ result: 0, text: err }));\r\n        } else {\r\n            res.send(data);\r\n        }\r\n    });\r\n});\r\n\r\nrouter.post('/', (req, res) => {\r\n    handler(req, res, 'add', cartJSONPath);\r\n});\r\n\r\nrouter.delete('/', (req, res) => {\r\n    handler(req, res, 'clear', cartJSONPath);\r\n});\r\n\r\nrouter.put('/:id', (req, res) => {\r\n    handler(req, res, 'change', cartJSONPath);\r\n});\r\n\r\nrouter.delete('/:id', (req, res) => {\r\n    handler(req, res, 'del', cartJSONPath);\r\n});\r\n\r\nmodule.exports = router;\n\n//# sourceURL=webpack://thebrendshop/./src/server/cartRouter.js?");

/***/ }),

/***/ "./src/server/handler.js":
/*!*******************************!*\
  !*** ./src/server/handler.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const fs = __webpack_require__(/*! fs */ \"fs\");\r\nconst cart = __webpack_require__(/*! ./cart */ \"./src/server/cart.js\");\r\n\r\nconst actions = {\r\n    add: cart.add,\r\n    change: cart.change,\r\n    del: cart.del,\r\n    clear: cart.clear\r\n};\r\n\r\nconst handler = (req, res, action, file) => {\r\n    fs.readFile(file, 'utf-8', (err, data) => {\r\n        if (err) {\r\n            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));\r\n        } else {\r\n            const newCart = actions[action](JSON.parse(data), req);\r\n            fs.writeFile(file, newCart, (err) => {\r\n                if (err) {\r\n                    res.send('{\"result\": 0}');\r\n                } else {\r\n                    res.send('{\"result\": 1}');\r\n                }\r\n            })\r\n        }\r\n    });\r\n};\r\n\r\nmodule.exports = handler;\n\n//# sourceURL=webpack://thebrendshop/./src/server/handler.js?");

/***/ }),

/***/ "./src/server/server.js":
/*!******************************!*\
  !*** ./src/server/server.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\r\nconst fs = __webpack_require__(/*! fs */ \"fs\");\r\nconst cartRouter = __webpack_require__(/*! ./cartRouter */ \"./src/server/cartRouter.js\");\r\nconst app = express();\r\nconst path = __webpack_require__(/*! path */ \"path\");\r\n\r\n\r\n\r\napp.use(express.json());\r\napp.use('/', express.static(path.resolve(__dirname, '../public')));\r\napp.use('/api/cart', cartRouter);\r\n\r\nconst catalogJSONPath = path.resolve(__dirname, './db/products.json');\r\nconst ordersJSONPath = path.resolve(__dirname, './db/orders.json');\r\n\r\napp.get('/api/products', (req, res) => {\r\n    fs.readFile(catalogJSONPath, 'utf-8', (err, data) => {\r\n        if (err) {\r\n            res.send(JSON.stringify({ result: 0, text: err }));\r\n        } else {\r\n            res.send(data);\r\n        }\r\n    });\r\n});\r\n\r\napp.post('/api/orders/', (req, res) => {\r\n    console.log(1);\r\n    fs.readFile(ordersJSONPath, 'utf-8', (err, data) => {\r\n        if (err) {\r\n            res.sendStatus(404, JSON.stringify({ result: 0, text: err }));\r\n        } else {\r\n            const newOrder = JSON.parse(data);\r\n            newOrder.push(req.body);\r\n            console.log(newOrder);\r\n            fs.writeFile(ordersJSONPath, JSON.stringify(newOrder, null, 4), 'utf-8', (err) => {\r\n                if (err) {\r\n                    res.send('{\"result\": 0}');\r\n                } else {\r\n                    res.send('{\"result\": 1}');\r\n                }\r\n            })\r\n        }\r\n    });\r\n});\r\n\r\nconst port = 5555;\r\n\r\napp.listen(port, () => {\r\n    console.log(`Server started at port ${port}`);\r\n});\r\n\r\n// app.get(); // READ\r\n// app.post(); // CREATE\r\n// app.put(); // UPDATE\r\n// app.delete(); // DELETE\r\n\r\n\n\n//# sourceURL=webpack://thebrendshop/./src/server/server.js?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server/server.js");
/******/ 	
/******/ })()
;