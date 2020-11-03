
let myLibrary = [];

// cretes book objects
function Book(title, author, pages, bookStatus) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.readStatus = bookStatus;

	this.info = () => `The ${this.title} by ${this.author}, ${this.pages} pages, ${this.readStatus}`
}

// adds book to the myLibrary array
function addBookToLibrary(book) {
	myLibrary.push(book);
}

let domLength = 0;

// displays books in the browser
function displayBooks() {
	let container = document.querySelector("#container");
	for (let i = container.childElementCount; i < myLibrary.length; i++) {


		let card = document.createElement("div");
		card.classList.add("card");
		card.dataset.index = i;
		console.log(`index: ${card.dataset.index}`);
		console.log(`Length: ${myLibrary.length}`);
		let title = document.createElement("h3");
		title.textContent = myLibrary[i].title;
		let author = document.createElement("p");
		author.textContent = myLibrary[i].author;
		let pages = document.createElement("p");
		pages.textContent = myLibrary[i].pages;
		let statusLabel = document.createElement("label");

		let status = document.createElement("input");
		status.type = "checkbox";
		status.name = "read-status";
		status.value = "completed";
		status.id = "status-checkbox";
		if (myLibrary[i].readStatus === "completed") {
			status.checked = true;
		}

		if (status.value === "completed" && status.checked === true) {
			myLibrary[i].readStatus = "completed";
		}
		let info = document.createElement("span");
		info.textContent = "Finished";
		statusLabel.appendChild(status);
		statusLabel.appendChild(info);

		let buttonDiv = document.createElement("div");
		let deleteButton = document.createElement("button");
		deleteButton.classList.add("delete-button");
		deleteButton.textContent = "Delete";
		buttonDiv.appendChild(deleteButton);

		card.appendChild(title);
		card.appendChild(author);
		card.appendChild(pages);
		card.appendChild(statusLabel);
		card.appendChild(buttonDiv);

		container.appendChild(card);

		deleteButton.addEventListener('click', () => {
			myLibrary.splice(card.dataset.index, 1);
			container.removeChild(card);
			let children = Array.from(container.childNodes);
			// updating {dataset.index} property of card div to be equal to array index.
			// so deleting cards can be handled properly.
			for (let i = 0; i < children.length; i++) {
				children[i].dataset.index = i;
				console.log(children[i].dataset.index)
			}
			console.table(myLibrary);
		});
	}
}

let dune = new Book("Dune", "Frank Herbert", 412, "not yet started");
let hobbit = new Book("The Hobbit", "J. R. R. Tolkien", 310, "not yet started");
addBookToLibrary(dune);
addBookToLibrary(hobbit);

// adds the book to the myLibrary array
document.querySelector("#add-book").addEventListener('click', () => {
	const title = document.getElementById("title").value;
	const author = document.getElementById("author").value;
	const pages = document.getElementById("pages").value;
	const bookStatus = document.getElementById("read-status").value;
	addBookToLibrary(new Book(title, author, pages, bookStatus));
	displayBooks();
});

displayBooks();
