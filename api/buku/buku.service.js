const db = require('../../config/connection')

const add = (data, callBack) => {
    db.query(`INSERT INTO tb_buku SET ?`, [data], (err, results) => {
        if (err) {
            return callBack(err)
        } else {
            return callBack(null, results)
        }
    })
}

const get = (callBack) => {
    db.query(`SELECT * FROM tb_buku`, [], (err, results) => {
        if (err) {
            return callBack(err)
        } else {
            return callBack(null, results)
        }
    })
}

const getId = (data, callBack) => {
    db.query(`SELECT * FROM tb_buku WHERE kd_buku = ?`, [data], (err, results) => {
        if (err) {
            return callBack(err)
        } else {
            return callBack(null, results)
        }
    })
}

const update = (data, callBack) => {
    db.query(`SELECT * FROM tb_buku WHERE kd_buku=?`, [data.kd_buku], (err, results) => {
        if (err) {
            return callBack(err)
        } else {
            db.query(`UPDATE tb_buku SET ? WHERE kd_buku = ?`,
                [
                    data,
                    data.kd_buku
                ])
            return callBack(null, results[0])
        }
    })
}

const del = (data, callBack) => {
    db.query(`SELECT kd_buku FROM tb_buku WHERE kd_buku = ?`, [data], (err, results) => {
        if (err) {
            return callBack(err)
        } else {
            db.query(`DELETE FROM tb_buku WHERE kd_buku = ?`,
                [data])
            return callBack(null, results[0])
        }
    })
}

module.exports = {
    add,
    get,
    getId,
    update,
    del
}