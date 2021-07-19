const express = require('express');
const route = express.Router();
const mysql = require('mysql');

//数据库连接池

var pool = mysql.createPool({
    connectionLimit: 10,
    host: '132.145.82.81',
    port: '3306',
    user: 'root',
    password: '880623ll',
    database: 'lilong'
});

route.get("/getstudents", (req, res)=>{
    console.log(req.query.suppliername)
    let sql = 'select * from supplier1 where 1=1';
    let params = [];

    //拼接sql
    if(req.query.suppliername){
        sql+=" and supplier_name like ?";
        params.push(req.query.suppliername);
        //根据筛选条件查询信息
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(sql, params, function (error, results, fields) {

                connection.release();
                //console.log(results);
                res.render('student', {
                    res: results,
                    searchname: req.query.suppliername?req.query.suppliername:''
                })
                if (error) throw error;

            });
        });
        
    }else{
        res.render('student', {
            res: results=[0],
            searchname: req.query.suppliername?req.query.suppliername:''
        })
    }


})


route.get("/increase",(req,res)=>{
    console.log(req.query);
    
    res.render('increase', {
        res: []
    })

})

//提交新增
route.get('/new',(req,res)=>{
    //获取所有信息
    let sql = "insert into supplier1 (supplier_name,supplier_address,telephone,bank_name,bank_account,bank_code,social_credit_code,personhood,range_run,person,phone_number) values (?,?,?,?,?,?,?,?,?,?,?)";
    let params = [];
    params.push(req.query.sn);
    params.push(req.query.sa);
    params.push(req.query.te);
    params.push(req.query.bn);
    params.push(req.query.ba);
    params.push(req.query.bc);
    params.push(req.query.scc);
    params.push(req.query.ph);
    params.push(req.query.rr);
    params.push(req.query.pe);
    params.push(req.query.pn);
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(sql, params, function (error, results, fields) {

            connection.release();

            res.redirect('/getstudents')
            
            if (error) throw error;
        })

    });

})

//显示修改页面
route.get('/editstu',(req,res)=>{
    //接受信息
    if(req.query.supplier_name){
        let sql = 'select * from supplier1 where supplier_name = ?';
        let params = [req.query.supplier_name];
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(sql, params, function (error, results, fields) {

                connection.release();
                res.render('editstu', {
                    supplier:{
                        id:results[0].id,
                        supplier_name:results[0].supplier_name,
                        supplier_address:results[0].supplier_address,
                        telephone:results[0].telephone,
                        bank_name:results[0].bank_name,
                        bank_account:results[0].bank_account,
                        bank_code:results[0].bank_code,
                        social_credit_code:results[0].social_credit_code,
                        personhood:results[0].personhood,
                        range_run:results[0].range_run,
                        person:results[0].person,
                        phone_number:results[0].phone_number,
                    }
                })
                if (error) throw error;

            });
        });

    }else{
        res.redirect('/getstudents')
    }
})

route.get('/update',(req,res)=>{
    //获取所有信息
    
    let sql = `update supplier1 set supplier_name = ?, 
                                    supplier_address = ?,
                                    telephone=?,
                                    bank_name=?,
                                    bank_account=?,
                                    bank_code=?,
                                    social_credit_code=?,
                                    personhood=?,
                                    range_run=?,
                                    person=?,
                                    phone_number=?
                                    where id = ?`;
    let params = [];
    params.push(req.query.sn);
    params.push(req.query.sa);
    params.push(req.query.te);
    params.push(req.query.bn);
    params.push(req.query.ba);
    params.push(req.query.bc);
    params.push(req.query.scc);
    params.push(req.query.ph);
    params.push(req.query.rr);
    params.push(req.query.pe);
    params.push(req.query.pn);
    params.push(req.query.id);

    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(sql, params, function (error, results, fields) {

            connection.release();

            res.redirect('/getstudents')
            
            if (error) throw error;
        })

    });
})

module.exports = route;