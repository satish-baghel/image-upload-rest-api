"use strict";

var express = require('express');

var router = express.Router();

var path = require('path');

var niv = require('node-input-validator'); // DataBase


var productDB = require('../../module/product'); // Multer


var multer = require('multer');

var _require = require('express'),
    json = _require.json;

var storage = multer.diskStorage({
  destination: './upload/images',
  filename: function filename(req, file, cb) {
    return cb(null, "".concat(file.fieldname, "_").concat(Date.now()).concat(path.extname(file.originalname)));
  }
});

var fileFilter = function fileFilter(req, file, cb) {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Please Select png or jpeg image'), false);
  }
};

var upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
}); // @ Route    POST api/product
// @ desc     Product upload
// @ Access   Public

router.post('/', upload.single('img'), function _callee(req, res) {
  var objValidation, matched, newProduct;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          objValidation = new niv.Validator(req.body, {
            title: 'required',
            desc: 'required',
            price: 'required'
          });
          _context.next = 3;
          return regeneratorRuntime.awrap(objValidation.check());

        case 3:
          matched = _context.sent;

          if (matched) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(422).json({
            message: 'Validation error',
            errors: objValidation.errors
          }));

        case 6:
          _context.prev = 6;
          newProduct = new productDB({
            title: req.body.title,
            desc: req.body.desc,
            img: req.file.destination + '/' + req.file.filename,
            price: req.body.price
          });
          _context.next = 10;
          return regeneratorRuntime.awrap(newProduct.save());

        case 10:
          res.json(newProduct);
          _context.next = 17;
          break;

        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](6);
          console.error(_context.t0.message);
          res.status(500).send('Server Error');

        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 13]]);
}); // @ Route    GET api/product
// @ desc     get all product
// @ Access   Public

router.get('/', function _callee2(req, res) {
  var getAllProduct;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(productDB.find());

        case 3:
          getAllProduct = _context2.sent;
          res.json(getAllProduct);
          _context2.next = 11;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error(_context2.t0.message);
          res.status(500).send('Server Error');

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}); // @ Route    DELETE api/product
// @ desc     delete Product
// @ Access   Public

router["delete"]('/:id', function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(productDB.findByIdAndRemove(req.params.id));

        case 3:
          res.json({
            msg: 'Delete'
          });
          _context3.next = 10;
          break;

        case 6:
          _context3.prev = 6;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0.message);
          res.status(500).send('Server Error');

        case 10:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 6]]);
}); // @ Route    PUT api/product
// @ desc     Edit Product
// @ Access   Public

router.put('/:id', upload.single('img'), function _callee4(req, res) {
  var _req$body, title, desc, price, updataProduct, editProduct;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body = req.body, title = _req$body.title, desc = _req$body.desc, price = _req$body.price;
          updataProduct = {};
          if (title) updataProduct.title = title;
          if (desc) updataProduct.desc = desc;
          if (price) updataProduct.price = price;
          updataProduct.img = req.file.destination + '/' + req.file.filename;
          _context4.prev = 6;
          _context4.next = 9;
          return regeneratorRuntime.awrap(productDB.findByIdAndUpdate(req.params.id, {
            $set: updataProduct
          }, {
            "new": true
          }));

        case 9:
          editProduct = _context4.sent;
          res.json(editProduct);
          _context4.next = 17;
          break;

        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](6);
          console.error(_context4.t0.message);
          res.status(500).json({
            msg: 'Server Error'
          });

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[6, 13]]);
});
module.exports = router;