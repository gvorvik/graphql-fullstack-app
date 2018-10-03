import React, {Component} from 'react';
import AuthForm from './AuthForm';
import {hashHistory} from 'react-router';
import {graphql} from 'react-apollo';
import mutation from '../mutations/Login';
import query from '../queries/currentUser';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: [],
        }
    }

    componentWillUpdate(nextProps) {
        // this.props = old, current set of props
        // nextProps = props that will be in place on when updated
        if(!this.props.data.currentUser && nextProps.data.currentUser) {
            hashHistory.push('/dashboard');
        }
    }

    onSubmit({email, password}) {
        this.props.mutate({
            variables: {
                email,
                password
            },
            refetchQueries: [{query}]
        })
        .catch(err => {
            const errors = err.graphQLErrors.map(error => error.message);
            this.setState({errors});
        });
    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <AuthForm 
                    onSubmit={this.onSubmit.bind(this)}
                    errors={this.state.errors}
                />
            </div>
        );
    }
}

export default graphql(query)(
    graphql(mutation)(LoginForm)
);