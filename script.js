const display = document.querySelector("#table");
const form = document.querySelector("#book-form");

let myLibrary = [];

function Book(title, author, pages, read, id)  {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.id = id;
	displayed = false;
	this.displayBook = function() {
		let tr = document.createElement("tr");
		let title = document.createElement("td");
		let author = document.createElement("td");
		let pages = document.createElement("td");
		let read = document.createElement("td");
		let remove = document.createElement("td");
		let removeButton = document.createElement("button");
		let readInput = document.createElement("input");

		tr.id = `${this.id}`;	

		removeButton.textContent = "Delete";
		removeButton.onclick = () => this.removeBook();

		readInput.addEventListener("click", () => {
			this.updateRead();
		})
		readInput.type = "checkbox";
		readInput.id = `${this.id}-read`;

		title.textContent = this.title;
		author.textContent = this.author;
		pages.textContent = this.pages;
		readInput.checked = this.read;

		read.appendChild(readInput);
		remove.appendChild(removeButton);
		tr.append(title, author, pages, read, remove);

		display.appendChild(tr);
	}
	this.removeBook = function() {
		let book = document.getElementById(`${this.id}`);
		book.remove();
		myLibrary.splice(this.id, 1);
	}
}

Book.prototype.updateRead = function () {
	let read = document.getElementById(`${this.id}-read`);
	this.read = read.checked;
}

function updateDisplay() {
	myLibrary.forEach(book => {
		if (!book.displayed) {
			book.displayBook();
			book.displayed = true;
		}
	});
}

function addBookToLibrary() {

	let id = myLibrary.length;

	let newBook = new Book(document.querySelector("#title").value,
	document.querySelector("#author").value,
	Number(document.querySelector("#pages").value),
	document.querySelector("#read").checked,
	id);

	myLibrary.push(newBook);

	updateDisplay();
	form.reset();
	document.body.classList.toggle("popup");
}

function popup() {
	document.body.classList.toggle("popup");
}

updateDisplay();