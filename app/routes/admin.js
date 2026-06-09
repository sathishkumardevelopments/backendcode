var express = require("express");
var router = express.Router();
const { validatorMiddleware } = require("../middleware/validatorMiddleware");
const {
  ProductcreateValidator,
} = require("../controller/admin/validator/ProductcreateValidator");
const {
  ProductCreateController,
} = require("../controller/admin/ProductCreateController");
const {
  ProductListController,
} = require("../controller/admin/ProductListController");
const {
  ProductViewController,
} = require("../controller/admin/ProductViewController");

const {
  OrderListController,
} = require("../controller/admin/OrderListController");
const {
  OrderViewController,
} = require("../controller/admin/OrderViewController");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/createproduct", upload.single("image"), ProductCreateController);
router.post("/listproduct", ProductListController);
router.post("/handleproduct", upload.single("image"), ProductViewController);
router.post("/listorder", OrderListController);
router.post("/handleorder", OrderViewController);

module.exports = router;
