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

        var menuItem = $(this).closest('li'); // Tìm phần tử cha 'li' chứa thông tin món ăn
        // Hoặc có thể là $(this).closest('.menu-box'); tùy thuộc vào cấu trúc HTML thực tế của bạn
        // Dựa trên HTML bạn cung cấp, '.menu-box' hoặc 'li' đều hợp lý.
        // Tôi sẽ dùng 'li' vì mỗi 'li' chứa một món ăn hoàn chỉnh.

        // Lấy thông tin từ các thuộc tính data của phần tử 'li'
        // LƯU Ý: Bạn cần THÊM các thuộc tính data-name, data-price, data-ingredient, data-image
        // vào các thẻ 'li' hoặc 'div class="menu-box"' của từng món ăn trong HTML của bạn.
        var itemName = menuItem.find('.item-title a').text(); // Lấy tên món ăn từ text của thẻ 'a'
        var itemPrice = menuItem.find('.item-price').text(); // Lấy giá món ăn từ text của thẻ 'span'
        var itemImage = menuItem.find('.img-menu img').attr('src'); // Lấy đường dẫn ảnh

        // Giả sử bạn muốn hiển thị một thành phần mặc định nếu không có data-ingredient
        var itemIngredient = "Được chế biến với nguyên liệu tốt nhất."; // Mặc định
        // Nếu bạn muốn lấy thành phần cụ thể, bạn cần thêm data-ingredient vào HTML
        // itemIngredient = menuItem.data('ingredient'); // Nếu có data-ingredient

        // Cập nhật nội dung của modal
        $('#modal-name').text(itemName);
        $('#modal-price').text(itemPrice);
        $('#modal-ingredient').text(itemIngredient); // Có thể thay đổi nếu bạn thêm data-ingredient
        $('#modal-img').attr('src', itemImage);

        // Đối với các hình ảnh bổ sung trong modal (modal-img-link-1, 2, 3),
        // bạn cần thêm các thuộc tính data tương ứng vào HTML của món ăn
        // và sau đó cập nhật chúng ở đây. Ví dụ:
        // $('#modal-img-link-1 img').attr('src', menuItem.data('extra-image-1'));
        // $('#modal-img-link-2 img').attr('src', menuItem.data('extra-image-2'));
        // $('#modal-img-link-3 img').attr('src', menuItem.data('extra-image-3'));

        // Hiển thị modal
        $('#food-content').modal('show');
    });
});
