const jsonServer = require('json-server')
const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 3000
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

	respon = {
		"produk": req.body.product_code,
		"nopel": req.body.customer_no,
		"nama": "Juni",
		"tagihan": "50000",
		"admin": "1000",
		"total_tagihan": "51000",
		"msg": "approve",
		"rc": "00",
		"reffid": 12345,
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