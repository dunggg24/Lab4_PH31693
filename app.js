const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const sinhvienRoute = require('./routes/sinhvienRoute');
const SinhVien = require('./models/sinhvienModel');
//tao doi tuong express
const app = express();
//ket noi csdl
mongoose.connect('mongodb://localhost:27017/and103',{
    useNewUrlparser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('Da ket noi thanh cong voi db');
}).catch((err)=>{
    console.error("Loi:"+ err);
});
//su dung bodyparser (lay du lieu tu request)
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//su dung route
app.use('/sinhvien',sinhvienRoute);
// cap nhat duong dan va upload vao thu muc
const uploadsDir = path.join(__dirname,'uploads');
app.use('/uploads',express.static(uploadsDir));
//su dung ejs
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
//xu ly yeu cau den trang chinh
app.get('/',async(req,res)=>{
    try {
        //lay danh sach sinh vien
        const sinhviens = await SinhVien.find();
        //render
        res.render('index',{sinhviens: sinhviens});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: error});
    }
});
//xu ly xoa
app.use(bodyParser.json());
app.use((req,res,next)=> {
    if(req.query._method==='DELETE'){
        req.method = 'DELETE';
        req.url = req.path;

    }
    next();
});

app.delete('/sinhvien/:id', async (req, res) => {
    const id = req.params.id; // Lấy về id từ route parameter
    try {
        await SinhVien.findByIdAndDelete(id);
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});


//khoi dong server
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log('server dang chay o cong ${PORT}');
});

