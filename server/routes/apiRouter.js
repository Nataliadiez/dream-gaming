<<<<<<< HEAD
// const express = require("express");
// const router = express.Router();
// const productosRoutes = require("./productos.routes.js");

// router.use("/productos", productosRoutes);
=======
const express = require("express");
const router = express.Router();
const productosRoutes = require("./productos.routes.js");
const ticketRoutes = require("./ticket.routes.js");
const usuariosRoutes = require("./usuarios.routes.js");

router.use("/productos", productosRoutes);
router.use("/ticketCompra", ticketRoutes)
router.use("/usuarios", usuariosRoutes);
//router.use("/ventas", ventasRoutes);
>>>>>>> 52fdf3f60dafae30b59eafbbfd90ffe2a9923ed6

// //aca van todos lo productos


// //router.use("/admin", adminRoutes);
// //router.use("/ventas", ventasRoutes);

// module.exports = router;