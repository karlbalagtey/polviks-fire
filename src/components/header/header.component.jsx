import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { signOutStart } from "../../redux/user/user.actions";

import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdownContainer from "../cart-dropdown/cart-dropdown.container";
import { selectCartHidden } from "../../redux/cart/cart.selector";
import { selectCurrentUser } from "../../redux/user/user.selector";
import { ReactComponent as Logo } from "../../assets/crown.svg";

import {
    HeaderContainer,
    LogoContainer,
    OptionsContainer,
    OptionLink
} from "./header.styles";

const Header = ({ currentUser, hidden, userSignout }) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className="logo" />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to="/shop">SHOP</OptionLink>
            <OptionLink to="/shop">CONTACT</OptionLink>
            {currentUser ? (
                <OptionLink as="div" onClick={userSignout}>SIGN OUT</OptionLink>
            ) : (
                <OptionLink to="/signin">SIGN IN</OptionLink>
            )}
            <CartIcon />
        </OptionsContainer>
        {hidden ? null : <CartDropdownContainer />}
    </HeaderContainer>
);

const mapDispatchToProps = dispatch => ({
    userSignout: () => dispatch(signOutStart()) 
})

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
