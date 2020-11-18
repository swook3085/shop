import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Authentication extends Component {
  constructor(props) {
    super(props);
    this.state = {
        id : '', // 로그인 아이디
        pw : '', // 로그인 비밀번호
        rId : '', // 회원가입 아이디
        rPw : '', // 회원가입 비밀번호
        rPwChek : '', // 회원가입 비밀번호 체크
        rName : '', // 회원가입 이름 
        rEmail : '', // 회원가입 이메일
        idFocus: false, // 로그인 아이디 인풋 포커스 체크
        pwFocus: false, // 로그인 비밀번호 인풋 포커스 체크
        rIdCheckFocus : false, // 회원가입 아이디 인풋 포커스 체크
        rPwFocus : false, // 회원가입 비밀번호 인풋 포커스 체크
        rPwCheckFocus : false, // 회원가입 비밀번호 인풋 포커스 체크
        rNameFocus : '', // 회원가입 이름 인풋 포커스 체크 
        rEmailFocus : '', // 회원가입 이메일 인풋 포커스 체크
        loginCheckText : 0,
        idCheckText : 0,
        pwCheckText : ''
    }
  }

  // 로그인 아이디 포커스 이벤트 함수
  _onIdFocus = () => {
    if (!this.state.idFocus) {
      this.setState({
        idFocus: true,
        pwFocus: false
      });
    }
  }
 // 로그인 비밀번호 포커스 이벤트 함수
  _onPwFocus = () => {
    if (!this.state.pwFocus) {
      this.setState({
        idFocus: false,
        pwFocus: true
      });
    }
  }
  // 회원가입 아이디 포커스 이벤트 함수
  _onRidCheckFocus = () => {
    if (!this.state.rIdCheckFocus) {
      this.setState({
        rIdCheckFocus: true,
        rPwFocus: false,
        rPwCheckFocus : false,
        rNameFocus : false,
        rEmailFocus : false
      });
    }
  }
  _onRidCheckFocusOut = () => {
    if (this.state.rIdCheckFocus) {
      this.setState({
        rIdCheckFocus: false
      });
      if(this.state.idCheckText === '') { // 아이디 체크 문구가 빈칸일때
        this.idCheckFunction()
      } else if(this.state.idCheckText === -1) { // 아이디 체크 문구가 중복 상황일때
        this.idCheckFunction()
      }
    }
  }
  // 회원가입 비밀번호 포커스 이벤트 함수
  _onRpwFocus = () => {
    if (!this.state.rPwFocus) {
      this.setState({

        rPwFocus: true,
        rPwCheckFocus : false,
        rNameFocus : false,
        rEmailFocus : false
      });
    }
  }
  // 회원가입 비밀번호 체크 포커스 이벤트 함수
  _onRpwCheckFocus = () => {
    if (!this.state.rPwCheckFocus) {
      this.setState({

        rPwFocus: false,
        rPwCheckFocus: true,
        rNameFocus : false,
        rEmailFocus : false
      });
    }
  }
  // 회원가입 이름 포커스 이벤트 함수
  _onRnameCheckFocus = () => {
    if (!this.state.rNameFocus) {
      this.setState({

        rPwFocus: false,
        rPwCheckFocus: false,
        rNameFocus : true,
        rEmailFocus : false
      });
    }
  }
  // 회원가입 이메일 포커스 이벤트 함수
  _onRemailCheckFocus = () => {
    if (!this.state.rEmailFocus) {
      this.setState({

        rPwFocus: false,
        rPwCheckFocus: false,
        rNameFocus : false,
        rEmailFocus : true
      });
    }
  }
// 로그인 아이디 입력 이벤트 함수
  idOnChange = (event) => {
    this.setState({
        id : event.target.value
    })
  }
// 로그인 비밀번호 입력 이벤트 함수
  passwordOnChange = (event) => {
    this.setState({
      pw : event.target.value
    })
  }
// 회원가입 아이디 입력 이벤트 함수
  rIdOnChange = (event) => {
    this.setState({
        rId : event.target.value,
        idCheckText : ''
    })
  }
// 회원가입 비밀번호 입력 이벤트 함수
  rPasswordOnChange = (event) => {
      this.setState({
        rPw : event.target.value
      })
  }
  // 회원가입 비밀번호 입력 체크 이벤트 함수
  rPasswordCheckOnChange = (event) => {
    this.setState({
      rPwChek : event.target.value
    })
  }
  // 회원가입 이름 입력 이벤트 함수
  rNameCheckOnChange = (event) => {
    this.setState({
      rName : event.target.value
    })
  }
  // 회원가입 이메일 입력 이벤트 함수
  rEmaliCheckOnChange = (event) => {
    this.setState({
      rEmail : event.target.value
    })
  }
  // 로그인 함수
  handleLogin = () => {
    let id = this.state.id;
    let pw = this.state.pw;
    if(id === '' || pw === '') {
      this.setState({
        loginCheckText:-1
      });
    } else {
      this.props.onLogin(id, pw).then(
        (success) => {
            if(!success) {
                this.setState({
                  pw: '',
                  loginCheckText:-1
                });
            } else {
              this.setState({
                loginCheckText:1
              });
            }
        }
      );
    }
  }
  handleKeyPress = (e) => {
    if(e.charCode===13) {
        this.handleLogin();
    }
  }
  idCheckFunction = () => {
    let id = this.state.rId;

    this.props.idCheck(id).then(
        (idCheck) => {
          if(idCheck) {
            this.setState({
              idCheckText:1
            })
          } else {
            this.setState({
              idCheckText:-1
            })
          }
        }
    );
  }
  renderLoginCheckMessage() {
    if(this.state.loginCheckText === -1) {
      return (
        <p className='rpwFail'>아이디 또는 비밀번호를 다시 확인하세요.</p>
      );
    }
  }
  renderIdCheckMessage() {
    if(this.state.idCheckText === 1) {
      return (
        <p className='rpwSuccess'>사용 가능한 아이디입니다.</p>
      )
    } else if(this.state.idCheckText === -1) {
      return (
        <p className='rpwFail'>이미 사용중이거나 탈퇴한 아이디입니다.</p>
      );
    }
  }

  renderPwCheckMessage() {
    if (this.state.rPwChek) {
      if (this.state.rPw !== this.state.rPwChek) {
        return (
          <p className='rpwFail'>패스워드가 일치하지 않습니다</p>
        );
      } else {
        return (
          <p className='rpwSuccess'>일치합니다.</p>
        );
      }
    }
  }

  render() {
    return (
      this.props.mode ?
      <div className='login-wrap'>
        <div className='login-form'>
            <h1>Project</h1>
            <div className={this.state.idFocus ? 'txtbFocus txtb': 'txtb txtbFocusOut'}>
                <input id='id' type='text' onChange={this.idOnChange} onFocus={this._onIdFocus} value={this.state.id} placeholder='아이디를 입력해주세요.'/>
            </div>
            <div className={this.state.pwFocus ? 'txtbFocus txtb': 'txtb txtbFocusOut'}>
                <input type='password' onChange={this.passwordOnChange} onFocus={this._onPwFocus} value={this.state.pw} onKeyPress={this.handleKeyPress} placeholder='비밀번호를 입력해주세요.'/>
            </div>
            <div className='loginCheckText'>
              {this.renderLoginCheckMessage()}
            </div>
            <input type='button' className='logbtn' onClick={this.handleLogin} value='로그인'/>
            <input type='button' className='registerbtn' onClick={this.props.registerShowModal} value='회원가입'/>
            <p className='footerText'>Copyrightⓒ 2019 KSW. Rights Reserved.</p>
        </div>
      </div>
    :
    <div className='register-wrap'>
      <div className='register-form'>
        <h1>회원가입</h1>
        <p className='labelTx'>아이디</p>
        <div className={this.state.rIdCheckFocus ? 'RtxtbFocus Rtxtb rId': 'Rtxtb RtxtbFocusOut rId'}>
          <input type='text' onChange={this.rIdOnChange} onBlur={this._onRidCheckFocusOut} onFocus={this._onRidCheckFocus} value={this.state.rId}/>
        </div>
        <div className='idCheckText'>
          {this.renderIdCheckMessage()}
        </div>
        <p className='labelTx'>비밀번호</p>
        <div className={this.state.rPwFocus ? 'RtxtbFocus Rtxtb': 'Rtxtb RtxtbFocusOut'}>
          <input type='password' onChange={this.rPasswordOnChange} onFocus={this._onRpwFocus} value={this.state.rPw}/>
        </div>
        <div className='pwText'></div>
        <p className='labelTx'>비밀번호 확인</p>
        <div className={this.state.rPwCheckFocus ? 'RtxtbFocus Rtxtb': 'Rtxtb RtxtbFocusOut'}>
          <input type='password' onChange={this.rPasswordCheckOnChange} onFocus={this._onRpwCheckFocus} value={this.state.rPwChek}/>
        </div>
        <div className='pwCheckText'>
          {this.renderPwCheckMessage()}
        </div>
        <p className='labelTx'>이름</p>
        <div className={this.state.rNameFocus ? 'RtxtbFocus Rtxtb': 'Rtxtb RtxtbFocusOut'}>
          <input type='text' onChange={this.rNameCheckOnChange} onFocus={this._onRnameCheckFocus} value={this.state.rName}/>
        </div>
        <div className='noneText'></div>
        <p className='labelTx'>이메일</p>
        <div className={this.state.rEmailFocus ? 'RtxtbFocus Rtxtb rEamil': 'Rtxtb RtxtbFocusOut rEamil'} id='rEmailText'>
          <input type='text' onChange={this.rEmaliCheckOnChange} onFocus={this._onRemailCheckFocus} value={this.state.rEmail}/>
        </div>
        <div className={this.state.rEmailFocus ? 'RtxtbFocus Rtxtb rEamil': 'Rtxtb RtxtbFocusOut rEamil'} id='rEmailChoice'>
          <select className='emailChoice' onFocus={this._onRemailCheckFocus}>
            <option>naver.com</option>
            <option>gmail.com</option>
            <option>naver.com</option>
          </select>
        </div>
        <input type='button' className='Rregisterbtn' onClick={this.props.registerShowModal} value='회원가입'/>
        <p className='rFooterText'>Copyrightⓒ 2019 KSW. Rights Reserved.</p>
        </div>
    </div>
    )
  }
}

Authentication.propTypes = {
  onLogin: PropTypes.func,
  idCheck: PropTypes.func
};

Authentication.defaultProps = {
  onLogin: (id, pw) => { console.error("login function not defined"); },
  idCheck: (id) => { console.error("idCheck function not defined"); }
};

export default Authentication;
