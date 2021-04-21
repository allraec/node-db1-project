const db = require("./accounts-model")
const { checkAccountId } = require("./accounts-middleware")
const router = require('express').Router()

router.get('/', async (req, res, next) => {
  try{
    const accounts = await db.getAll()
    res.json(accounts);
  }catch (err) {
    next(err)
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  try{
    const account = await db.getById(req.params.id)
    res.json(account)
  }catch (err) {
    next(err)
  }
})

router.post('/', (req, res, next) => {
  // DO YOUR MAGIC
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  console.log(err)

	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = router;
