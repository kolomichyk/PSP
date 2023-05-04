export class SortButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("sort-button")
            .addEventListener("click", listener)
    }

    getHTML() {
        return (
            `
                <button id="sort-button" class="btn btn-primary" type="button" style ="position: relative; left:20%; margin-top:50px;">Сортировка по фамилии</button>
            `
        )
    }

    render(listener) { // add listener
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}