const db = require("./accounts-model")
const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require("./accounts-middleware")
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

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try{
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    }
    const account = await db.create(payload)
    res.json(account)
  }catch(err){
    next(err)
  }
})

router.put('/:id', checkAccountPayload, checkAccountNameUnique, checkAccountId, async (req, res, next) => {
  try{
    const payload = {
      name: req.body.name,
      budget: req.body.budget
    }
    db.updateById(req.params.id, payload)
      .then(count => {
        if(count > 0){
          db.getById(req.params.id)
            .then(account => {
              res.json(account)
            })
            .catch(err => next(err))
        }else{
          next()
        }
      })
      .catch(err => {
        next(err)
      })
  }catch(err) {
    next(err)
  }
});

router.delete('/:id', checkAccountId, async(req, res, next) => {
  try{
    const account = await db.getById(req.params.id)
    await db.deleteById(req.params.id);
    res.json(account)
  }catch(err){
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  console.log(err)

	res.status(500).json({
		message: "Something went wrong",
	})
})

module.exports = router;
