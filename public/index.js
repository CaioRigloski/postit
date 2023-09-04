function addPost(description, title) {
    $('#postit-list').append(`<div class="postit">
        ${title ? `<h3 class="title">${title}</h3>` : '<span class="title-span"></span>'}
        <p class="description">${description}</p>
    </div>`)
}

$('#add-post').on('click', function() {
    addPost('teste')
})