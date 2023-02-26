class Validator {

    form = '';


    fields = {
        email: [],
        password: [],
    };

    isValid = true;

    /**
     * @param {string} form Target form's ID
     * @param {object} fields {string Email_Field_ID, string Password_Field_ID}
     */
    constructor(form, fields) {
        this.form = document.getElementById(form);
        if (this.form == undefined) {
            throw new Error("Invalid id for 'form'.");
        }
        if (fields.email != undefined) {
            this.fields.email = document.getElementById(fields.email);
            if (this.fields.email == undefined) {
                throw new Error("Invalid id for 'form'.");
            }
            else {
                this.fields.email.addEventListener('input', this.validateEmail);
            }
        }
        if (fields.password != undefined) {
            this.fields.password = document.getElementById(fields.password);
            if (this.fields.password == undefined) {
                throw new Error("Invalid id for 'form'.");
            }
            else {
                this.fields.password.addEventListener('input', this.validatePassword);
            }
        }
        this.form.addEventListener('submit', this.Validate);
    }
    Validate = (ev) => {
        this.validateEmail();
        this.validatePassword();
        if (!this.isValid) {
            ev.preventDefault();
            return false;
        }
    }

    validateEmail = () => {
        let email = this.fields.email.value;
        //if field is empty
        if (email == "") {
            this.fields.email.style.backgroundColor = "";
            //Hide tooltip
            document.getElementById('email-tip').style.height = '0px';
            document.getElementById('email-tip').style.opacity = '0';
            //show footer
            document.getElementsByClassName('form-wrapper')[0].style.overflowY = 'hidden';
        }
        //if check for correct segmenting
        else if (/^(^[A-Z0-9][A-Z0-9\.!#$%&'*+-/=?^_`{|]{0,63})(?:@)([A-Z0-9][A-Z0-9\-\.]{0,63})(?:\.)([A-Z\-\.]{1,63})/gi.test(email)) {
            this.isValid = true;
            this.fields.email.style.background = 'rgba(28,230,30,0.3)'
            //Hide tooltip
            document.getElementById('email-tip').style.height = '0px';
            document.getElementById('email-tip').style.opacity = '0';
            //show footer
            document.getElementsByClassName('form-wrapper')[0].style.overflowY = 'hidden';
        }
        else {
            this.isValid = false;
            this.fields.email.style.background = 'rgba(255,0,8,0.3)';
            //Show tooltip
            document.getElementById('email-tip').style.height = 'auto';
            document.getElementById('email-tip').style.opacity = '100%';
            //Hide footer
            document.getElementsByClassName('form-wrapper')[0].style.overflowY = 'scroll';
        }
    };

    validatePassword = () => {
        let password = this.fields.password.value;
        //if field is empty
        if (password == "") {
            this.fields.password.style.backgroundColor = "";
            this.isValid = false;
            //Hide tooltip
            document.getElementById('password-tip').style.height = '0px';
            document.getElementById('password-tip').style.opacity = '0';
            //show footer
            document.getElementsByClassName('form-wrapper')[0].style.overflowY = 'hidden';
        }
        //if password has at least 3 letters, 3 numbers and 3 special characters
        else if (/(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}:"<>?/.,;'\]\[|\\~`])[A-Z0-9!@#$%^&*()_+{}:"<>?/.,;'\]\[|\\~`]{8,}/gi.test(password)) {
            this.isValid = true;
            this.fields.password.style.background = 'rgba(28,230,30,0.3)'
            //Hide tooltip
            document.getElementById('password-tip').style.height = '0px';
            document.getElementById('password-tip').style.opacity = '0%';
            //show footer
            document.getElementsByClassName('form-wrapper')[0].style.overflowY = 'hidden';
        }
        else {
            this.isValid = false;
            this.fields.password.style.background = 'rgba(255,0,8,0.3)';
            //Show tooltip
            document.getElementById('password-tip').style.height = 'auto';
            document.getElementById('password-tip').style.opacity = '100%';
            //hide footer
            document.getElementsByClassName('form-wrapper')[0].style.overflowY = 'scroll';
        }
    };
}