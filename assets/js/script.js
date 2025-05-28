// --- Chức năng "Back to top" ---
// Get the button
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// --- Xử lý hiển thị thông tin món ăn trong modal ---
$(document).ready(function() {
    // Lắng nghe sự kiện click trên bất kỳ thẻ <a> nào
    // mà có thuộc tính data-toggle="modal" và data-target="#food-content"
    // Đây là selector đã được sửa.
    $('a[data-toggle="modal"][data-target="#food-content"]').on('click', function(event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết

        // Tìm phần tử cha chứa tất cả thông tin món ăn.
        // Dựa trên cấu trúc HTML của bạn, 'li' là lựa chọn tốt nhất
        // vì mỗi 'li' đại diện cho một món ăn duy nhất và chứa các thuộc tính data-.
        var menuItem = $(this).closest('li');

        // Lấy thông tin từ CÁC THUỘC TÍNH DATA CỦA PHẦN TỬ menuItem
        var itemName = menuItem.data('name');
        var itemPrice = menuItem.data('price');
        var itemIngredient = menuItem.data('ingredient');
        var itemImage = menuItem.data('image');

        // Lấy các ảnh phụ (nếu có)
        var extraImage1 = menuItem.data('extra-image-1');
        var extraImage2 = menuItem.data('extra-image-2');
        var extraImage3 = menuItem.data('extra-image-3');

        // Cập nhật nội dung của modal
        $('#modal-title').text(itemName); // Cập nhật tiêu đề modal
        $('#modal-name').text(itemName); // Cập nhật tên món ăn trong body modal
        $('#modal-price').text(itemPrice);
        $('#modal-ingredient').text(itemIngredient);
        $('#modal-img').attr('src', itemImage);

        // Cập nhật và xử lý hiển thị/ẩn các hình ảnh phụ
        // Đảm bảo reset trạng thái hiển thị của các link ảnh phụ trước khi cập nhật
        $('#modal-img-link-1, #modal-img-link-2, #modal-img-link-3').show();

        if (extraImage1) {
            $('#modal-img-link-1 img').attr('src', extraImage1);
            $('#modal-img-link-1').attr('href', extraImage1);
        } else {
            $('#modal-img-link-1').hide(); // Ẩn nếu không có ảnh
        }

        if (extraImage2) {
            $('#modal-img-link-2 img').attr('src', extraImage2);
            $('#modal-img-link-2').attr('href', extraImage2);
        } else {
            $('#modal-img-link-2').hide();
        }

        if (extraImage3) {
            $('#modal-img-link-3 img').attr('src', extraImage3);
            $('#modal-img-link-3').attr('href', extraImage3);
        } else {
            $('#modal-img-link-3').hide();
        }

        // Bootstrap 4 tự động hiển thị modal khi click vào thẻ <a> có data-toggle="modal",
        // nên bạn không cần gọi $('#food-content').modal('show'); ở đây nữa.
        // Tuy nhiên, nếu bạn muốn đảm bảo, có thể giữ lại nhưng thường là không cần thiết.
        // $('#food-content').modal('show');
    });

    // Reset modal khi đóng để tránh hiển thị thông tin cũ
    $('#food-content').on('hidden.bs.modal', function () {
        $('#modal-title').text('Thông tin món ăn'); // Đặt lại tiêu đề mặc định
        $('#modal-name').text('');
        $('#modal-price').text('');
        $('#modal-ingredient').text('');
        $('#modal-img').attr('src', '');
        $('#modal-img-link-1 img, #modal-img-link-2 img, #modal-img-link-3 img').attr('src', '');
        $('#modal-img-link-1, #modal-img-link-2, #modal-img-link-3').attr('href', '#').show(); // Reset href và hiển thị lại
    });
});
