class TheForce {

    field_name = '';
    label_name = '';
    OldTop = 0;

    constructor(field_name) {
        this.field_name = field_name;
        window.onload = this.positionLabels();
        window.addEventListener('resize', this.reloadPage);
    }

    reloadPage = () => {
        window.location.reload();
    }

    // refresh floating on page refresh ie field is populated so float
    resetLabel = (field, label) => {
        if (field.value != "" && !label.isFloating) {
            let top = label.style.top;
            top = top.replace('px', '');
            label.style.top = top - 30 + 'px';
            label.OldTop = top;
            label.isFloating = true;
        }
    }
    floatLabel = (label, ev) => {
        // if field is empty and label is not floating
        if (ev.target.value == "" || !label.isFloating) {
            let top = label.style.top;
            top = top.replace('px', '');
            label.style.top = top - 30 + 'px';
            label.OldTop = top;
            label.isFloating = true;
        }
    }

    unfloatLabel = (label, ev) => {
        // if field is empty and label is floating already
        if (ev.target.value == "" && label.isFloating) {
            label.style.top = label.OldTop + 'px';
            label.isFloating = false;
        }
    }

    positionLabels = () => {
        //get all input labels in form
        let fields = document.getElementsByClassName(this.field_name);
        //operate on each input field
        for (let i = 0; i < fields.length; i++) {
            // get positiopn of email input
            let field = fields[i];
            let field_xPos = field.offsetLeft;
            let field_yPos = field.offsetTop;

            // get positiopn of email label
            let label = fields[i].nextElementSibling;
            let label_xPos = label.offsetLeft;
            let label_yPos = label.offsetTop;

            // calaculate label new position
            let top = field_yPos - label_yPos;
            let left = field_xPos - label_xPos;
            // move label
            label.style.top = top + 'px';
            label.style.left = left + 'px';

            //attach onfocus event to field
            field.addEventListener('focus', this.floatLabel.bind(null, label));
            field.addEventListener('blur', this.unfloatLabel.bind(null, label));
            this.resetLabel(field, label);
        }
    }

}






