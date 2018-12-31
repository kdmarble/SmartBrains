import React from 'react'


class Register extends React.Component {
    constructor(props) {
        super();
        this.state = {
            email: '',
            password: '',
            name: '',
            errors: {},
            isFormValid: {
                name: true,
                email: true,
                password: true
            }
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }
    
    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }

    handleValidation = () => {
        const { email, password, name } = this.state;
        let errors = {};
        let formIsValid = {};

        //Name
        if(!name){
            formIsValid["name"] = false;
            errors["name"] = "Cannot be empty";
        }
    
        if(typeof name !== "undefined"){
            if(!name.match(/^[a-zA-Z]+$/)){
            formIsValid["name"] = false;
            errors["name"] = "Only letters";
            }      	
        }

        // Email
        if(!email) {
            formIsValid["email"] = false;
            errors["email"] = "Cannot be empty";
        }

        if(typeof email !== "undefined") {
            let lastAtPos = email.lastIndexOf('@');
            let lastDotPos = email.lastIndexOf('.');

            if(!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
                formIsValid["email"] = false;
                errors["email"] = "Email is not a valid format";
            }
        }

        // Password
        if(!password) {
            formIsValid["password"] = false;
            errors["password"] = "Cannot be empty";
        }

        if(typeof password !== 'undefined') {
            if(password.length < 6) {
                formIsValid["password"] = false;
                errors["password"] = "Password must be more than 6 characters long"
            }
        }

        this.setState({errors: errors, isFormValid: formIsValid});
        return formIsValid;
    }

    onSubmitSignIn = () => {
        if(this.handleValidation()){
            fetch('https://afternoon-cove-73657.herokuapp.com/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                    name: this.state.name
                })
            })
                .then(response => response.json())
                .then(user => {
                    if (user.id) {
                        this.props.loadUser(user)
                        this.props.onRouteChange('home')
                    }
                })
        }
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.onSubmitSignIn();
        }
    }

    render() {
        const error = "w-90 ba br2 pa3 mt2 dark-red bg-washed-red center";
        const hidden = "style={display: none}"
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
            <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input 
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="text" 
                name="name"  
                id="name" 
                onChange={this.onNameChange}
                onKeyPress={this.handleKeyPress}
                />
                </div>
                <div className={this.state.isFormValid.name ? hidden : error}>{this.state.errors["name"]}</div>
                <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input 
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="email" 
                name="email-address"  
                id="email-address" 
                onChange={this.onEmailChange}
                onKeyPress={this.handleKeyPress}
                />
                </div>
                <div className={this.state.isFormValid.email ? hidden : error}>{this.state.errors["email"]}</div>
                <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input 
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="password" 
                name="password"  
                id="password" 
                onChange={this.onPasswordChange}
                onKeyPress={this.handleKeyPress}
                />
                </div>
                <div className={this.state.isFormValid.password ? hidden : error}>{this.state.errors["password"]}</div>
            </fieldset>
            <div className="">
                <input 
                onClick={this.onSubmitSignIn} 
                onKeyPress={this.handleKeyPress}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Register" 
                />
            </div>
            </div>
            </main>
            </article>
        )
    }
}

export default Register