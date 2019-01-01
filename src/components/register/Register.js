import React from 'react'


class Register extends React.Component {
    constructor(props) {
        super();
        this.state = {
            email: '',
            password: '',
            name: '',
            errors: {},
            isFormValid: true,
            isNameValid: true,
            isEmailValid: true,
            isPasswordValid: true
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
        let formIsValid = true;
        let isNameValid = true;
        let isEmailValid = true;
        let isPasswordValid = true;

        //Name
        if(!name){
            formIsValid = false;
            isPasswordValid = false;
            errors["name"] = "Cannot be empty";
        }

        else if(!email) {
            formIsValid = false;
            isEmailValid = false;
            errors["email"] = "Cannot be empty";
        }

        else if(!password) {
            formIsValid = false;
            isPasswordValid = false;
            errors["password"] = "Cannot be empty";
        }
        
        else if(typeof name !== "undefined"){
            if(!name.match(/^[a-zA-Z]+$/)){
            formIsValid = false;
            isNameValid = false;
            errors["name"] = "Name can only contain letters";
            }      	
        
        else if(typeof password !== 'undefined') {
            if(password.length < 6) {
                formIsValid = false;
                isPasswordValid = false;
                errors["password"] = "Password must be more than 6 characters long"
            }
        }
    
        }

        this.setState({errors: errors, isFormValid: formIsValid, isEmailValid: isEmailValid, isPasswordValid: isPasswordValid, isNameValid: isNameValid});
    }

    onSubmitSignIn = () => {
        if(this.state.isFormValid){
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

    handleErrorDisplay = () => {
        const error = "w-90 ba br2 pa3 mt2 dark-red bg-washed-red center flex flex-column";
        const hidden = "style={display: none}";
        switch (this.state.isFormValid) {
            case false:
                return error;
            default: 
                return hidden;
        }
    }

    render() {
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
            <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Register</legend>
                <div className={this.handleErrorDisplay()}>
                    <span>{this.state.errors["name"]}</span>
                    <span>{this.state.errors["email"]}</span>
                    <span>{this.state.errors["password"]}</span>
                </div>
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