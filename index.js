const express = require("express");
const app = express();
const path = require("path");
app.use(express.static('views'));
app.use(express.json({extended: false}));
app.use(express.urlencoded({ extended: true })); // Để xử lý dữ liệu từ form
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

let data = [
    { stt: 1, tenMonHoc: "Cơ sở dữ liệu", loaiMonHoc: "Cơ sở", hocKy: "HK1-2020-2021", khoa: "K.CNTT" },
    { stt: 2, tenMonHoc: "Cấu trúc dữ liệu", loaiMonHoc: "Cơ sở", hocKy: "HK1-2020-2021", khoa: "K.CNTT" },
    { stt: 3, tenMonHoc: "Công nghệ phần mềm", loaiMonHoc: "Cơ sở", hocKy: "HK1-2020-2021", khoa: "K.CNTT" },
    { stt: 4, tenMonHoc: "Công nghệ mới", loaiMonHoc: "Cơ sở", hocKy: "HK1-2020-2021", khoa: "K.CNTT" },
    { stt: 5, tenMonHoc: "Đồ án môn học", loaiMonHoc: "Cơ sở", hocKy: "HK1-2020-2021", khoa: "K.CNTT" },
];

app.get('/', (req, res) => {
    res.render('index', { data: data });
});

app.post('/add-subject', (req, res) => {
    const { tenMonHoc, loaiMonHoc, hocKy, khoa } = req.body;
    const newSubject = {
        stt: data.length + 1, 
        tenMonHoc, 
        loaiMonHoc, 
        hocKy, 
        khoa
    };
    data.push(newSubject);
    res.redirect('/'); // Sau khi thêm, chuyển hướng về trang chính
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
