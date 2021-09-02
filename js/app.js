document.getElementById('error-message').style.display = 'none';
document.getElementById('spinner').style.display = 'none';
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    if (searchText === '') {
        displayError()
    } 
    else {
        // Display Spinner
        document.getElementById('spinner').style.display = 'block';
        // Hide error
        document.getElementById('error-message').style.display = 'none';
        // Clear Search Result
        document.getElementById('search-result').textContent ='';
        // api url
        const url = `http://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchBook(data))
    }
}

const displaySearchBook = book => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    const bookList = book.docs;
    if (bookList === '') {
        displayError()
    } 
    else {
        document.getElementById('spinner').style.display = 'none';
        document.getElementById('error-message').style.display = 'none';
        document.getElementById('book-numbers').innerText = `Book Found ${bookList.length}`;
        bookList.forEach(books => {
            const url = `https://covers.openlibrary.org/b/id/${books.cover_i}-L.jpg`;
            console.log(url);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div  class="card h-100 text-center">
                <img src="${url}" class="w-50 h-50 mx-auto" alt="image">
                <div class="card-body">
                    <h5 class="card-title">Books Name: ${books.title}</h5>
                    <p class="card-text">Author: ${books.author_name}</p>
                    <p class="card-text">First Publisher: ${books.first_publish_year}</p>
                </div>
            `;
            searchResult.appendChild(div);
        });
    }

  
}

const displayError = () => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('book-numbers').textContent = '';
    // document.getElementById('team-details').textContent = '';

}