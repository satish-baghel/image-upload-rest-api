const express = require('express')
const router = express.Router()
const path = require('path')
const niv = require('node-input-validator')
const fs = require('fs')
// DataBase
const productDB = require('../../module/product')
// Multer
const multer = require('multer')

const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`,
    )
  },
})
const fileFilter = (req, file, cb) => {
  // reject a file
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true)
  } else {
    cb(null, false)
    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'))
  }
}
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
})

// @ Route    POST api/product
// @ desc     Product upload
// @ Access   Public

router.post('/', upload.single('img'), async (req, res) => {
  const objValidation = new niv.Validator(req.body, {
    title: 'required',
    desc: 'required',
    price: 'required',
  })
  const matched = await objValidation.check()
  if (!matched) {
    return res.status(422).json({
      message: 'Validation error',
      errors: objValidation.errors,
    })
  }
  // console.log(req.file.destination + '/' + req.file.filename)
  try {
    const newProduct = new productDB({
      title: req.body.title,
      desc: req.body.desc,
      img: req.file.destination + '/' + req.file.filename,
      price: req.body.price,
    })
    await newProduct.save()
    res.json(newProduct)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @ Route    GET api/product
// @ desc     get all product
// @ Access   Public

router.get('/', async (req, res) => {
  try {
    const getAllProduct = await productDB.find()
    res.json(getAllProduct)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @ Route    DELETE api/product
// @ desc     delete Product
// @ Access   Public
router.delete('/:id', async (req, res) => {
  try {
    const getProduct = await productDB.findById(req.params.id)
    const path = getProduct.img
    fs.unlink(path, err => {
      if (err) {
        console.error(err)
        return
      }
    })
    if (getProduct) {
      await productDB.findByIdAndRemove(req.params.id)
    }
    res.json({ msg: 'Delete' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @ Route    PUT api/product
// @ desc     Edit Product
// @ Access   Public

router.put('/:id', upload.single('img'), async (req, res) => {
  const objValidation = new niv.Validator(req.body, {
    title: 'required',
    desc: 'required',
    price: 'required',
  })
  const matched = await objValidation.check()
  if (!matched) {
    return res.status(422).json({
      message: 'Validation error',
      errors: objValidation.errors,
    })
  }

  const { title, desc, price } = req.body
  const updataProduct = {}
  if (title) updataProduct.title = title
  if (desc) updataProduct.desc = desc
  if (price) updataProduct.price = price
  if (req.file) {
    updataProduct.img = req.file.destination + '/' + req.file.filename
  }
  if (req.file !== undefined) {
  }
  try {
    const getProduct = await productDB.findById(req.params.id)
    const path = getProduct.img
    if (req.file !== undefined) {
      try {
        fs.unlinkSync(path)
      } catch (err) {
        console.error(err)
      }
    }

    const editProduct = await productDB.findByIdAndUpdate(
      req.params.id,
      { $set: updataProduct },
      { new: true },
    )
    res.json(editProduct)
  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: 'Server Error' })
  }
})

module.exports = router
