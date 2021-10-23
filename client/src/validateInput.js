export default function validateInput(values){
    let errors = {}

    //Name
    if(!values.name.trim()) {
        errors.name = "Username required"
    }

    //Email
    if(!values.email.trim()) {
        errors.email = "Email required"
    } else if(!/(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/.test(values.email)){
        errors.email = "Invalid email address"
    }

    //Password
    if(!values.password.trim()) {
        errors.password = "Password required"
    } else if(values.password.length < 6){
        errors.password = "Password needs to be at least 6 characters"
    }

    return errors;
}