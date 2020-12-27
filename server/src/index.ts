import express, { Application } from 'express'
import { ApolloServer } from 'apollo-server-express'
import bodyParser from 'body-parser'
import { typeDefs, resolvers } from './graphql'
import { connectDatabase } from './database'
require('dotenv').config()
const cors = require("cors")


const mount = async (app: Application) => {
  const db = await connectDatabase()
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: () => ({ db }),
  })
  server.applyMiddleware({ app, path: '/api' })
  app.listen(process.env.PORT)
  // bodyParser.json() to help parse incoming requests as JSON and expose the resulting object on req.body
  app.use(bodyParser.json())
  // allow cross origin request
  app.use(cors())
  console.log(`[app] : http://localhost:${process.env.PORT}`)

  const listings = await db.listings.find({}).toArray()
  console.log(listings, 'listing are displayed here')
}


mount(express())
