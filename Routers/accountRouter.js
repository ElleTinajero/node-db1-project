const express = require("express")
const db = require("../data/dbConfig")

const router = express.Router()

router.get("/accounts", async (req, res, next) => {
    try {
        const accounts = await db
        .select("*")
        .from("accounts")

        res.json(accounts)
    } catch (err) {
        next(err)
    }
})

router.get("/accounts/:id", async (req, res, next) => {
    try {
        const accounts = await db
        .select("*")
        .from("accounts")
        .where("id", req.params.id)
        .limit(1)

        res.json(accounts)
    } catch (err) {
        next(err)
    }
})

router.post("/accounts", async (req, res, next) => {
    try{
        const id = await db
        .insert({
            name: req.body.name,
            budget: req.body.budget
        })
        .into("accounts")

        const account = await db
        .select("*")
        .from("accounts")
        .where("id", id)
        .first() //converts to limit 1

        res.status(201).json(account)
    } catch (err) {
        next(err)
    }
})

router.put("/accounts/:id", async (req, res, next) => {
    try {
        await db("accounts")
        .update({
            name: req.body.name,
            budget: req.body.budget
        })
        .where("id", req.params.id)


        const account = await db("accounts")
        .where("id", req.params.id)
        .first()


        res.json(account)
    } catch (err) {
        next(err)
    }
})

router.delete("/accounts/:id", async (req, res, next) => {
	try {
		// translates to `DELETE FROM messages WHERE id = ?;`
		await db("accounts")
			.where("id", req.params.id)
			.del()
		
		// since we no longer have a resource to return, just send a 204.
		// which means "success, but no response data is being sent".
		res.status(204).end()
	} catch (err) {
		next(err)
	}
})

module.exports = router