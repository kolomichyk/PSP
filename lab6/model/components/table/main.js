export class TableComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return (
            `
                <table id="student" class="table"> 
                </table>
            `
        )
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
    }
}