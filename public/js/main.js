$(document).ready(function() {
    $('.delete-article').on('click', function(e) {
        const id = ($(this).attr('data-id'));
        console.log("detelting" + id);
        // TODO: Change it to fetch
        // $.ajax({
        //     type: "DELETE",
        //     url: '/articles/'+id,
        //     success: function(res) {
        //         window.location.href = '/';
        //         alert("DELETED Article");
        //     },
        //     error: function(err) {
        //         console.log(err);
        //     }
        // });
        fetch('/articles/'+id, {
            method: "DELETE"
        }).then( res => {
            console.log(res);
            if (res.ok)
                window.location.href = '/'
            else {
                console.log("erris " + err);
            }
        }).catch( err => { 
            console.log("NOOO" +err);
            //window.location.href = '/'
        });
    });
    
    $('.updatePost').on('click', function(e) {
        const id = ($(this).attr('data-id'));
        var updateMe = {
            title: $('#title').val(),
            author: $('#author').val(),
            body: $('#body').val()
        };
        // $.ajax({
        //     type: "PUT",
        //     url: "/articles/edit/"+id,
        //     data: updateMe,
        //     success: function(res) {
        //         window.location.href = '/';
        //     },
        //     error: function(err) {
        //         console.log(err);
        //     }
        // });
        fetch('/articles/edit/' + id, {
            method: "PUT",
            body: JSON.stringify(updateMe),
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            }
        })
        .then(res => {
            if (res.ok)
                return window.location.href = '/';
            else
                console.log(err);
        })
        .catch(err => console.log(err));
    });
});