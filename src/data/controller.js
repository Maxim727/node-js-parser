const pool = require('../../db')
const queries = require('./queries')


const getData = (req, res) => {
    pool.query(queries.getData, (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows)
    })
}

const getDataById = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query(queries.getDataById,[id], (error, results) => {
        if(error) throw error;
        res.status(200).json(results.rows)
    })
}

const addData = (req, res) => {
    const {id, inflation, brent, baserate} = req.body;

    // checking if data exists
    pool.query(queries.checkDataExists, [inflation], (error, results) => {
        if(results.rows.length){
            res.send('DATA already exists')
        }
    })
    // add data to db
    pool.query(queries.addData, [inflation, brent, baserate], (error, results) => {
        if(error) throw error;
        res.status(201).send("DATA created successfully")

    })
}

const deleteData = (req, res) => {
    const id = parseInt(req.params.id);

    pool.query(queries.getDataById, [id], (error,results) => {
        if(error) throw error;

        const noDataFound = !results.rows.length;
        if(noDataFound){
            res.send("DATA does not exist in the DB")
        }

        pool.query(queries.deleteData, [id], (error, results) => {
            if(error) throw error;
            res.status(200).send("DATA deleted successfully")
        })
    })


}

const updateData = (req, res) => {
    const id = parseInt(req.params.id);

    const { inflation ,brent, baserate } = req.body


    pool.query(queries.getDataById, [id], (error, results) => {
        const noDataFound = !results.rows.length;
        if(noDataFound){
            res.send("DATA does not exist in the DB, nothing to update")
        }

        pool.query(queries.updateData, [inflation, brent, baserate, id], (error, results) => {
            if(error) throw error;
            res.status(200).send("DATA updated successfully")
        })

    })
}

module.exports = {
    getData,
    getDataById,
    addData,
    deleteData,
    updateData,
}