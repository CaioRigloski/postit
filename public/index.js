function addPost(description, title) {
    $('#postit-list').append(`<div class="postit">
        ${title ? `<h3 class="title">${title}</h3>` : '<span class="title-span"></span>'}
        <p class="description">${description}</p>
    </div>`)
}

$('#add-post').on('click', function() {
    $('#edit-post').css('visibility', 'visible')
})

$('#post-form').on('submit', function() {
    data = $(this).serialize()
    $.ajax({
        data: data,
        method: 'POST',
        url: 'postit',
        dataType: 'json',
        success: function(data) {
            console.log(data)
        }
    })
    return false
})