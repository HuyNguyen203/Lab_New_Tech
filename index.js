const express = require("express");
const app = express();
const path = require("path");
app.use(express.static('views'));

app.use(express.json({extended: false}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const data = [
        { stt: 1, tenMonHoc: "Cơ sở dữ liệu", loaiMonHoc: "Cơ sở", hocKy: "HK1-2020-2021", khoa: "K.CNTT" },
        { stt: 2, tenMonHoc: "Cấu trúc dữ liệu", loaiMonHoc: "Cơ sở", hocKy: "HK1-2020-2021", khoa: "K.CNTT" },
        { stt: 3, tenMonHoc: "Công nghệ phần mềm", loaiMonHoc: "Cơ sở", hocKy: "HK1-2020-2021", khoa: "K.CNTT" },
        { stt: 4, tenMonHoc: "Công nghệ mới", loaiMonHoc: "Cơ sở", hocKy: "HK1-2020-2021", khoa: "K.CNTT" },
        { stt: 5, tenMonHoc: "Đồ án môn học", loaiMonHoc: "Cơ sở", hocKy: "HK1-2020-2021", khoa: "K.CNTT" },
    ];
    
    res.render('index', { data: data }); // Truyền dữ liệu vào EJS
});

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
})