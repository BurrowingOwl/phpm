import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

const SIGNUP = gql`
  mutation SignUp($userInput: SignupInput) {
    signup(userInput: $userInput) {
      user
    }
  }
`;

class SignUp extends Component {
  state = {
    user_id: '',
    password: '',
    password_confirm: '',
    username: '',
    phone: '',
    email: '',
    email_subscribe: false,
    zip_code: '',
    road_address: '',
    address_detail: '',
  }
  _confirm = async data => {
    const { token } =  data.login;
    this._saveUserData(token);
  }
  execDaumPostcode = () => {
    new daum.Postcode({
      oncomplete: (data) => {
        let fullAddr = data.roadAddress;
        let extraAddr = '';

        if (data.userSelectedType === 'R') {
          fullAddr = data.roadAddress;
        }
        else {
          fullAddr = data.jibunAddress;
        }

        if (data.userSelectedType === 'R') {
          if (data.bname !== '') {
            extraAddr += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddr += (extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddr += (extraAddr !== '' ? ` (${extraAddr})` : '');
        }
        this.setState({ zip_code: data.zonecode, road_address: fullAddr });
      },
    }).open();
  }
  handleSignUp = signup => () => {
    const { user_id, password, username, phone, email, zip_code, road_address, address_detail } = this.state;
    const address = road_address + address_detail;
    signup({ variables: { userInput: { user_id, password, username, phone, email, zip_code, address } } })
      .then(() => console.log('hey'));
  }

  render() {
    const { user_id, password, password_confirm, username, phone, email, email_subscribe, zip_code, road_address, address_detail } = this.state;
    return (
      <Mutation mutation={SIGNUP}>
        {
          (signUp) => (
            <form autoComplete="off">
              <div>
                <TextField
                  id="user_id"
                  label="아이디"
                  value={user_id}
                  onChange={e => this.setState({ user_id: e.target.value })}
                  margin="normal"
                  fullWidth={true}
                />
              </div>
              <div>
                <TextField
                  id="password"
                  label="비밀번호"
                  value={password}
                  onChange={e => this.setState({ password: e.target.value })}
                  margin="normal"
                  fullWidth={true}
                />
              </div>
              <div>
                <TextField
                  id="password_confirm"
                  label="비밀번호 확인"
                  value={password_confirm}
                  onChange={e => this.setState({ password_confirm: e.target.value })}
                  margin="normal"
                  fullWidth={true}
                />
              </div>
              <div>
                <TextField
                  id="name"
                  label="이름"
                  value={username}
                  onChange={e => this.setState({ username: e.target.value })}
                  margin="normal"
                  fullWidth={true}
                />
              </div>
              <div>
                <TextField
                  id="phone"
                  label="전화번호"
                  value={phone}
                  onChange={e => this.setState({ phone: e.target.value })}
                  margin="normal"
                  fullWidth={true}
                  placeholder="010-0000-0000"
                />
              </div>
              <div>
                <TextField
                  id="email"
                  label="이메일"
                  value={email}
                  onChange={e => this.setState({ email: e.target.value })}
                  margin="normal"
                  fullWidth={true}
                  placeholder="userId@email.com"
                />
              </div>
              <div>
                <TextField
                  id="zip_code"
                  label="우편번호"
                  value={zip_code}
                  onChange={e => this.setState({ zip_code: e.target.value })}
                  margin="normal"
                  style={{ marginRight: 20, width: '30%' }}
                />
                <Button variant="outlined" color="primary" onClick={this.execDaumPostcode}>
                  우편번호찾기
                </Button>
                <br />
                <TextField
                  id="road_address"
                  label="주소"
                  value={road_address}
                  onChange={e => this.setState({ road_address: e.target.value })}
                  margin="normal"
                  style={{ marginRight: 20, width: '30%' }}
                />
                <TextField
                  id="address_detail"
                  label="상세주소"
                  value={address_detail}
                  onChange={e => this.setState({ address_detail: e.target.value })}
                  style={{ marginRight: 20, width: '50%' }}
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Switch disableRipple checked={email_subscribe} onChange={e => this.setState({ email_subscribe: e.target.checked })} value="checkedB" />
                  }
                  label="이메일 수신여부"
                />
              </div>
              <Button variant="outlined" color="primary" onClick={this.handleSignUp(signUp)}>
                회원가입
              </Button>
            </form>
          )
        }
      </Mutation>

    );
  }
}
export default SignUp;
