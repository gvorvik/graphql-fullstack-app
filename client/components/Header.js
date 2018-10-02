import React, {Component} from 'react';
import {graphql} from 'react-apollo';
import query from '../queries/currentUser';
import mutation from '../mutations/Logout';
import {Link} from 'react-router';

class Header extends Component {

    onLogoutClick() {
        this.props.mutate({
            refetchQueries: [{ query }]
        });
    }

    renderButtons() {
        const {loading, currentUser} = this.props.data

        if(loading) {
            return <div></div>
        } 

        if(currentUser) {
            return (
               <li>
                   <a onClick={this.onLogoutClick.bind(this)}>
                       Logout
                   </a>
               </li>
            ); 
        } else {
            return (
                <div>
                    <li>
                        <Link to="/signup">Sign Up</Link>
                    </li>
                    <li>
                        <Link to="/login">Log In</Link>
                    </li>
                </div>
            );
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo left">
                        Home
                    </Link>
                    <ul className="right">
                        {this.renderButtons()}
                    </ul>
                </div>
            </nav>
        )
    }
}

export default graphql(mutation) (
    graphql(query)(Header)
);