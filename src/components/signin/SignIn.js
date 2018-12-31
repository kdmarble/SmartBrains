import React from 'react'


class SignIn extends React.Component {
    constructor(props) {
        super();
        this.state = {
            signInEmail: '',
            signInPassword: '',
            errors: {},
            isFormValid: {
                email: true,
                password: true
            }
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }
    
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    handleValidation = () => {
        const { signInEmail, signInPassword } = this.state;
        let errors = {};
        let formIsValid = {};

        // Email
        if(!signInEmail) {
            formIsValid["email"] = false;
            errors["email"] = "Cannot be empty";
        }

        if(typeof signInEmail !== "undefined") {
            let lastAtPos = signInEmail.lastIndexOf('@');
            let lastDotPos = signInEmail.lastIndexOf('.');

            if(!(lastAtPos < lastDotPos && lastAtPos > 0 && signInEmail.indexOf('@') === -1 && lastDotPos > 2 && (signInEmail.length - lastDotPos) > 2)) {
                formIsValid["email"] = false;
                errors["email"] = "Email is not a valid format";
            }
        }

        // Password
        if(!signInPassword) {
            formIsValid["password"] = false;
            errors["password"] = "Cannot be empty";
        }

        if(typeof signInPassword !== 'undefined') {
            if(signInPassword.length < 6) {
                formIsValid["password"] = false;
                errors["password"] = "Password must be more than 6 characters long"
            }
        }

        this.setState({errors: errors, isFormValid: formIsValid});
        return formIsValid;
    }

    onSubmitSignIn = (evt) => {
        if(this.handleValidation()){
            fetch('https://afternoon-cove-73657.herokuapp.com/signin', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: this.state.signInEmail,
                    password: this.state.signInPassword
                })
            })
                .then(response => response.json())
                .then(user => {
                    if (user.id) {
                        this.props.loadUser(user);
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
        const { onRouteChange } = this.props;
        const error = "w-90 ba br2 pa3 mt2 dark-red bg-washed-red center";
        const hidden = "style={display: none}"
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
            <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
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
                <div className={this.state.isFormValid.email ? hidden : error}>{this.state.errors["email"]}</div>
                </div>
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
                <div className={this.state.isFormValid.password ? hidden : error}>{this.state.errors["password"]}</div>
                </div>
            </fieldset>
            <div className="">
                <input 
                onClick={this.onSubmitSignIn} 
                onKeyPress={this.handleKeyPress}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                type="submit" 
                value="Sign in" 
                />
            </div>
            <div className="lh-copy mt3">
                <p onClick={() => onRouteChange('register')} href="#0" className="f6 link dim black db pointer">Register</p>
            </div>
            </div>
            </main>
            </article>
        )
    }
}

export default SignIn