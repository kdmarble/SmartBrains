import React from 'react'


class SignIn extends React.Component {
    constructor(props) {
        super();
        this.state = {
            signInEmail: '',
            signInPassword: '',
            errors: {},
            isFormValid: true,
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
        let formIsValid = true;

        // Email
        if(!signInEmail) {
            formIsValid = false;
            errors["email"] = "Cannot be empty";
        } 

        // Password
        else if(!signInPassword) {
            formIsValid = false;
            errors["password"] = "Cannot be empty";
        }

        this.setState({errors: errors, isFormValid: formIsValid});
    }

    onSubmitSignIn = (evt) => {
        if(this.state.isFormValid){
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

    handleErrorDisplay = () => {
        const error = "w-90 ba br2 pa3 mt2 dark-red bg-washed-red center flex flex-column";
        const hidden = "style={display: none}";
        if (this.state.isFormValid) {
            return hidden
        } else {
            return error
        }
    }

    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
            <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                <div className={this.handleErrorDisplay()}>
                    <span>{this.state.errors["email"]}</span>
                    <span>{this.state.errors["password"]}</span>
                </div>
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
            </fieldset>
            <div className="">
                <input 
                onClick={(e) => {this.onSubmitSignIn(); this.handleValidation()}}
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