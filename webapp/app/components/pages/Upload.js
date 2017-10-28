import React from 'react'
import { Link } from 'react-router'
import UploadForm from '../ui/UploadForm'
// import AWS from 'aws-sdk'

export default React.createClass({
	getInitialState() {
    return {
      navId: 0,
      error: '',
      showUploading: false
    }
  },

  navChange(e) {
  	var currentId = e.currentTarget.getAttribute("data-nav-id")
  	this.setState({navId: currentId})
  },

  submit(model, resetForm) {
    this.setState({showUploading: true}, function(){
      let creds = {
        bucket: 'solusrex.uploaded.books',
        access_key: 'AKIAIGK2GRB2B3XX4DTA',
        secret_key: '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'
      }

      AWS.config.update({ accessKeyId: creds.access_key, secretAccessKey: creds.secret_key });
      AWS.config.region = 'ap-southeast-1';
      var bucket = new AWS.S3({ params: { Bucket: creds.bucket } });
      var fileSource = document.getElementById("fileToUpload")
      var file = fileSource.files[0];
      var key = model.author+'_'+model.email+'_'+model.title+'_'+model.genre+'_'+file.name;
      var params = { Key: key, ContentType: model.fileToUpload.type, Body: file, ServerSideEncryption: 'AES256' };
      var that = this;
      var failText = (this.props.params.lang == 'tc' ? '上傳失敗！原因：' : '上传失败！原因：')
      var successText = (this.props.params.lang == 'tc' ? '上傳成功！' : '上传成功！')
      bucket.putObject(params, function(err, data) {
        if(err) {
          // There Was An Error With Your S3 Config
          alert(failText+err.message);
          that.setState({showUploading: false});
          return false;
        }
        else {
          // Success!
          alert(successText);
          that.setState({showUploading: false}, function(){
            location.reload()
          });
        }
      })
    })
  },

  render() {
  	return (
  		<div>
  			<div className="upload-notice">
  				<div className="sc-text">投稿指南：您可以直接上传文稿，或者通过电邮方式上传文稿</div>
  				<div className="tc-text">投稿指南：您可以直接上傳文稿，或者通過電郵方式上傳文稿</div>
  			</div>
  			<div className="upload-nav-wrapper">
  				<a href="javascript:;" className={"upload-nav-btn" + (this.state.navId == 0 ? " current" : "" )} data-nav-id={0} onClick={this.navChange}>
  					<span className="sc-text">直接上传</span>
  					<span className="tc-text">直接上傳</span>
  				</a>
  				<a href="javascript:;" className={"upload-nav-btn" + (this.state.navId == 1 ? " current" : "" )} data-nav-id={1} onClick={this.navChange}>
  					<span className="sc-text">电邮上传</span>
  					<span className="tc-text">電郵上傳</span>
  				</a>
  			</div>
  			<div className={"upload-content-wrapper" + (this.state.navId == 0 ? " current" : "" )}>
  				<div className="upload-intro">
	  				<div className="sc-text">请上传单个文件。我们不接受单个章节、ZIP/RAR 压缩文件或密码保护文件</div>
	  				<div className="tc-text">請上傳單個文件。我們不接受單個章節、ZIP／RAR 壓縮文件或密碼保護文件</div>
	  			</div>
	  			<UploadForm lang={this.props.params.lang} submitFunc={this.submit} error={this.state.error} uploading={this.state.showUploading}></UploadForm>
  			</div>
  			<div className={"upload-content-wrapper" + (this.state.navId == 1 ? " current" : "" )}>
  				<div className="upload-intro">
	  				<div className="sc-text">
	  					若想要通过电子邮件提交您的稿件，请在邮件标题中标注文章标题，并在邮件正文中提供您的姓名与作品类型。<br/><br/>
	  					请将稿件电子邮件至： <a href="mailto:submissions@solusrex.cn" className="upload-email">submissions@solusrex.cn</a> <br/><br/>
	  					请附上完整手稿、摘要和简历。
	  				</div>
	  				<div className="tc-text">
	  					若想要通過電子郵件提交您的稿件，請在郵件標題中標注文章標題，並在郵件正文中提供您的姓名與作品類型。<br/><br/>
	  					請將稿件電子郵件至： <a href="mailto:submissions@solusrex.cn" className="upload-email">submissions@solusrex.cn</a> <br/><br/>
	  					請附上完整手稿、摘要和簡歷。
	  				</div>
	  			</div>
  			</div>
  		</div>
  	)
  }
})