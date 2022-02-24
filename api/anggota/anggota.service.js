const db = require('../../config/connection')

const add = (data, callBack) => {
    db.query('INSERT INTO tb_anggota set ?', [data], (err, result) => {
        if (err) {
            return callBack(err)
        }
        return callBack(null, result)
    })
}

const get = (callBack) => {
    db.query('SELECT * FROM tb_anggota', [], (err, result) => {
        if (err) {
            return callBack(err)
        }
        return callBack(null, result)
    })
}

const getId = (data, callBack) => {
    db.query('SELECT * FROM tb_anggota WHERE kd_anggota = ?', [data], (err, result) => {
        if (err) {
            return callBack(err)
        }
        return callBack(null, result)
    })
}

const update = (data, callBack) => {
    db.query('SELECT * FROM tb_anggota WHERE kd_anggota = ?', [data.kd_anggota], (err, results) => {
        if (err) {
            return callBack(err)
        } else {
            db.query('UPDATE tb_anggota SET ? WHERE kd_anggota = ?', [data, data.kd_anggota])
            return callBack(null, results[0])
        }
    })
}

const del = (data, callBack) => {
    db.query('SELECT kd_anggota FROM tb_anggota WHERE kd_anggota = ?', [data], (err, results) => {
        if (err) {
            return callBack(err)
        } else {
            db.query('DELETE FROM tb_anggota WHERE kd_anggota = ?', [data])
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