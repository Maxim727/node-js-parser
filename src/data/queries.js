const getData = "SELECT * FROM parseddata";
const getDataById = "SELECT * FROM parseddata WHERE id = $1";
const checkDataExists = "SELECT s FROM parseddata s WHERE s.inflation = $1";

const addData = "INSERT INTO parseddata (inflation, inflationbp, baserate, baseratebp) VALUES ($1, $2, $3, $4)";
const deleteData = "DELETE FROM parseddata WHERE id = $1"

const updateData = "UPDATE parseddata SET inflation = $1, inflationbp = $2, baserate = $3, baseratebp = $4 WHERE id = $5"

module.exports = {
    getData,
    getDataById,
    checkDataExists,
    addData,
    deleteData,
    updateData
}

