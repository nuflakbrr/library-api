const db = require("../../config/connection")

const add = (data, callBack) => {
    db.query(`SELECT * FROM tb_buku WHERE kd_buku = ?`, [data.kd_buku], (err, results) => {
        // console.log(!results[0])
        // console.log(results[0].stok)
        // console.log(null)
        if (err) {
            console.log(err)
            return
        } else if (!results[0]) {
            return callBack("BNF")
        } else if (results[0].stok < 1) {
            return callBack("Habis")
        } else {
            db.query(`SELECT kd_anggota FROM tb_anggota WHERE kd_anggota = ?`, [data.kd_anggota], (err, results) => {
                if (err) {
                    console.log(err)
                    return
                } else if (!results[0]) {
                    return callBack("ANF")
                } else {
                    db.query(`SELECT kd_petugas FROM tb_petugas WHERE kd_petugas = ?`, [data.kd_petugas], (err, results) => {
                        if (err) {
                            console.log(err)
                            return
                        } else if (!results[0]) {
                            return callBack("PNF")
                        } else {
                            db.query(`INSERT INTO tb_pinjam SET ?`, [data], (err, results) => {
                                if (err) {
                                    return callBack(err)
                                } else {
                                    db.query(`SELECT * FROM tb_buku WHERE kd_buku = ?`, [data.kd_buku], (err, results) => {
                                        // console.log(!results[0])
                                        // console.log(results[0].stok)
                                        // console.log(null)
                                        if (err) {
                                            console.log(err)
                                            return
                                        } else {
                                            hasil = results[0].stok - 1
                                            db.query(`update tb_buku SET stok=? WHERE kd_buku = ?`, [hasil, data.kd_buku]
                                            )
                                        }
                                    }
                                    )
                                }
                                return callBack(null, results)
                            }
                            )
                        }
                    }
                    )
                }
            }
            )
        }
    }
    )
}

const get = (callBack) => {
    db.query(`SELECT * FROM tb_pinjam`, [], (err, results) => {
        if (err) {
            return callBack(err)
        } else {
            return callBack(null, results[0])
        }
    })
}

const getId = (data, callBack) => {
    db.query(`SELECT * FROM tb_pinjam WHERE no_pinjam = ?`, [data], (err, results) => {
        if (err) {
            return callBack(err)
        } else {
            return callBack(null, results[0])
        }
    }
    )
}

const update = (data, callBack) => {
    db.query(`SELECT * FROM tb_pinjam WHERE no_pinjam = ?`, [data.no_pinjam], (err, results) => {
        if (err) {
            return callBack(err)
        } else {
            db.query(`UPDATE tb_pinjam SET ? WHERE no_pinjam = ?`, [
                data,
                data.no_pinjam,
            ])
            return callBack(null, results[0])
        }
    }
    )
}

const del = (data, callBack) => {
    db.query(`SELECT no_pinjam FROM tb_pinjam WHERE no_pinjam = ?`, [data.no_pinjam], (err, results) => {
        if (err) {
            return callBack(err)
        } else {
            db.query(`DELETE FROM tb_pinjam WHERE no_pinjam = ?`, [data.no_pinjam], (err, result) => {
                if (err) {
                    return callBack(err)
                } else {
                    db.query(`SELECT * FROM tb_buku WHERE kd_buku = ?`, [data.kd_buku], (err, results) => {
                        // console.log(!results[0])
                        // console.log(results[0].stok)
                        // console.log(null)
                        if (err) {
                            console.log(err)
                            return callBack(err)
                        } else {
                            hasil = results[0].stok + 1
                            db.query(`UPDATE tb_buku SET stok = ? WHERE kd_buku = ?`, [hasil, data.kd_buku])
                        }
                    }
                    )
                    return callBack(null, result[0])
                }
            }
            )
        }
    }
    )
}

module.exports = {
    add,
    get,
    getId,
    update,
    del
}