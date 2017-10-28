import React from 'react'
import Formsy from 'formsy-react'
import MyOwnInput from '../ui/MyOwnInput'

const UploadForm = React.createClass({
  getInitialState() {
    return {
      canSubmit: false
    }
  },

  propTypes: {
    lang: React.PropTypes.string,
    submitFunc: React.PropTypes.func,
    author: React.PropTypes.string,
    email: React.PropTypes.string,
    title: React.PropTypes.string,
    genre: React.PropTypes.string,
    uploading: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      lang: 'sc',
      submitFunc: () => {},
      author: '',
      email: '',
      title: '',
      genre: '',
      uploading: false
    }
  },

  enableButton() {
    this.setState({
      canSubmit: true
    });
  },
  disableButton() {
    this.setState({
      canSubmit: false
    });
  },

  getRenderParams() {
    let params = {
      btnText: this.props.lang == "tc" ? (this.props.uploading ? "上傳中" : "上傳文件") : (this.props.uploading ? "上传中" : "上传文件")
    }

    return params
  },

  render() {
    let params = this.getRenderParams()
    return (
      <Formsy.Form onValidSubmit={this.props.submitFunc} onValid={this.enableButton} onInvalid={this.disableButton} className="upload-form">
        <MyOwnInput cls="upload-input" name="author" title={this.props.lang == "tc" ? "作家名稱" : "作家名称"} value={this.props.author} required/>
        <MyOwnInput cls="upload-input" name="email" title={this.props.lang == "tc" ? "電子郵箱" : "电子邮箱"} value={this.props.email} required/>
        <MyOwnInput cls="upload-input" name="title" title={this.props.lang == "tc" ? "稿件標題" : "稿件标题"} value={this.props.title} required/>
        <MyOwnInput cls="upload-input" name="genre" title={this.props.lang == "tc" ? "稿件題材" : "稿件题材"} value={this.props.genre} required/>
        <MyOwnInput cls="upload-input" name="fileToUpload" title={this.props.lang == "tc" ? "選擇文件" : "选择文件"} type="file" value={undefined} required/>
        <div className="address-error-msg">{this.props.error}</div>
        <div className="upload-btn-wrapper">
          <button type="submit" disabled={!this.state.canSubmit || this.props.uploading} className="home-upload-btn" >{params.btnText}</button>
        </div>
      </Formsy.Form>
    );
  }
})

export default UploadForm