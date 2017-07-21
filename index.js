const microsoftGraph = require("@microsoft/microsoft-graph-client");
const request = require('superagent');
const express = require('express');
const router = express.Router();
const config = require('config');

const targetUrl = config.get("api.url") + config.get("api.endpoint") + config.get("api.count");

const amount = config.get("parsing.amount");
const operation = config.get("parsing.operation");
const date = config.get("parsing.date");

const title = 'Expense report analytics';

function extractValues(item) {
    var a = new RegExp(amount, 'gi').exec(item.Body.Content);
    var o = new RegExp(operation, 'gi').exec(item.Body.Content);
    var d = new RegExp(date, 'gi').exec(item.Body.Content);
    return {
        amount: a ? (a[1] || a[2]) : "No Amount",
        operation: o ? (o[1] || o[2]) : "No Operation",
        date: d ? d[1] : "No Date"
    };
}


router.get('/', (req, res, next) => {
    "use strict";
    if (req.user) {
        request
            .get(targetUrl)
            .set('Authorization', "Bearer " + req.user.accessToken)
            .end((err, response) => {
                let result = [];
                if (err) {
                    console.log(err);
                } else {
                    result = (response.body.value || []).map((item) => JSON.stringify(extractValues(item)));
                }
                res.render('index', {
                    title: title,
                    result: result
                });
            });
    } else {
        res.render('index', {
            title: title
        });
    }
});

module.exports = router;
