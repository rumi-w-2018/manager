import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {
  onEmailChange = text => {
    this.props.emailChanged(text);
  };

  onPasswordChange = text => {
    this.props.passwordChanged(text);
  };

  onLoginBtnPress = () => {
    const { email, password } = this.props;
    this.props.loginUser(email, password);
  };

  renderButton = () => {
    if (this.props.loading) {
      return <Spinner />;
    }
    return <Button onPress={this.onLoginBtnPress}>Login</Button>;
  };

  renderError = () => {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>{this.props.error}</Text>
        </View>
      );
    }
  };

  render() {
    console.log('error', this.props.error);

    return (
      <Card>
        <CardSection>
          <Input
            value={this.props.email}
            label="Email"
            placeholder="email@email.com"
            secureTextEntry={false}
            onChangeText={email => this.onEmailChange(email)}
          />
        </CardSection>
        <CardSection>
          <Input
            value={this.props.password}
            label="Password"
            placeholder="password"
            secureTextEntry
            onChangeText={password => this.onPasswordChange(password)}
          />
        </CardSection>

        {this.renderError()}

        <CardSection>{this.renderButton()}</CardSection>
      </Card>
    );
  }
}

const mapStateToState = ({ auth }) => {
  const { email, password, error, loading } = auth;
  return { email, password, error, loading };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ emailChanged, passwordChanged, loginUser }, dispatch);
};

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
});

export default connect(
  mapStateToState,
  mapDispatchToProps
)(LoginForm);
