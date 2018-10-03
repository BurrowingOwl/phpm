import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

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
    error: {
      user_id: '',
      password: '',
      password_confirm: '',
      username: '',
      phone: '',
      email: '',
      email_subscribe: '',
      zip_code: '',
      road_address: '',
      address_detail: '',
    },
  }
  _confirm = async data => {
    const { token } =  data.login;
    this._saveUserData(token);
  }
  validation = () => {
    const { user_id, password, password_confirm, username, phone, email, zip_code, road_address, address_detail } = this.state;
    const defaultError = {
      user_id: '',
      password: '',
      password_confirm: '',
      username: '',
      phone: '',
      email: '',
      email_subscribe: '',
      zip_code: '',
      road_address: '',
      address_detail: '',
    };
    const newError = {};
    if (password !== password_confirm) newError.password = '비밀번호와 비밀번호 확인이 일치하지 않습니다';
    const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
    if (!phone.match(phoneRegex)) newError.phone = '전화번호가 올바르게 입력되지 않았습니다';
    const emailRegex = /^[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!email.match(emailRegex)) newError.email = '이메일이 올바르게 입력되지 않았습니다';
    if (user_id.length === 0) newError.user_id = '아이디를 입력해주세요';
    if (password.length === 0) newError.password = '비밀번호를 입력해주세요';
    if (password_confirm.length === 0) newError.password_confirm = '비밀번호 확인을 입력해주세요';
    if (username.length === 0) newError.username = '이름을 입력해주세요';
    if (phone.length === 0) newError.phone = '전화번호를 입력해주세요';
    if (email.length === 0) newError.email = '이메일을 입력해주세요';
    if (zip_code.length === 0) newError.zip_code = '우편번호 입력해주세요';
    if (road_address.length === 0) newError.road_address = '주소를 입력해주세요';
    if (address_detail.length === 0) newError.address_detail = '상세주소를 입력해주세요';
    if (Object.keys(newError).length > 0) {
      this.setState({ error: Object.assign(defaultError, newError) });
      return false;
    }
    return true;
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
    if (!this.validation()) return;
    signup({ variables: { userInput: { user_id, password, username, phone, email, zip_code, address } } });
  }

  render() {
    const { user_id, password, password_confirm, username, phone, email, email_subscribe, zip_code, road_address, address_detail, error } = this.state;
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
                { error.user_id && <FormHelperText error={true}>{error.user_id}</FormHelperText>}
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
                { error.password && <FormHelperText error={true}>{error.password}</FormHelperText> }
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
                { error.password_confirm && <FormHelperText error={true}>{error.password_confirm}</FormHelperText> }
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
                { error.username && <FormHelperText error={true}>{error.username}</FormHelperText> }
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
                { error.phone && <FormHelperText error={true}>{error.phone}</FormHelperText> }
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
                { error.email && <FormHelperText error={true}>{error.email}</FormHelperText> }
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
                { error.zip_code && <FormHelperText error={true}>{error.zip_code}</FormHelperText> }
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
                <FormHelperText error={true} style={{ marginRight: 20, width: '30%', display: 'inline-block' }}>{error.road_address}</FormHelperText>
                <FormHelperText error={true} style={{ marginRight: 20, width: '50%', display: 'inline-block' }}>{error.address_detail}</FormHelperText>
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
