const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 3000
const data = require("./db.json")
var respon

server.use(middlewares)

server.use(jsonServer.bodyParser)
server.post('/inquiry', (req, res) => {

	today = new Date()
	var dd = today.getDate()
	var mm = today.getMonth()+1 //As January is 0.
	var yyyy = today.getFullYear()
	var hours = today.getHours()
	var minutes = today.getMinutes()
	var seconds = today.getSeconds()
	if(dd<10) dd='0'+dd
	if(mm<10) mm='0'+mm
	if(hours<10) hours='0'+hours
	if(minutes<10) minutes='0'+minutes
	if(seconds<10) seconds='0'+seconds
	var waktu = yyyy+"-"+mm+"-"+dd+" "+hours+":"+minutes+":"+seconds
	
	try{
		tagihan = data.pelanggan[req.body.customer_no]["produk"][req.body.product_code]
		respon = {
			"produk": req.body.product_code,
			"nopel": req.body.customer_no,
			"nama": data.pelanggan[req.body.customer_no]["nama"],
			"tagihan": tagihan,
			"admin": 3300,
			"total_tagihan": tagihan + 3300,
			"data": req.body.periode,
			"msg": "approve",
			"rc": "00",
			"reffid": "12345",
			"restime": waktu
		}
	}
	catch(err){
		respon = {
			"rc": "20",
			"msg": "Tagihan tidak ditemukan",
			"restime": waktu
		}
	}
	/*if (tagihan == undefined) {
		respon = {
			"rc": "20",
			"msg": "Tagihan tidak ditemukan",
			"restime": waktu
		}
	}
	else{
		respon = {
			"produk": req.body.product_code,
			"nopel": req.body.customer_no,
			"nama": data.pelanggan[req.body.customer_no]["nama"],
			"tagihan": tagihan,
			"admin": 3300,
			"total_tagihan": tagihan + 3300,
			"msg": "approve",
			"rc": "00",
			"reffid": 12345,
			"restime": waktu
		}
	}*/
	res.send(respon)
})

server.post('/payment', (req, res) => {

	today = new Date()
	var dd = today.getDate()
	var mm = today.getMonth()+1 //As January is 0.
	var yyyy = today.getFullYear()
	var hours = today.getHours()
	var minutes = today.getMinutes()
	var seconds = today.getSeconds()
	if(dd<10) dd='0'+dd
	if(mm<10) mm='0'+mm
	if(hours<10) hours='0'+hours
	if(minutes<10) minutes='0'+minutes
	if(seconds<10) seconds='0'+seconds
	var waktu = yyyy+"-"+mm+"-"+dd+" "+hours+":"+minutes+":"+seconds
	
	respon = {
		"produk": req.body.product_code,
		"nopel": req.body.customer_no,
		"nama": data.pelanggan[req.body.customer_no]["nama"],
		"tagihan": parseInt(req.body.amount) - 3300,
		"admin": 3300,
		"total_tagihan": parseInt(req.body.amount),
		"tanggal_lunas": waktu,
		"reff_no": 54321,
		"struk":[
		"pembayaran"+req.body.product_code,
		"",
		"ID PEL :"+req.body.customer_no,
		"NAMA :"+data.pelanggan[req.body.customer_no]["nama"],
		"REF : 5/4-3-2-1",
		"ANGSURAN KE: 5",
		"TAGIHAN : Rp "+(req.body.amount-3300),
		"BIAYA ADMIN : Rp 3300",
		"TTL TAGIHAN : Rp "+req.body.amount,
		"",
		"STRUK INI ADALAH BUKTI PEMBAYARAN YANG SAH",
		"TERIMA KASIH"
		],
		"msg": "approve",
		"rc": "00",
		"reffid": req.body.reffid,
		"restime": waktu
	}

	res.send(respon)
})

server.post('/status', (req, res) => {

	today = new Date()
	var dd = today.getDate()
	var mm = today.getMonth()+1 //As January is 0.
	var yyyy = today.getFullYear()
	var hours = today.getHours()
	var minutes = today.getMinutes()
	var seconds = today.getSeconds()
	if(dd<10) dd='0'+dd
	if(mm<10) mm='0'+mm
	if(hours<10) hours='0'+hours
	if(minutes<10) minutes='0'+minutes
	if(seconds<10) seconds='0'+seconds
	var waktu = yyyy+"-"+mm+"-"+dd+" "+hours+":"+minutes+":"+seconds
	
	respon = {
		"produk": req.body.product_code,
		"nopel": req.body.customer_no,
		"nama": data.pelanggan[req.body.customer_no]["nama"],
		"tagihan": parseInt(req.body.amount),
		"admin": 0,
		"total_tagihan": parseInt(req.body.amount),
		"biller_ref": "0000",
		"tanggal_lunas": waktu,
		"reff_no": "0123",
		"struk":[
		"<b>PT. MULTI ACCESS INDONESIA - CHIPSAKTI</b>",
		"",
		"LOKET : ZONATIK",
		"TGL BAYAR : 02/07/2018 / 14:16:44",
		"",
		"STRUK PEMBAYARAN LANGGANAN"+req.body.product_code,
		"",
		"IDPEL "+req.body.customer_no,
		"NAMA : "+data.pelanggan[req.body.customer_no]["nama"],
		"TTL TAGIHAN : Rp "+req.body.amount,
		"",
		"STRUK INI ADALAH BUKTI PEMBAYARAN YANG SAH",
		"TERIMA KASIH"
		],
		"msg": "approve",
		"rc": "00",
		"status": "payment Successfull",
		"reffid": req.body.reffid,
	}

	res.send(respon)
})

server.post('/buy', (req, res) => {

	today = new Date()
	var dd = today.getDate()
	var mm = today.getMonth()+1 //As January is 0.
	var yyyy = today.getFullYear()
	var hours = today.getHours()
	var minutes = today.getMinutes()
	var seconds = today.getSeconds()
	if(dd<10) dd='0'+dd
	if(mm<10) mm='0'+mm
	if(hours<10) hours='0'+hours
	if(minutes<10) minutes='0'+minutes
	if(seconds<10) seconds='0'+seconds
	var waktu = yyyy+"-"+mm+"-"+dd+" "+hours+":"+minutes+":"+seconds
	
	respon = {
		"rc": "00",
		"msg": "Pembelian" + req.body.product_code + "berhasil. Harga Rp. 1000",
		"sn": "12345678",
		"price": "1000",
		"restime": waktu 
	}

	res.send(respon)
})

server.post('/check', (req, res) => {

	today = new Date()
	var dd = today.getDate()
	var mm = today.getMonth()+1 //As January is 0.
	var yyyy = today.getFullYear()
	var hours = today.getHours()
	var minutes = today.getMinutes()
	var seconds = today.getSeconds()
	if(dd<10) dd='0'+dd
	if(mm<10) mm='0'+mm
	if(hours<10) hours='0'+hours
	if(minutes<10) minutes='0'+minutes
	if(seconds<10) seconds='0'+seconds
	var waktu = yyyy+"-"+mm+"-"+dd+" "+hours+":"+minutes+":"+seconds
	
	respon = {
		"rc": "00",
		"msg": "Pembelian" + req.body.product_code + "berhasil. Harga Rp. 1000",
		"sn": "12345678",
		"price": "1000",
		"restime": waktu 
	}

	res.send(respon)
})
/*
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    console.log(req.body)
    res.send(req.body)
  }
 })
*/

server.listen(port, () => {
  console.log('JSON Server is running')
})