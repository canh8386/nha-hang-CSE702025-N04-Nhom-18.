//Get the button
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() 
{
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) 
        mybutton.style.display = "block";
    else 
        mybutton.style.display = "none";
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() 
{
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
//Get the button
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() 
{
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) 
        mybutton.style.display = "block";
    else 
        mybutton.style.display = "none";
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() 
{
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

$(document).ready(function() {
    // Đảm bảo rằng mã này chạy sau khi trang đã tải xong
    $('.menu-item-link').click(function(event) {
        event.preventDefault(); // Ngăn chặn hành vi mặc định của liên kết để modal không bị đóng ngay

        // Tìm phần tử cha chứa tất cả thông tin món ăn.
        // Dựa trên cấu trúc HTML của bạn, 'li' là lựa chọn tốt nhất
        // vì mỗi 'li' đại diện cho một món ăn duy nhất.
        var menuItem = $(this).closest('li');

        // Lấy thông tin từ CÁC THUỘC TÍNH DATA CỦA PHẦN TỬ menuItem
        // Đây là thay đổi quan trọng so với mã trước đó của bạn.
        var itemName = menuItem.data('name');
        var itemPrice = menuItem.data('price');
        var itemIngredient = menuItem.data('ingredient');
        var itemImage = menuItem.data('image');

        // Cập nhật nội dung của modal
        $('#modal-title').text(itemName); // Cập nhật tiêu đề modal
        $('#modal-name').text(itemName); // Cập nhật tên món ăn trong body modal
        $('#modal-price').text(itemPrice);
        $('#modal-ingredient').text(itemIngredient);
        $('#modal-img').attr('src', itemImage);

        // Đối với các hình ảnh bổ sung trong modal (modal-img-link-1, 2, 3),
        // bạn cần thêm các thuộc tính data-extra-image-x vào HTML của món ăn.
        // Nếu không có ảnh phụ, có thể dùng lại ảnh chính.
        $('#modal-img-link-1 img').attr('src', menuItem.data('extra-image-1') || itemImage);
        $('#modal-img-link-2 img').attr('src', menuItem.data('extra-image-2') || itemImage);
        $('#modal-img-link-3 img').attr('src', menuItem.data('extra-image-3') || itemImage);

        // Hiển thị modal
        $('#food-content').modal('show');
    });
});
