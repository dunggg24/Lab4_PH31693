// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');//npm i path
// const SinhVien = require('../models/sinhvienModel');
// //viet cac route
// const storage = multer.diskStorage({
//     destination: (req,file,cb)=> {
//         cb(null,'uploads/')
//     },
//     filename:(req,file,cb)=>{
//         cb(null,file.fieldname+'-'+Date.now()
//         +path.extname(file.originalname));
//     }
// });
// const upload = multer({storage:storage});
// //form xoa sinh vien
// router.get('/form',(req,res)=>{
//     res.sendFile(path.join(__dirname),'../views/form.html');

// });
// //thuc hien them sinh vien
// router.post('/',upload.single('picture'),
// async(req,res)=>{
// try {
//     const {name} = req.body;
//     const picture = req.file? req.file.fieldname: null;
//     const sv = new SinhVien({name,picture});
//     await sv.save();
//     res.redirect('/');

// } catch (err) {
//     console.error(err);
//     res.status(500).json({error: err});
// }
// });
// module.exports = router;


const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const SinhVien = require('../models/sinhvienModel');

// Cấu hình multer để upload file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Route để hiển thị form
router.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/form.html'));
});

// Route để xử lý khi người dùng gửi form
router.post('/', upload.single('picture'), async (req, res) => {
    try {
        const { name } = req.body;
        const picture = req.file ? req.file.fieldname : null;
        const sv = new SinhVien({ name, picture });
        await sv.save();
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }
});

module.exports = router;
