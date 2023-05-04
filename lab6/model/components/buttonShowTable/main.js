export class ButtonShowTable {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return (
            `
                <button id="showTableButton" type="button" class="btn btn-primary" style="width:100px">ALL</button>
            `
        );
    }

    addListeners(listener) {
        document.getElementById(`showTableButton`).addEventListener("click", listener);
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}