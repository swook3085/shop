import React, {Component} from 'react';
import {connect} from 'react-redux';
import {hideModal, showModal} from '../../../Redux/Action/index';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Login from  './Login/Login';
import Register from './Register/Register';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const Transition = React.forwardRef(function Transition(props, ref) { // 슬라이드 효과 
  return <Slide direction="down" ref={ref} {...props} />;
});
class Modal extends Component {
    render() {
        const mode = this.props.status.loginModal.mode;
        return (
            <Dialog open={this.props.status.loginModal.open} onClose={this.props.hideModal} TransitionComponent={Transition} disableBackdropClick={true}>
            <DialogTitle>
                <IconButton aria-label="close" className='closeBtn' onClick={this.props.hideModal}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className='dialog-content'>
                {mode ? <Login/> : <Register/>}
            </DialogContent>
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      status: state
    };
  }
  
const mapDispatchToProps = (dispatch) => {
return {
    hideModal: () => dispatch(hideModal()),
    showModal: () => dispatch(showModal())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Modal);