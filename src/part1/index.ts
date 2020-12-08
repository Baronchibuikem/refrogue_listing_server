import express from "express"
import { listings } from "./listings"
import bodyParser from "body-parser"
const app = express();
const port = 9000;

// bodyParser.json() to help parse incoming requests as JSON and expose the resulting object on req.body
app.use(bodyParser.json())
// for getting all our current listings 
app.get("/listings", (req, res) => res.send(listings));

// for deleting a particular list
app.post('/delete-listing', (req, res) => {
    const id: string = req.body.id;
    for (let i = 0; i < listings.length; i++) {
        if (listings[i].id === id) {
            return res.send(listings.splice(i, 1))
        }
    }
    return res.send("failed to deleted listing");
})


app.listen(port)
console.log(`[app] : http://localhost:${port}`);