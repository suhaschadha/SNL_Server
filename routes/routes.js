const mongojs = require('mongojs');
var dbPath = require("../config/dbPath").url;
const {createJwt} = require("../authorization/jwt");
const {decodeJwt} = require("../authorization/jwt")

module.exports = function (app) {
    app.get("/",(req,res) => {
    res.status(200).send("SNL server test");
})

app.post('/login',(req,res) => {
    let db = mongojs(dbPath, ['Users']);
    console.log(req);
    console.log(req.body);
    db.Users.findOne( {email:req.body.email , password:req.body.password} , function (err, doc) {
        if(err || !doc)
            res.status(403).send("Password or Email ID provided is incorrect");
        else
        {
            let token = createJwt(doc);
            res.json({msg:"Logged in.",
                     token: token});
        }
    });
})

app.get("/markers", (req,res) => {

    let db = mongojs(dbPath, ['Markers']);
    db.Markers.find(function (err, docs) {
        if(err || !docs.length)
            res.status(403).send(err || "No records found");
        else{
            db.close();
            res.status(200).send(docs);
        }
    })
})

app.get("/thermalGraph/:name", (req,res) => {
    let data= [];
    let db = mongojs(dbPath, ['ThermalGraph']);
    /*var docs = db.ThermalGraph.find(function (err, docs) {
            console.log(docs);
            db.close();
            res.status(200).send(docs);
    }) */

    db.ThermalGraph.find({"Chemical Name": req.params.name}).forEach(function (err, doc) {
    if (!doc) {
        res.status(200).send(data);
    }
    data.push(doc);
})
})

app.get("/shipmentPerformanceIndicator", (req,res) => {

    let db = mongojs(dbPath, ['ShipmentPerformanceIndicator']);
    db.ShipmentPerformanceIndicator.find(function (err, docs) {
        if(err || !docs.length)
            res.status(403).send(err || "No records found");
        else{
            db.close();
            res.status(200).send(docs);
        }
    })
})

app.get("/damageShipments", (req,res) => {

    let db = mongojs(dbPath, ['DamageShipments']);
    db.DamageShipments.find(function (err, docs) {
        if(err || !docs.length)
            res.status(403).send(err || "No records found");
        else{
            db.close();
            res.status(200).send(docs);
        }
    })
})

app.get("/hazardousProducts", (req,res) => {

    let db = mongojs(dbPath, ['HazardousProducts']);
    db.HazardousProducts.find(function (err, docs) {
        if(err || !docs.length)
            res.status(403).send(err || "No records found");
        else{
            db.close();
            res.status(200).send(docs);
        }
    })
})

app.get("/hazardousCategory", (req,res) => {

    let db = mongojs(dbPath, ['HazardousCategory']);
    db.HazardousCategory.find(function (err, docs) {
        if(err || !docs.length)
            res.status(403).send(err || "No records found");
        else{
            db.close();
            res.status(200).send(docs);
        }
    })
})

}