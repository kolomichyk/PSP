export class UndoSortButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("undoSort-button")
            .addEventListener("click", listener)
    }

    getHTML() {
        return (
            `
                <button id="undoSort-button" class="btn btn-primary" type="button" style ="position: relative; left:22%; margin-top:50px;">Отменить сортировку</button>
            `
        )
    }

    render(listener) { // add listener
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}