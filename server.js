// server.js
const mysql = require('mysql2/promise');

const dbConfig = {
    host: 'localhost',
    user: 'root', // Thay bằng tên người dùng CSDL của bạn
    password: '', // Thay bằng mật khẩu CSDL của bạn
    database: 'restaurant', // Tên cơ sở dữ liệu của bạn
    waitForConnections: true,
    connectionLimit: 10, // Số lượng kết nối tối đa trong pool
    queueLimit: 0
};

// Tạo một "pool" kết nối để quản lý và tái sử dụng kết nối hiệu quả
const pool = mysql.createPool(dbConfig);

// Hàm kiểm tra kết nối (tùy chọn)
async function testDbConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Đã kết nối thành công tới cơ sở dữ liệu MySQL!');
        connection.release(); // Trả kết nối về pool
    } catch (error) {
        console.error('Không thể kết nối tới cơ sở dữ liệu:', error);
        // Có thể thoát ứng dụng nếu không kết nối được CSDL
        // process.exit(1);
    }
}

testDbConnection(); // Gọi để kiểm tra khi server khởi động

// module.exports = pool; // Nếu bạn muốn dùng pool ở các file khác
// Tiếp tục trong server.js
const express = require('express');
const path = require('path'); // Module có sẵn của Node.js để làm việc với đường dẫn tệp

const app = express();
const port = 3000; // Bạn có thể chọn một cổng khác nếu muốn

// Middleware để xử lý dữ liệu JSON và URL-encoded từ request
app.use(express.json()); // Cho phép server đọc JSON từ request body
app.use(express.urlencoded({ extended: true })); // Cho phép server đọc dữ liệu form truyền thống

// Middleware để phục vụ các tệp tĩnh (HTML, CSS, JS client-side, hình ảnh)
// Giả sử các tệp HTML của bạn (index.html, menu.html,...) và thư mục assets (css, js, img)
// nằm cùng cấp với server.js hoặc trong một thư mục public.
app.use(express.static(__dirname)); // Phục vụ tệp từ thư mục hiện tại của server.js
// Nếu bạn đặt các tệp HTML vào thư mục 'public':
// app.use(express.static(path.join(__dirname, 'public')));

// === API Endpoints ===

// API Endpoint để lấy danh sách các món ăn từ bảng menu_items
app.get('/api/menu-items', async (req, res) => {
    const category = req.query.category; // Lấy category từ query param, ví dụ: /api/menu-items?category=Pizza

    try {
        // Giả sử bảng menu_items có các cột: name, description, price, image_path, category
        let sql = "SELECT id, name, description, price, image_path, category FROM menu_items";
        const queryParams = [];

        if (category) {
            sql += " WHERE category = ?";
            queryParams.push(category);
        }

        const [rows] = await pool.query(sql, queryParams);
        res.json(rows); // Trả về danh sách món ăn dưới dạng JSON
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu menu_items:', error);
        res.status(500).json({ error: 'Lỗi máy chủ khi lấy thực đơn' });
    }
});

// API Endpoint để xử lý việc gửi form liên hệ (bảng contact_messages)
app.post('/api/contact', async (req, res) => {
    // Dữ liệu từ form sẽ nằm trong req.body
    // Các tên trường (name, mail, comment) phải khớp với thuộc tính 'name' của input trong contact.html
    const { name, mail, comment } = req.body;

    // **QUAN TRỌNG: Luôn xác thực và làm sạch dữ liệu đầu vào!**
    if (!name || !mail || !comment) {
        return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin.' });
    }
    // Kiểm tra email đơn giản
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
         return res.status(400).json({ error: 'Địa chỉ email không hợp lệ.' });
    }

    try {
        // Giả sử bảng contact_messages có các cột: name, email, message
        const sql = "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)";
        const [result] = await pool.query(sql, [name, mail, comment]);
        res.json({ success: true, message: 'Tin nhắn của bạn đã được gửi thành công!', insertedId: result.insertId });
    } catch (error) {
        console.error('Lỗi khi lưu tin nhắn liên hệ:', error);
        res.status(500).json({ error: 'Lỗi máy chủ khi gửi tin nhắn' });
    }
});

// API Endpoint để xử lý đặt bàn (bảng reservations)
app.post('/api/reservations', async (req, res) => {
    // Lấy dữ liệu từ form trong table.html
    // Ví dụ: name, date, time, guest (số khách), comment (lời nhắn)
    const { name, date, time, guest, comment } = req.body;

    if (!name || !date || !time || !guest) {
        return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin bắt buộc (Tên, Ngày, Giờ, Số khách).' });
    }

    try {
        // Giả sử bảng reservations có các cột tương ứng
        const sql = "INSERT INTO reservations (name, reservation_date, reservation_time, guest_count, message) VALUES (?, ?, ?, ?, ?)";
        const [result] = await pool.query(sql, [name, date, time, parseInt(guest), comment || null]);
        res.json({ success: true, message: 'Đặt bàn của bạn đã được ghi nhận!', reservationId: result.insertId });
    } catch (error) {
        console.error('Lỗi khi lưu đặt bàn:', error);
        res.status(500).json({ error: 'Lỗi máy chủ khi thực hiện đặt bàn' });
    }
});


// Khởi động server
app.listen(port, () => {
    console.log(`Máy chủ Node.js đang chạy tại http://localhost:${port}`);
    console.log(`Phục vụ các tệp tĩnh từ thư mục: ${__dirname}`);
});