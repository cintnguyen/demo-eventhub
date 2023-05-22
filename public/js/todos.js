const form = document.getElementById('chatGPTSearchToDos');
const toDoListExist = document.getElementById('toDoListExist')

form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevents the default form submission behavior
    const exist = toDoListExist.value === "true" 
    if (exist === false || confirm('Are you sure you want to clear your to do list?')) {
        form.submit(); // Submit the form
    } else {
        // Optionally, perform any other actions when the user cancels
    }
});