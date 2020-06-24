const express = require("express")
const app = express()
const port = 3001

const stripe = require("stripe")(process.env.SK_TEST_KEY)

app.get("/", (req, res) => res.send("Hello World!"))

app.get("/products", (req, res) => {
  stripe.products.list({ active: true }).then((lst) => res.send(lst))
})

app.get("/products/:id", (req, res) => {
  stripe.products.retrieve(req.params.id, (err, product) => {
    // res.json(product)

    let final_product = []
    final_product.push(product)

    stripe.prices.retrieve(product.metadata.price, (e, price) => {
      final_product.push(price)

      console.log(final_product)
      res.json(final_product)
    })
  })
})

app.post("/checkout", async (req, res) => {
  console.log("Request:", req.body)

  let error
  let status

  try {
    const { product, token } = req.body

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    })

    const idempotency_key = uuid()
    const charge = await stripe.charges.create(
      {
        amount: price.unit_amount,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip,
          },
        },
      },
      {
        idempotency_key,
      }
    )
    console.log("Charge: ", { charge })
    status = "success"
  } catch (err) {
    console.error("Error: ", err)
    status = "failure"
  }

  res.json({ error, status })
})

app.listen(port, () => console.log(`App listening at http://localhost:${port}`))
