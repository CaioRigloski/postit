// GET AND RENDER POSTS
function getData() {
    $.ajax({
        method: 'GET',
        url: 'postit',
        dataType: 'json',
        success: (result) => {
            result.forEach(e => {
                addPost(e.description, e.title, e.id)
            });
        },
        error: (err) => {
            message(err.responseJSON.response)
        }
    })
}


// OPEN POST FORM
$('#add-post').on('click', function() {
    $('#edit-post input[name="title"]').val(undefined)
    $('#edit-post textarea[name="description"]').val(undefined)
    $('#edit-post').css('display', 'flex')

    $('#post-form').on('submit', function(e) {
        let data = $(this).serialize()
        let postData = {}
        $(this).serializeArray().map((item) => {
            postData[item.name] = item.value;
        })

        $.ajax({
            data: data,
            method: 'POST',
            url: 'postit',
            dataType: 'json',
            success: (result) => {
                message(result.response)
                addPost(postData.description, postData.title, result.id)
            },
            error: (err) => {
                console.log(err)
            }
        })
        // prevent page reload on submit
        e.preventDefault()
    })
})


// CLOSE POST FORM
function closePostForm() {
    $('#edit-post').css('display', 'none')
}

$('#close-edit-post').on('click', function() {
    closePostForm()
})


// EDIT POST
$('#postit-list').on('click', '.postit > div', function() {
    $('#edit-post').css('display', 'flex')

    let id = $(this).parent('.postit').attr('dataid')
    let title = $(this).children('.title').text()
    let description = $(this).children('.description').text()
    
    $('#edit-post input[name="title"]').val(title)
    $('#edit-post textarea[name="description"]').val(description)
    $('#post-form').off()

    $('#post-form').on('submit', function (e) {
        let data = $(this).serialize() + '&id=' + id
        let postData = {}
        $(this).serializeArray().map((item) => {
            postData[item.name] = item.value;
        })

        $.ajax({
            data: data,
            type: 'PUT',
            url: 'postit',
            dataType: 'json',
            success: (result) => {
                message(result.response);
                editPost(postData.description, postData.title, id)
            },
            error: (err) => {
                message(err.responseJSON.response)
            }
        })
        // prevent page reload on submit
        e.preventDefault()
    })
})


// DELETE POST
$('#postit-list').on('click', '.delete-button', function() {
    let id = $(this).parent('.postit').attr('dataid')

    $.ajax({
        data: {'id': id},
        type: 'DELETE',
        url: 'postit',
        dataType: 'json',
        success: (data) => {
            message(data.response)
            $(`.postit[dataid="${id}"]`).remove()
        },
        error: (err) => {
            message(err.responseJSON.response)
        }
    })
})


// ESCAPE KEY FUNCTIONS
$('body').on('keydown', function(e) {
    if ($('#edit-post').css('display') == 'flex' && e.key == 'Escape') {
        closePostForm()
    }
})


// FUNCTIONS FOR DYNAMIC ELEMENTS
function addPost(description, title, id) {
    $('#postit-list').append(`<div class="postit" dataid="${id}"><div>
        ${title ? `<h3 class="title">${title}</h3>` : '<span class="title-span"></span>'}
        <p class="description">${description}</p>
    </div>
    <button class="delete-button" type="button" method="">Excluir</button>
    </div>`)
}

function editPost(description, title, id) {
    $(`.postit[dataid="${id}"] > div`).children('.title').text(title)
    $(`.postit[dataid="${id}"] > div`).children('.description').text(description)
}

// display message on dynamic element
function message(msg) {
    let msgBox = $('.message')
    $(msgBox).css('visibility', 'visible')

    $('.message p').text(msg)
    
    // disappears after 2 seconds
    setTimeout(() => {
        $(msgBox).css('visibility', 'hidden')
    }, 2000);
}


// DOCUMENT ON READY
$(
    getData()
)