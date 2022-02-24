const db = require('../../config/connection')

const add = (data, callBack) => {
    db.query(`INSERT INTO tb_petugas SET ?`, [data], (err, results) => {
        if (err) {
            return callBack(err)
        } else {
            return callBack(null, results)
        }
    })
}

const get = (callBack) => {
    db.query(`SELECT * FROM tb_petugas`, [], (err, results) => {
        if (err) {
            return callBack(err)
        } else {
            return callBack(null, results)
        }
    })
}

const getId = (data, callBack) => {
    db.query(`SELECT * FROM tb_petugas WHERE kd_petugas = ?`, [data], (err, results) => {
        if (err) {
            return callBack(err)
        } else {
            return callBack(null, results)
        }
    })
}

const update = (data, callBack) => {
    db.query(`SELECT * FROM tb_petugas WHERE kd_petugas=?`, [data.kd_petugas], (err, results) => {
        if (err) {
            return callBack(err)
        } else {
            db.query(`update tb_petugas set ? where kd_petugas = ?`,
                [
                    data,
                    data.kd_petugas
                ]);
            return callBack(null, results[0])
        }
    })
}

const del = (data, callBack) => {
    db.query(`select kd_petugas from tb_petugas where kd_petugas = ?`, [data], (err, results) => {
        if (err) {
            return callBack(err)
        } else {
            db.query(`delete from tb_petugas where kd_petugas = ?`,
                [data]);
            return callBack(null, results[0])
        }
    })
}

const serviceGetUserByEmail = (email, callBack) => {
    db.query(`select * from tb_petugas where email=? `, [email], (err, results) => {
        if (err) {
            return callBack(err)
        } else {
            return callBack(null, results[0])
        }
    }
    )
}

module.exports = {
    add,
    get,
    getId,
    update,
    del,
    serviceGetUserByEmail
}