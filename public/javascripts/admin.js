$(document).ready(function () {
    $(".remove-cate").click(function () {
        if(confirm("Are u sure want to delete this cate ?")) {
            var id = $(this).attr('id-delete');
            var csrf = $(this).attr('csrf');
            $.ajax({
                url: '/categories/delete/'+id,
                type: "DELETE",
                data: {_csrf: csrf},
                success: function (data) {
                    if(data === 'ok') {
                        $("tr#"+id).remove();
                    }
                }
            });
        }
    });
    $(".remove-post").click(function () {
        if(confirm("Are u sure want to delete this post ?")) {
            var id = $(this).attr('id-delete');
            var csrf = $(this).attr('csrf');
            $.ajax({
                url: '/posts/delete/'+id,
                type: "DELETE",
                data: {_csrf: csrf},
                success: function (data) {
                    if(data === 'ok') {
                        $("tr#"+id).remove();
                    }
                }
            });
        }
    });
    $(".remove-user").click(function () {
        if(confirm("Are u sure want to delete this user ?")) {
            var id = $(this).attr('id-delete');
            var csrf = $(this).attr('csrf');
            $.ajax({
                url: '/users/delete/'+id,
                type: "DELETE",
                data: {_csrf: csrf},
                success: function (data) {
                    if(data === 'ok') {
                        $("tr#"+id).remove();
                    }
                }
            });
        }
    });
    $(".remove-comment").click(function () {
        if(confirm("Are u sure want to delete this comment ?")) {
            var id = $(this).attr('id-delete');
            var csrf = $(this).attr('csrf');
            $.ajax({
                url: '/comments/delete/'+id,
                type: "DELETE",
                data: {_csrf: csrf},
                success: function (data) {
                    if(data === 'ok') {
                        $("tr#"+id).remove();
                    }
                }
            });
        }
    });
});